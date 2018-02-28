FROM savaslabs/node-php-composer:1.2
MAINTAINER Kyo
RUN mkdir -p /opt/school_system
WORKDIR /opt/school_system
COPY . .

RUN npm i -g --silent bower
RUN npm i -g --silent gulp
RUN cd fuse && bower i --allow-root && npm i && gulp clean && gulp build
RUN cd backend && composer install && cp .env.development .env
EXPOSE 80 13310
CMD cd backend && php artisan serve --host=0.0.0.0 --port=80