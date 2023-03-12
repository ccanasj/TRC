FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 5000
RUN mkdir -p /usr/src/app/audio && mkdir -p /usr/src/app/img
RUN chown -R node /usr/src/app
USER node
CMD ["node", "-r", "elastic-apm-node/start", "index.js"]
