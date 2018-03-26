FROM composer/composer:master-php5-alpine
MAINTAINER Kyo
RUN mkdir -p /opt/school_system/backend
WORKDIR /opt/school_system/backend
COPY . .

RUN cd backend && composer install && cp .env.development .env

EXPOSE 8080
CMD php artisan serve