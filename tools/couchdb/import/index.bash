#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../../..`

database=${1:-"menu-default"}
host=${2:-"127.0.0.1"}
password=${3:-"cloud"}
path=${4:-"${hereDir}/files/libs/apps/embedded-device-manager/routes/route/menu-default/cloud.json"}
port=${5:-"5000"}
username=${6:-"cloud"}

curl \
	--verbose \
	-H 'Content-Type: application/json' \
	--data-binary @${path} \
	http://${username}:${password}@${host}:${port}/${database}/_bulk_docs/
