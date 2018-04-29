FROM shakyshane/laravel-php:latest

WORKDIR /var/www
RUN mkdir -p /var/www/storage/framework/sessions /var/www/storage/framework/views /var/www/storage/framework/cache /var/www/bootstrap/cache
COPY . .

COPY .env.development .env
RUN chown -R www-data:www-data \
        /var/www/storage \
        /var/www/bootstrap/cache

RUN php artisan key:generate
RUN php artisan config:clear
RUN php artisan config:cache
RUN php artisan optimize

EXPOSE 80
