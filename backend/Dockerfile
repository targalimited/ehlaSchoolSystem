FROM shin1x1/laravel-on-php7-apache
MAINTAINER Kyo

RUN mkdir -p /var/www/html
WORKDIR /var/www/html
COPY . .
RUN cp .env.local .env

EXPOSE 80
