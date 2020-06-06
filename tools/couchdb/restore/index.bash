#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../..`

database=${1:-"sidenavs-start-default-test"}
host=${2:-"127.0.0.1"}
password=${3:-"cloud"}
path=${4:-"${hereDir}/dumps/libs/apps/embedded-device-manager/routes/route/sidenavs-start-default-test/cloud.json"}
port=${5:-"5000"}
username=${6:-"cloud"}

cd ${hereDir}/..

git clone https://github.com/danielebailo/couchdb-dump

cd couchdb-dump

chmod +x couchdb-dump.sh

/bin/bash ./couchdb-dump.sh -r -P ${port} -H ${host} -d ${database} -f ${path} -u ${username} -p ${password}

