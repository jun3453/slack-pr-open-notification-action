# Slack Pull Request Open Notification
Use GitHub Actions to notify Slack that a pull request has been opened.

![example](https://raw.githubusercontent.com/jun3453/slack-pr-open-notification-action/images/example.png)

## Usage
Add the following YAML to your new GitHub Actions workflow:

```yaml
name: Slack Pull Request Open Notification

on:
  pull_request:
    types: [opened, reopened]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Notify slack pr open
      env: 
        SLACK_WEBHOOK_URL : ${{ secrets.SLACK_WEBHOOK_URL }}
        PULL_REQUEST_NUMBER : ${{ github.event.pull_request.number }}
        PULL_REQUEST_TITLE : ${{ github.event.pull_request.title }}
        PULL_REQUEST_AUTHOR_NAME : ${{ github.event.pull_request.user.login }}
        PULL_REQUEST_AUTHOR_ICON_URL : ${{ github.event.pull_request.user.avatar_url }}
        PULL_REQUEST_URL : ${{ github.event.pull_request.html_url }}
        PULL_REQUEST_BODY : ${{ github.event.pull_request.body }}
        PULL_REQUEST_COMPARE_BRANCH_OWNER: ${{ github.event.pull_request.head.repo.owner.login }}
        PULL_REQUEST_COMPARE_BRANCH_NAME : ${{ github.event.pull_request.head.ref }}
        PULL_REQUEST_BASE_BRANCH_OWNER: ${{ github.event.pull_request.base.repo.owner.login }}
        PULL_REQUEST_BASE_BRANCH_NAME : ${{ github.event.pull_request.base.ref }}
        IS_SEND_HERE_MENTION : true
        MAKE_PRETTY : false
        MAKE_COMPACT : false
        ALWAYS_SHOW_OWNER: false
      uses: jun3453/slack-pr-open-notification-action@v1.2.0
```

### Arguments
#### SLACK_WEBHOOK_URL
The incoming Slack webhook URL. Create a repository secret named 'SLACK_WEBHOOK_URL' and paste the URL as the value.

#### PULL_REQUEST_*
See the following URL: https://developer.github.com/v3/pulls/.

#### IS_SEND_HERE_MENTION
**boolean (DEFAULT: true)**  
Whether to include the '@here' Slack mention when sending a message.

#### MAKE_PRETTY
**boolean (DEFAULT: false)**  
Pretty prints the information. Adds a "See Pull Request" button.

![make_pretty](https://raw.githubusercontent.com/jun3453/slack-pr-open-notification-action/images/make_pretty.png)

#### MAKE_COMPACT
**boolean (DEFAULT: false)**  
Smaller visual footprint.

![make_compact](https://raw.githubusercontent.com/jun3453/slack-pr-open-notification-action/images/make_compact.png)

#### ALWAYS_SHOW_OWNER
**boolean (DEFAULT: false)**  
By default, if the PR comes from a fork, the owner and branch name are listed when sending a message. ('owner:branch' for external vs 'branch' for internal)
If set to 'true', it will always show the owner in front of the branch name. 
Please note that to accept external PRs, you may need to enable fork pull request workflows under your repository's Actions settings.

![make_compact and is_pr_fork](https://raw.githubusercontent.com/jun3453/slack-pr-open-notification-action/images/make_compact_fork.png)
