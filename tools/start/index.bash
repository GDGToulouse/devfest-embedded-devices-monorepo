#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../..`

pids=""
rc=0

trap 'sigintTrap' 2

sigintTrap() {
	echo "pids=${pids}"
	if [ "${pids}X" != "X" ]; then
		kill -9 ${pids}
	fi
	exit 2
}

${hereDir}/sso/index.bash &
pids="${pids} $!"

${hereDir}/front/index.bash &
pids="${pids} $!"

${hereDir}/back/index.bash &
pids="${pids} $!"

${hereDir}/dbs/index.bash &
pids="${pids} $!"

for pid in ${pids}; do
	wait ${pid} || let "rc=1"
done

exit ${rc}
