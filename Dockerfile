FROM node:10.16-alpine
COPY ./build ./shanty
WORKDIR /shanty
CMD ["node","./index"]
