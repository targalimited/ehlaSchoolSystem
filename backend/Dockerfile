FROM shin1x1/laravel-on-php7-apache

WORKDIR /var/www/html
RUN mkdir -p /var/www/html/storage/framework/sessions /var/www/html/storage/framework/views /var/www/html/storage/framework/cache /var/www/html/bootstrap/cache
COPY . .

RUN cp .env.development .env
RUN chown -R www-data:www-data \
        /var/www/html/storage \
        /var/www/html/bootstrap/cache

# RUN chmod 777 storage

RUN php artisan key:generate
RUN php artisan config:clear
RUN php artisan config:cache
RUN php artisan optimize

EXPOSE 80
