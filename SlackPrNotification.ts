import axios from 'axios';

const url: string = process.env.SLACK_WEBHOOK_URL;
const prNum: string = process.env.PULL_REQUEST_NUMBER;
const prTitle: string = process.env.PULL_REQUEST_TITLE;
const prUrl: string = process.env.PULL_REQUEST_URL;
const prBody: string = process.env.PULL_REQUEST_BODY || "No description provided.";
const authorName: string = process.env.PULL_REQUEST_AUTHOR_NAME;
const authorIconUrl: string = process.env.PULL_REQUEST_AUTHOR_ICON_URL;
const compareBranchOwner: string = process.env.PULL_REQUEST_COMPARE_BRANCH_OWNER;
const compareBranchName: string = process.env.PULL_REQUEST_COMPARE_BRANCH_NAME;
const baseBranchOwner: string = process.env.PULL_REQUEST_BASE_BRANCH_OWNER;
const baseBranchName: string = process.env.PULL_REQUEST_BASE_BRANCH_NAME;
const sendHereMention: string = process.env.IS_SEND_HERE_MENTION.toLowerCase() === "true" ? "<!here>\n" : "";
const prFromFork: string = process.env.IS_PR_FROM_FORK;
const compareBranchText: string = prFromFork === "true" ? "*Compare branch*\n" + compareBranchOwner + ":" + compareBranchName : "*Compare branch*\n" + compareBranchName;
const baseBranchText: string = prFromFork === "true" ? "*Base branch*\n" + baseBranchOwner + ":" + baseBranchName : "*Base branch*\n" + baseBranchName;

const message: Object = {
    blocks: [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: sendHereMention + "*<" + prUrl + "|" + prTitle + ">*",
            },
            accessory: {
                type: "image",
                image_url: authorIconUrl,
                alt_text: "github icon",
            },
            fields: [
                {
                    type: "mrkdwn",
                    text: "*Author*\n" + authorName,
                },
                {
                    type: "mrkdwn",
                    text: baseBranchText,
                },
                {
                    type: "mrkdwn",
                    text: "*Pull request number*\n#" + prNum,
                },
                {
                    type: "mrkdwn",
                    text: compareBranchText,
                },
            ],
        },
        {
            type: "section",
            text: {
                type: "plain_text",
                text: prBody,
                emoji: true,
            },
        },
    ]
};

axios.post(url, message);
