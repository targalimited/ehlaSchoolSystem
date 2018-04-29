FROM composer/composer:master

WORKDIR /app

COPY . .
COPY .env.development .env
RUN php artisan key:generate
RUN php artisan config:clear
RUN php artisan config:cache
RUN php artisan optimize

RUN mkdir -p /app/storage/framework/sessions /app/storage/framework/views /app/storage/framework/cache

EXPOSE 80
