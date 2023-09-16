FROM node:18-slim

WORKDIR /halen

RUN npm i -g yarn@berry

RUN node -v

RUN npm -v

COPY package*.json tsconfig.json ./

COPY ./packages/services/example-svc/package.json ./packages/services/example-svc/package-lock.json /halen/packages/services/example-svc/

COPY ./packages/shared/package.json ./packages/shared/package-lock.json /halen/packages/shared/

RUN npm ci

COPY ./packages/services/example-svc /halen/packages/services/example-svc/

COPY ./packages/shared /halen/packages/shared/

RUN npm run build

WORKDIR /halen/packages/services/example-svc

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "executable" ]