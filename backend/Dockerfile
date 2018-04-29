FROM composer/composer:master

COPY composer.lock composer.json /app/
COPY database /app/database
WORKDIR /app
#RUN composer install
COPY . .
#RUN rm .env
COPY .env.development .env
RUN php artisan key:generate
RUN php artisan config:clear
RUN php artisan config:cache
RUN php artisan optimize

EXPOSE 80
