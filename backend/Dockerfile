FROM composer/composer:master

WORKDIR /app
RUN mkdir -p /app/storage/framework/sessions /app/storage/framework/views /app/storage/framework/cache /app/bootstrap/cache
COPY . .

COPY .env.development .env
RUN php artisan key:generate
RUN php artisan config:clear
RUN php artisan config:cache
RUN php artisan optimize

EXPOSE 80
