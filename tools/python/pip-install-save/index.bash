#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../..`

package=${1:-""}

pip \
	install \
		${package} \
&& \
echo \
	`pip freeze | grep -i ${package}` \
>> \
	${repoDir}/requirement.txt
