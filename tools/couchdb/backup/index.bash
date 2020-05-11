#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../..`
printf -v currentDate '%(%Y%m%d%H%M%S)T\n' -1

database=${1:-"local-hardware-menu"}
host=${2:-"127.0.0.1"}
username=${3:-"cloud"}
password=${4:-"cloud"}
port=${5:-"5000"}
path=${6:-"${hereDir}/../restore/dumps/tmp/${database}-${currentDate}.json"}

cd ${hereDir}/..

git clone https://github.com/danielebailo/couchdb-dump

cd couchdb-dump

chmod +x couchdb-dump.sh

/bin/bash ./couchdb-dump.sh -b -P ${port} -H ${host} -d ${database} -f ${path} -u ${username} -p ${password}
