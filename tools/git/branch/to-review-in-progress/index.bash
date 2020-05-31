#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../../..`

currentBranchName=`git branch -a | grep '*' | cut -d' ' -f2`
currentIssueIdOfBranch=`echo ${currentBranchName} | cut -d'/' -f2 | cut -d'_' -f1`

projectUrlUnderGitlab=`git config --get remote.origin.url | cut -d'/' -f4- | sed 's/.git//g'`
localGitbeakerHost=`cat ${repoDir}/local/gitbeaker.env | grep GITLAB_HOST | cut -d'=' -f2 | cut -d'/' -f3-`
localGitbeakerTokenName=`cat ${repoDir}/local/gitbeaker.env | grep GITLAB_TOKEN_NAME | cut -d'=' -f2`
localGitbeakerTokenValue=`cat ${repoDir}/local/gitbeaker.env | grep GITLAB_TOKEN_VALUE | cut -d'=' -f2`
gitlabProjectId=`cat ${repoDir}/local/gitbeaker.env | grep GITLAB_PROJECT_ID | cut -d'=' -f2`

mergeCommitMessage=${1}
featureBranch=${2:-"${currentBranchName}"}

authenticatedRemoteUrl="https://${localGitbeakerTokenName}:${localGitbeakerTokenValue}@${localGitbeakerHost}/${projectUrlUnderGitlab}.git"

rc=0

git \
	remote \
		set-url \
			origin \
				${authenticatedRemoteUrl}

#region commit for merge request
git \
	add \
		.

git \
	commit \
		--message "${mergeCommitMessage}

Closes #${currentIssueIdOfBranch}
"
#endregion commit for merge request

#region sync master
git \
	checkout \
		master

git \
	pull \
		origin \
			master
#endregion sync master

#region check if there is conflict with master
gitMergeResult=`git merge --no-commit --no-ff "${featureBranch}" 2>&1` # ref: https://stackoverflow.com/questions/501407/is-there-a-git-merge-dry-run-option
wentWell=`echo "${gitMergeResult}" | grep "Automatic merge went well; stopped before committing as requested" | wc -l`

if [ "${wentWell}" != "1" ] ; then
	echo "Error running 'git merge --no-commit --no-ff ${featureBranch}'"
	echo "wentWell=${wentWell}"
	echo "gitMergeResult=${gitMergeResult}"
	rc=1
fi

git \
	merge \
		--abort
#endregion check if there is conflict with master

#TODO: format and validate the feature branch, for now, all is considered valid

#region squash except last commit
GIT_SEQUENCE_EDITOR="sed -i -ze '2,\$s/^pick/squash/'" \
	git \
		rebase

echo "If conflicts are solved, you can continue the rebase running ${repoDir}/tools/git/branch/to-review-in-progress/rebase-continue/index.bash"

${repoDir}/tools/git/branch/to-review-in-progress/rebase-continue/index.bash
#endregion squash except last commit
