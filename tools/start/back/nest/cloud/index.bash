#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../../../..`

yarn

yarn run ng serve "embedded-devices-manager-api-nest" --host 0.0.0.0
