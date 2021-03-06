#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../..`

defaultProject=`cat ${repoDir}/angular.json | grep defaultProject | cut -d':' -f2 | cut -d'"' -f2`
pids=""
rc=0
currentDir=`pwd`

project=${1:-"${defaultProject}"}

trap 'sigintTrap' 2

sigintTrap() {
	echo "pids=${pids}"
	if [ "${pids}X" != "X" ]; then
		kill -9 ${pids}
	fi
	exit 2
}

cloudContainerName="${project}-cloud-db"
cloudContainerPassword="cloud"
cloudContainerPort="5000"
cloudContainerUser="cloud"

docker \
	stop \
		${cloudContainerName}

docker \
	rm \
		${cloudContainerName}

sudo rm -rf ${hereDir}/cloud/opt/couchdb/etc/local.d/docker.ini
sudo rm -rf ${hereDir}/cloud/opt/couchdb/log/couch.log
sudo rm -rf ${hereDir}/cloud/opt/couchdb/data

mkdir ${hereDir}/cloud/opt/couchdb/data

docker \
	run \
		--rm \
		-p ${cloudContainerPort}:5984 \
		--name ${cloudContainerName} \
		-e COUCHDB_PASSWORD=${cloudContainerPassword} \
		-e COUCHDB_USER=${cloudContainerUser} \
		-v ${hereDir}/cloud/opt/couchdb/etc/local.d:/opt/couchdb/etc/local.d \
		-v ${hereDir}/cloud/opt/couchdb/log:/opt/couchdb/log \
		-v ${hereDir}/cloud/opt/couchdb/data:/opt/couchdb/data \
		couchdb:latest \
&
pids="${pids} $!"

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:${cloudContainerPort})" != "200" ]]; do echo "waiting cloud db to be up" && sleep 5; done

curl -X PUT http://${cloudContainerUser}:${cloudContainerPassword}@localhost:${cloudContainerPort}/_users
curl -X PUT http://${cloudContainerUser}:${cloudContainerPassword}@localhost:${cloudContainerPort}/_replicator
curl -X PUT http://${cloudContainerUser}:${cloudContainerPassword}@localhost:${cloudContainerPort}/_global_changes

for dir in `ls -mR ${repoDir}/tools/couchdb/import/files/libs/apps/embedded-device-manager | sed -n 's/://p'`; do
	database=`echo ${dir} | rev | cut -d'/' -f1 | rev`

	if [ -f ${dir}/cloud.json ]; then
		echo "Importing ${dir}/cloud.json as ${database} in ${cloudContainerName}"

		${repoDir}/tools/couchdb/database/create/index.bash \
			${database} \
			'localhost' \
			${cloudContainerPassword} \
			${cloudContainerPort} \
			${cloudContainerUser}

		${repoDir}/tools/couchdb/import/index.bash \
			${database} \
			'localhost' \
			${cloudContainerPassword} \
			${dir}/cloud.json \
			${cloudContainerPort} \
			${cloudContainerUser}

	fi
done;

#TODO automate indexes creation and use the created file here
${repoDir}/tools/couchdb/index/create/index.bash \
	'{"index": { "fields": ["pid"] }, "name" : "pid-index", "type" : "json"}' \
	'sidenavs-start-default' \
	'localhost' \
	${cloudContainerPassword} \
	${cloudContainerPort} \
	${cloudContainerUser}

for dir in `ls -mR ${repoDir}/tools/couchdb/restore/dumps/libs/apps/embedded-device-manager | sed -n 's/://p'`; do
	database=`echo ${dir} | rev | cut -d'/' -f1 | rev`

	if [ -f ${dir}/cloud.json ]; then
		echo "Restoring ${dir}/cloud.json as ${database} in ${cloudContainerName}"

		${repoDir}/tools/couchdb/database/create/index.bash \
			${database} \
			'localhost' \
			${cloudContainerPassword} \
			${cloudContainerPort} \
			${cloudContainerUser}

		${repoDir}/tools/couchdb/restore/index.bash \
			${database} \
			'localhost' \
			${cloudContainerPassword} \
			${dir}/cloud.json \
			${cloudContainerPort} \
			${cloudContainerUser}
	fi
done;

ssoNetworkName="sso-net"

docker \
	network \
		remove \
			${ssoNetworkName}

docker \
	network \
		create \
			--driver bridge \
				${ssoNetworkName}

ssoDatabaseContainerName="postgres"
ssoDatabaseContainerPassword="sso-db"
ssoDatabaseContainerPort="5432"
ssoDatabaseContainerUser="sso-db"
ssoDatabaseContainerDatabase="keycloak"

docker \
	stop \
		${ssoDatabaseContainerName}

docker \
	rm \
		${ssoDatabaseContainerName}

docker \
	run \
		--rm \
		-p ${ssoDatabaseContainerPort}:5432 \
		--name ${ssoDatabaseContainerName} \
		--network ${ssoNetworkName} \
		-e POSTGRES_DB=${ssoDatabaseContainerDatabase} \
		-e POSTGRES_USER=${ssoDatabaseContainerUser} \
		-e POSTGRES_PASSWORD=${ssoDatabaseContainerPassword} \
		postgres:latest \
&
pids="${pids} $!"

ssoContainerName="${project}-sso"
ssoContainerPassword="sso"
ssoContainerPort="5004"
ssoContainerUser="sso"

docker \
	stop \
		${ssoContainerName}

docker \
	rm \
		${ssoContainerName}

docker \
	run \
		--rm \
		-p ${ssoContainerPort}:8080 \
		--network ${ssoNetworkName} \
		--name ${ssoContainerName} \
		-e DB_VENDOR=POSTGRES \
		-e DB_ADDR=${ssoDatabaseContainerName} \
		-e DB_PORT=${ssoDatabaseContainerPort} \
		-e DB_DATABASE=${ssoDatabaseContainerDatabase} \
		-e DB_USER=${ssoDatabaseContainerUser} \
		-e DB_PASSWORD=${ssoDatabaseContainerPassword} \
		-e KEYCLOAK_USER=${ssoContainerUser} \
		-e KEYCLOAK_PASSWORD=${ssoContainerPassword} \
		quay.io/keycloak/keycloak:latest \
			-b 0.0.0.0 \
&
pids="${pids} $!"

# echo "The keycloak admin console will be available here: http://localhost:${ssoContainerPort}/auth/admin"

andromedaContainerName="${project}-device-andromeda-db"
andromedaContainerPassword="andromeda"
andromedaContainerPort="8000"
andromedaContainerUser="andromeda"

docker \
	stop \
		${andromedaContainerName}

docker \
	rm \
		${andromedaContainerName}

sudo rm -rf ${hereDir}/devices/andromeda/opt/couchdb/etc/local.d/docker.ini
sudo rm -rf ${hereDir}/devices/andromeda/opt/couchdb/log/couch.log
sudo rm -rf ${hereDir}/devices/andromeda/opt/couchdb/data

mkdir ${hereDir}/devices/andromeda/opt/couchdb/data

docker \
	run \
		--rm \
		-p ${andromedaContainerPort}:5984 \
		--name ${andromedaContainerName} \
		-e COUCHDB_PASSWORD=${andromedaContainerPassword} \
		-e COUCHDB_USER=${andromedaContainerUser} \
		-v ${hereDir}/devices/andromeda/opt/couchdb/etc/local.d:/opt/couchdb/etc/local.d \
		-v ${hereDir}/devices/andromeda/opt/couchdb/log:/opt/couchdb/log \
		-v ${hereDir}/devices/andromeda/opt/couchdb/data:/opt/couchdb/data \
		couchdb:latest \
&
pids="${pids} $!"

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:${andromedaContainerPort})" != "200" ]]; do echo "waiting andromeda db to be up" && sleep 5; done

curl -X PUT http://${andromedaContainerUser}:${andromedaContainerPassword}@localhost:${andromedaContainerPort}/_users
curl -X PUT http://${andromedaContainerUser}:${andromedaContainerPassword}@localhost:${andromedaContainerPort}/_replicator
curl -X PUT http://${andromedaContainerUser}:${andromedaContainerPassword}@localhost:${andromedaContainerPort}/_global_changes

for dir in `ls -mR ${repoDir}/tools/couchdb/restore/dumps/libs/apps/embedded-device-manager | sed -n 's/://p'`; do
	database=`echo ${dir} | rev | cut -d'/' -f1 | rev`

	if [ -f ${dir}/andromeda.json ]; then
		echo "Restoring ${dir}/andromeda.json as ${database} in ${andromedaContainerName}"
		${repoDir}/tools/couchdb/restore/index.bash \
			${database} \
			'localhost' \
			${andromedaContainerPassword} \
			${andromedaContainerUser} \
			${dir}/andromeda.json \
			${andromedaContainerPort}
	fi
done;


aquariusContainerName="${project}-device-aquarius-db"
aquariusContainerPassword="aquarius"
aquariusContainerPort="8010"
aquariusContainerUser="aquarius"

docker \
	stop \
		${aquariusContainerName}

docker \
	rm \
		${aquariusContainerName}

sudo rm -rf ${hereDir}/devices/aquarius/opt/couchdb/etc/local.d/docker.ini
sudo rm -rf ${hereDir}/devices/aquarius/opt/couchdb/log/couch.log
sudo rm -rf ${hereDir}/devices/aquarius/opt/couchdb/data

mkdir ${hereDir}/devices/aquarius/opt/couchdb/data

docker \
	run \
		--rm \
		-p ${aquariusContainerPort}:5984 \
		--name ${aquariusContainerName} \
		-e COUCHDB_PASSWORD=${aquariusContainerPassword} \
		-e COUCHDB_USER=${aquariusContainerUser} \
		-v ${hereDir}/devices/aquarius/opt/couchdb/etc/local.d:/opt/couchdb/etc/local.d \
		-v ${hereDir}/devices/aquarius/opt/couchdb/log:/opt/couchdb/log \
		-v ${hereDir}/devices/aquarius/opt/couchdb/data:/opt/couchdb/data \
		couchdb:latest \
&
pids="${pids} $!"

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:${aquariusContainerPort})" != "200" ]]; do echo "waiting aquarius db to be up" && sleep 5; done

curl -X PUT http://${aquariusContainerUser}:${aquariusContainerPassword}@localhost:${aquariusContainerPort}/_users
curl -X PUT http://${aquariusContainerUser}:${aquariusContainerPassword}@localhost:${aquariusContainerPort}/_replicator
curl -X PUT http://${aquariusContainerUser}:${aquariusContainerPassword}@localhost:${aquariusContainerPort}/_global_changes

for dir in `ls -mR ${repoDir}/tools/couchdb/restore/dumps/libs/apps/embedded-device-manager | sed -n 's/://p'`; do
	database=`echo ${dir} | rev | cut -d'/' -f1 | rev`

	if [ -f ${dir}/aquarius.json ]; then
		echo "Restoring ${dir}/aquarius.json as ${database} in ${aquariusContainerName}"
		${repoDir}/tools/couchdb/restore/index.bash \
			${database} \
			'localhost' \
			${aquariusContainerPassword} \
			${aquariusContainerUser} \
			${dir}/aquarius.json \
			${aquariusContainerPort}
	fi
done;


for pid in ${pids}; do
	wait ${pid} || let "rc=1"
done

exit ${rc}
