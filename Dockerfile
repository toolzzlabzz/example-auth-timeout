FROM bitnami/minideb AS base

RUN install_packages wget ca-certificates tar

RUN cd /tmp && \
    wget https://nodejs.org/dist/v16.13.1/node-v16.13.1-linux-x64.tar.gz -O node.tar.gz && \
    tar -zxvf node.tar.gz -C /usr/local --strip-components=1 && \
    rm -f node.tar.gz

RUN mkdir -p /app
WORKDIR /app
RUN mkdir tmp

FROM base AS dependencies
COPY ./package*.json ./
RUN npm ci
COPY . .

FROM dependencies AS build
RUN node ace build --production --ignore-ts-errors

FROM base AS production

ENV NODE_ENV=production
ENV PORT=3333
ENV HOST=0.0.0.0

COPY ./package*.json ./
COPY ./prisma ./prisma
COPY ./newrelic.js ./newrelic.js

RUN npm ci --production
COPY --from=build /app/build .
EXPOSE $PORT
CMD [ "npm", "run", "prisma"]
CMD [ "node", "-r", "newrelic", "server.js" ]
