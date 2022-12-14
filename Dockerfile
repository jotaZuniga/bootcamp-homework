FROM node:17

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

#CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev"]