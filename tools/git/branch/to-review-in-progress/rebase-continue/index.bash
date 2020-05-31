#!/bin/bash

hereDir=`dirname $0 | while read a; do cd $a && pwd && break; done `
repoDir=`readlink --canonicalize ${hereDir}/../../../../..`

currentBranchName=`git branch -a | grep '*' | cut -d' ' -f2`
currentIssueIdOfBranch=`echo ${currentBranchName} | cut -d'/' -f2 | cut -d'_' -f1`

localGitbeakerTokenValue=`cat ${repoDir}/local/gitbeaker.env | grep GITLAB_TOKEN_VALUE | cut -d'=' -f2`
gitlabProjectId=`cat ${repoDir}/local/gitbeaker.env | grep GITLAB_PROJECT_ID | cut -d'=' -f2`

featureBranch=${2:-"${currentBranchName}"}

rc=0

git rebase --continue

#region sync featureBranch
git \
	pull \
		origin \
			${featureBranch}

git \
	push \
		-u \
			origin \
				${featureBranch}
#endregion sync featureBranch

# #region move issue to next column
# ${repoDir}/tools/gitlab/issues/add-labels/index.bash \
# 	${currentIssueIdOfBranch} \
# 	review-in-progress
# #endregion move issue to next column

# #region submit merge request
# issue=`yarn run --silent gitbeaker issues show --gl-token="${localGitbeakerTokenValue}" --project-id=${gitlabProjectId} --issue-id=${currentIssueIdOfBranch}`

# issueTitle=`echo ${issue} | python -c "import sys, json; print(json.load(sys.stdin)['title'])"`

# yarn \
# 	run \
# 		--silent \
# 			gitbeaker \
# 				merge-requests \
# 					create \
# 						--gl-token="${localGitbeakerTokenValue}" \
# 						--project-id=${gitlabProjectId} \
# 						--source-branch="${featureBranch}" \
# 						--target-branch=master \
# 						--title="${issueTitle}"
# #endregion submit merge request

#region restore branch used before this script
git \
	checkout \
		"${featureBranch}"
#endregion restore branch used before this script

if [ "${rc}" != "0" ] ; then
	echo "Result code is error (rc=${rc})"
	exit ${rc}
fi

# The commit message `${mergeRequestCommitMessage}` will be used for the merge request commit.