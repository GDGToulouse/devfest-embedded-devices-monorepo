#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../..`

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

${hereDir}/front/index.bash "${project}" &
pids="${pids} $!"

${hereDir}/back/flask/index.bash "${project}" &
pids="${pids} $!"

${hereDir}/back/nest/index.bash "${project}" &
pids="${pids} $!"

${hereDir}/dbs/index.bash "${project}" &
pids="${pids} $!"

for pid in ${pids}; do
	wait ${pid} || let "rc=1"
done

exit ${rc}
