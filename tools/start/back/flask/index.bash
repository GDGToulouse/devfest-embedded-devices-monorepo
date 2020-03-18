#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../../..`

defaultProject=`cat ${repoDir}/angular.json | grep defaultProject | cut -d':' -f2 | cut -d'"' -f2`

project=${1:-"${defaultProject}"}
projectUnderscorified=`echo ${project} | sed 's/-/_/g'`

pip install -e .
pip install --requirement ${repoDir}/requirement.txt

python ${repoDir}/python/apps/"${projectUnderscorified}_api_flask/app/app.py"
