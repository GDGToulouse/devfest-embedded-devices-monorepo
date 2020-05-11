#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../..`

defaultProject=`cat ${repoDir}/angular.json | grep defaultProject | cut -d':' -f2 | cut -d'"' -f2`
pids=""
rc=0

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

docker \
	stop \
		${cloudContainerName}

docker \
	rm \
		${cloudContainerName}

sudo rm -rf ${hereDir}/cloud/opt/couchdb/etc/local.d/docker.ini
sudo rm -rf ${hereDir}/cloud/opt/couchdb/log/couch.log

docker \
	run \
		--rm \
		-p 5000:5984 \
		--name ${cloudContainerName} \
		-e COUCHDB_USER=cloud \
		-e COUCHDB_PASSWORD=cloud \
		-v ${hereDir}/cloud/opt/couchdb/etc/local.d:/opt/couchdb/etc/local.d \
		-v ${hereDir}/cloud/opt/couchdb/log:/opt/couchdb/log \
		couchdb:latest \
&
pids="${pids} $!"

andromedaContainerName="${project}-device-andromeda-db"

docker \
	stop \
		${andromedaContainerName}

docker \
	rm \
		${andromedaContainerName}

sudo rm -rf ${hereDir}/devices/andromeda/opt/couchdb/etc/local.d/docker.ini
sudo rm -rf ${hereDir}/devices/andromeda/opt/couchdb/log/couch.log

docker \
	run \
		--rm \
		-p 7000:5984 \
		--name ${andromedaContainerName} \
		-e COUCHDB_USER=andromeda \
		-e COUCHDB_PASSWORD=andromeda \
		-v ${hereDir}/devices/andromeda/opt/couchdb/etc/local.d:/opt/couchdb/etc/local.d \
		-v ${hereDir}/devices/andromeda/opt/couchdb/log:/opt/couchdb/log \
		couchdb:latest \
&
pids="${pids} $!"

aquariusContainerName="${project}-device-aquarius-db"

docker \
	stop \
		${aquariusContainerName}

docker \
	rm \
		${aquariusContainerName}

sudo rm -rf ${hereDir}/devices/aquarius/opt/couchdb/etc/local.d/docker.ini
sudo rm -rf ${hereDir}/devices/aquarius/opt/couchdb/log/couch.log

docker \
	run \
		--rm \
		-p 7001:5984 \
		--name ${aquariusContainerName} \
		-e COUCHDB_USER=aquarius \
		-e COUCHDB_PASSWORD=aquarius \
		-v ${hereDir}/devices/aquarius/opt/couchdb/etc/local.d:/opt/couchdb/etc/local.d \
		-v ${hereDir}/devices/aquarius/opt/couchdb/log:/opt/couchdb/log \
		couchdb:latest \
&
pids="${pids} $!"

for pid in ${pids}; do
	wait ${pid} || let "rc=1"
done

exit ${rc}
