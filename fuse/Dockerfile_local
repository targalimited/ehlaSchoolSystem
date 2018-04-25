FROM node:7
MAINTAINER Kyo
RUN mkdir -p /opt/school_system/frontend
WORKDIR /opt/school_system/frontend
COPY . .

RUN npm i -g --silent bower && \
    npm i -g --silent gulp && \
    bower i --allow-root && npm i


EXPOSE 3000
CMD npm rebuild node-sass && gulp serve