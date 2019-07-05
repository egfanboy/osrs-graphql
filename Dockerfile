FROM node:10.16-alpine

COPY ./build ./shanty
COPY ./package.json ./shanty/package.json

WORKDIR /shanty

RUN yarn install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && node ./index
