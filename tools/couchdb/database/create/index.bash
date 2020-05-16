#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../../..`

database=${1:-"menu-default"}
host=${2:-"127.0.0.1"}
password=${3:-"cloud"}
port=${4:-"5000"}
username=${5:-"cloud"}

curl \
	--verbose \
	-H 'Content-Type: application/json' \
	-X PUT \
	http://${username}:${password}@${host}:${port}/${database}
