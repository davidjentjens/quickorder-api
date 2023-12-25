FROM node:16.16.0-slim

RUN apt install bash
USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

CMD [ ".docker/start.sh" ]