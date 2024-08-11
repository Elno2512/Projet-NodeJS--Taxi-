FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
EXPOSE 3000
CMD [ "node", "app.js" ]
