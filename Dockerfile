FROM spiralout/docker-apache-php-composer:latest
MAINTAINER Kyo
RUN mkdir -p /opt/school_system
WORKDIR /opt/school_system
COPY . .

RUN npm i -g --silent bower
RUN npm i -g --silent gulp
RUN cd fuse && bower i --allow-root && npm i && gulp clean && gulp build
RUN cd backend && composer install && cp .env.development .env
COPY /opt/school_system/backend /var/www/site
EXPOSE 80 13310
CMD echo "Server Started"