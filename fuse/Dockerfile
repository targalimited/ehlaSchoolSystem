FROM node:9.9.0-alpine
MAINTAINER Kyo
RUN mkdir -p /opt/school_system/frontend
WORKDIR /opt/school_system/frontend
COPY . .

RUN npm i -g --silent bower && \
    npm i -g --silent gulp && \
    cd fuse && bower i --allow-root && npm i


EXPOSE 3000
CMD gulp serve