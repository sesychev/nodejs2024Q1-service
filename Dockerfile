#
FROM node:lts-alpine as build

ENV NODE_ENV=build

WORKDIR /usr/src/app

COPY package*.json tsconfig.json tsconfig.build.json ./

RUN npm install --only=build

COPY . .

RUN npm run build

USER node

#
FROM node:lts-alpine as production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json tsconfig.json tsconfig.build.json ./

RUN npm install --only=production

COPY . .

COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist", "main.js" ]