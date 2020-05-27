# Slack pull request open notification
Use github actions to notify slack that a pull request has been opened.

![example](https://raw.githubusercontent.com/jun3453/slack-pr-open-notification-action/images/example.png)

## Usage
Add the following yaml to your github actions new workflow.

```yaml
name: Slack pull request open notification

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
        PULL_REQUEST_COMPARE_BRANCH_NAME : ${{ github.event.pull_request.head.ref }}
        PULL_REQUEST_BASE_BRANCH_NAME : ${{ github.event.pull_request.base.ref }}
        IS_SEND_HERE_MENTION : true
      uses: jun3453/slack-pr-open-notification-action@v1.0.2
```

### Arguments
#### SLACK_WEBHOOK_URL
Write slack incomming webhook url. Please Set your repository secrets.

#### PULL_REQUEST_*
See the following URL. https://developer.github.com/v3/pulls/

#### IS_SEND_HERE_MENTION
boolean. Whether to include a mention here when sending a message.
