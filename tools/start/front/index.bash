#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../..`

defaultProject=`cat ${repoDir}/angular.json | grep defaultProject | cut -d':' -f2 | cut -d'"' -f2`
pids=""
rc=0

project=${1:-"${defaultProject}"}

sigintTrap() {
	echo "pids=${pids}"
	if [ "${pids}X" != "X" ]; then
		kill -9 ${pids}
	fi
	exit 2
}

yarn

yarn run ng serve "${project}" & \
pids="${pids} $!"

for pid in ${pids}; do
	wait ${pid} || let "rc=1"
done

exit ${rc}
