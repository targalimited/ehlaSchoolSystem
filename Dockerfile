FROM spiralout/docker-apache-php-composer:latest
MAINTAINER Kyo
RUN mkdir -p /opt/school_system
WORKDIR /opt/school_system
COPY . .


RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

#change it to your required node version
ENV NODE_VERSION 7.6.0

#needed by nvm install
ENV NVM_DIR /home/node/.nvm

#install the specified node version and set it as the default one, install the global npm packages
RUN . ~/.nvm/nvm.sh && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION && \
    npm i -g --silent bower && \
    npm i -g --silent gulp && \
    cd fuse && bower i --allow-root && npm i && gulp clean && gulp build

RUN cd backend && composer install && cp .env.development .env
COPY /opt/school_system/backend /var/www/site
EXPOSE 80 13310
CMD echo "Server Started"