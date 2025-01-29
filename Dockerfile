FROM node:16

# COPY package*.json ./
# RUN npm install

COPY . .

EXPOSE 8125 
ENTRYPOINT node index.js
