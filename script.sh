#!/bin/bash
echo "Starting Laravel application..."
php artisan migrate
php artisan db:seed
php artisan serve --host=0.0.0.0 --port=8000
php-fpm
