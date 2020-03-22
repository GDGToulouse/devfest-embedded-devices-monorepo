#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../..`

pids=""
rc=0

echo "node --version"
node --version

echo "npm --version"
npm --version

echo "yarn --version"
yarn --version

echo "yarn run ng --version"
yarn run ng --version

echo "python --version"
python --version

echo "pip --version"
pip --version
