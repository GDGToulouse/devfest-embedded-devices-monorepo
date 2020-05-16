#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../..`
printf -v currentDate '%(%Y%m%d%H%M%S)T' -1

database=${1:-"menu-default"}
host=${2:-"127.0.0.1"}
instanceDumpDir=${3:-"cloud"}
password=${4:-"cloud"}
path=${5:-"${hereDir}/../restore/dumps/tmp/${instanceDumpDir}/${database}.${currentDate}.json"}
port=${6:-"5000"}
username=${7:-"cloud"}

cd ${hereDir}/..

git clone https://github.com/danielebailo/couchdb-dump

cd couchdb-dump

chmod +x couchdb-dump.sh

/bin/bash ./couchdb-dump.sh -b -P ${port} -H ${host} -d ${database} -f ${path} -u ${username} -p ${password}
