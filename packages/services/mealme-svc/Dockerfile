FROM node:18-slim

WORKDIR /halen

RUN npm i -g lerna npm@latest --force

RUN node -v

RUN npm -v

COPY package.json package-lock.json lerna.json tsconfig.json ./

COPY ./packages/services/mealme-svc/package.json ./packages/services/mealme-svc/package-lock.json /halen/packages/services/mealme-svc/

COPY ./packages/shared/package.json ./packages/shared/package-lock.json /halen/packages/shared/

RUN npm ci && lerna bootstrap --loglevel debug -- --loglevel verbose

COPY ./packages/services/mealme-svc /halen/packages/services/mealme-svc/

COPY ./packages/shared /halen/packages/shared/

RUN npm run build

WORKDIR /halen/packages/services/mealme-svc

ENV NODE_ENV=production

EXPOSE 3000
