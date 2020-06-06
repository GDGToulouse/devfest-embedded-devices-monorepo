#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../../..`

data=${1:-"{\"index\":{\"fields\":[\"pid\"]},\"name\":\"pid-index\",\"type\": \"json\"}"}
database=${2:-"sidenavs-start-default"}
host=${3:-"127.0.0.1"}
password=${4:-"cloud"}
port=${5:-"5000"}
username=${6:-"cloud"}

echo "data=${data}"
echo "database=${database}"
echo "host=${host}"
echo "password=${password}"
echo "port=${port}"
echo "username=${username}"

curl \
	--verbose \
	-H 'Content-Type: application/json' \
	-X POST \
	http://${username}:${password}@${host}:${port}/${database}/_index \
	--data "${data}"
