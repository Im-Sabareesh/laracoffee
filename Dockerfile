# Use an official PHP runtime as a parent image
FROM php:8.1-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Install Node.js 14 and npm
# Install Node.js 14 and npm explicitly
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs && \
    apt-get install -y npm && \
    node -v && npm -v

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy Laravel application files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Install Node.js dependencies
RUN npm install 

COPY default.conf /etc/nginx/conf.d/default.conf

COPY script.sh /usr/local/bin/script.sh

RUN chmod +x /usr/local/bin/script.sh

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

RUN php artisan key:generate

RUN php artisan storage:link
# Expose port
EXPOSE 8000

# Start PHP-FPM server
CMD ["/usr/local/bin/script.sh"]
