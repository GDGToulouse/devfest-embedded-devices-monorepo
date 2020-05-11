#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../..`

defaultProject=`cat ${repoDir}/angular.json | grep defaultProject | cut -d':' -f2 | cut -d'"' -f2`
pids=""
rc=0
printf -v currentDate '%(%Y%m%d%H%M%S)T\n' -1

project=${1:-"${defaultProject}"}

trap 'sigintTrap' 2

sigintTrap() {
	echo "pids=${pids}"
	if [ "${pids}X" != "X" ]; then
		kill -9 ${pids}
	fi
	exit 2
}

docker \
	run \
		--rm \
		-p 5000:5984 \
		--name ${project}-cloud-db-${currentDate} \
		-e COUCHDB_USER=cloud \
		-e COUCHDB_PASSWORD=cloud \
		couchdb:latest \
&
pids="${pids} $!"

docker \
	run \
		--rm \
		-p 7000:5984 \
		--name ${project}-andromeda-db-${currentDate} \
		-e COUCHDB_USER=andromeda \
		-e COUCHDB_PASSWORD=andromeda \
		couchdb:latest \
&
pids="${pids} $!"

docker \
	run \
		--rm \
		-p 7001:5984 \
		--name ${project}-aquarius-db-${currentDate} \
		-e COUCHDB_USER=aquarius \
		-e COUCHDB_PASSWORD=aquarius \
		couchdb:latest \
&
pids="${pids} $!"

for pid in ${pids}; do
	wait ${pid} || let "rc=1"
done

exit ${rc}
