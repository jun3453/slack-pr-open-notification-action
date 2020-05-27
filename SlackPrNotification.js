"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var url = process.env.SLACK_WEBHOOK_URL;
var prNum = process.env.PULL_REQUEST_NUMBER;
var prTitle = process.env.PULL_REQUEST_TITLE;
var prUrl = process.env.PULL_REQUEST_URL;
var prBody = process.env.PULL_REQUEST_BODY || "No decription provided.";
var authorName = process.env.PULL_REQUEST_AUTHOR_NAME;
var authorIconUrl = process.env.PULL_REQUEST_AUTHOR_ICON_URL;
var compareBranchName = process.env.PULL_REQUEST_COMPARE_BRANCH_NAME;
var baseBranchName = process.env.PULL_REQUEST_BASE_BRANCH_NAME;
var sendHereMention = process.env.IS_SEND_HERE_MENTION.toLowerCase() === "true" ? "<!here>\n" : "";
var message = {
    blocks: [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: sendHereMention + "*<" + prUrl + "|" + prTitle + ">*"
            },
            accessory: {
                type: "image",
                image_url: authorIconUrl,
                alt_text: "github icon"
            },
            fields: [
                {
                    type: "mrkdwn",
                    text: "*Author*\n" + authorName
                },
                {
                    type: "mrkdwn",
                    text: "*Base branch*\n" + baseBranchName
                },
                {
                    type: "mrkdwn",
                    text: "*Pull request number*\n#" + prNum
                },
                {
                    type: "mrkdwn",
                    text: "*Compare branch*\n" + compareBranchName
                },
            ]
        },
        {
            type: "section",
            text: {
                type: "plain_text",
                text: prBody,
                emoji: true
            }
        },
    ]
};
axios_1["default"].post(url, message);
