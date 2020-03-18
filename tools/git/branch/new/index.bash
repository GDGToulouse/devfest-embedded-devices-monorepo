#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../..`

issueId=${1}

issueName=`curl https://github.com/GDGToulouse/devfest-embedded-devices-monorepo/issues/${issueId} \
	| grep '<a class="js-issue-title' \
	| cut -d'>' -f2 \
	| cut -d'<' -f1
`

branchName="feature/${issueId}__"`echo ${issueName} \
	| sed 's/\s/_/g' \
	| sed 's/[āáǎàä]/a/g' \
	| sed 's/[ĀÁǍÀÄ]/A/g' \
	| sed 's/[ç]/c/g' \
	| sed 's/[Ç]/C/g' \
	| sed 's/[ēéěèëê]/e/g' \
	| sed 's/[ĒÉĚÈËÊ]/E/g' \
	| sed 's/[īíǐìïî]/i/g' \
	| sed 's/[ĪÍǏÌÏÎ]/I/g' \
	| sed 's/[ōóǒòöô]/i/g' \
	| sed 's/[ŌÓǑÒÖÔ]/O/g' \
	| sed 's/[ūúǔùüǖǘǚǜ]/u/g' \
	| sed 's/[ŪÚǓÙÜǕǗǙǛ]/U/g' \
	| sed 's/[&"|~<>@#°?!£¤*µ=%+$;,:.^{}()]/_/g' \
	| sed "s/'/_/g" \
	| sed "s/\\\`/_/g" \
	| sed "s/\[/_/g" \
	| sed "s/\]/_/g" \
	| sed "s@/@_@g" \
	| sed 's@\\\@_@g' \
	| sed 's@_\+@_@g' \
	| tr '[:upper:]' '[:lower:]' \
`
