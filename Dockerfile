FROM mhart/alpine-node:12

ADD package*.json /
RUN npm ci --production
ADD SlackPrNotification.js /
RUN chmod +x /SlackPrNotification.js

ENTRYPOINT ["node", "/SlackPrNotification.js"]
