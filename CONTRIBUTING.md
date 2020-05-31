# CONTRIBUTING

## Workflow

- This repository uses a [GitHub project](https://github.com/GDGToulouse/devfest-embedded-devices-monorepo/projects/1) for development concerns.

## Working on an issue

The repository is inspired by the gitflow/GitHub flow, you can learn more about it [here](https://nvie.com/posts/a-successful-git-branching-model/):

- Move the issue from the _Backlog_ to the _In progress_ status of the Kanban, memorize the id of the issue (the number after the dash, on the right of the issue's title).
- Create a branch for your work: `tools/git/branch/new/index.bash ${issueId}`, it will create and checkout the new branch for your changes.
- Develop locally, then `git add` and `git commit` (with a message respecting the policy explained in the next section). You can also `git push` your code to GitHub in order to save it.
- When you are happy about the work you have done, get back the changes from master (merge or rebase) and submit your pull request to master via the GitHub web interface.
- Move the issue from the _In progress_ to the _Review in progress_ status of the Kanban, your changes will be reviewed and then this issue will be moved to the _Reviewer approved_ Kanban's status.
- When the pull request is merged in the master branch, the issue has to be moved to the _Done_ status of the Kanban: your work is now part of the releasable code 👏🎉.

## Commit message convention

- We will use the [Conventional Commits, version `1.0.0-beta.4`](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) for commit's message.
- A `commit-msg` git hook is configured in the repository in order to respect the above mentioned convention: if your commit message does not fit the convention, a `git commit` will lead to an error.

## IDEs

The project targets [Visual Studio Code](https://code.visualstudio.com/):

- Install the IDE
- Install the recommanded extensions mentionned in this repository

After that, you should have many features directly configured in the IDE (code auto-format, linting, ...)

If using another IDE, be prepared to have your code rejected if it does not fit the repository best practices (especially for code formatting).
