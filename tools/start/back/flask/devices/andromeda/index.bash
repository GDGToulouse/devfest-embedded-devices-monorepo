#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../../../../..`

defaultProject=`cat ${repoDir}/angular.json | grep defaultProject | cut -d':' -f2 | cut -d'"' -f2`

project=${1:-"${defaultProject}"}
projectUnderscorified=`echo ${project} | sed 's/-/_/g'`

cd ${repoDir}

pipIsVersion3=`pip --version | grep -c "3\."`
if [ "${pipIsVersion3}" = "1" ] ; then
    echo "pipIsVersion3 = 1"
    python setup.py install
else
    echo "!(pipIsVersion3 = 1)"
    pip3 install -e .
    pip3 install --requirement ${repoDir}/requirement.txt
    python3 setup.py install
fi

echo "const execution = require('child_process').exec('python3 ${repoDir}/python/apps/${projectUnderscorified}_api_flask/app/app.py', (err, stdout, stderr) => {
	process.stdout.write(stdout)
});
execution.stderr.on('data', function(error) {
    console.error(error);
});
execution.stdout.on('data', function(data) {
    console.log(data);
});
" \
| \
node
