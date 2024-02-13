# Use dunglas/frankenphp image as the base
FROM dunglas/frankenphp

COPY ./config/Caddyfile /etc/caddy/Caddyfile

COPY ./app /app

# Expose port 80 for HTTP traffic
EXPOSE 80
EXPOSE 443


# The default command runs FrankenPHP with PHP-FPM and the built-in server
CMD ["frankenphp", "php-server", "/app/index.php"]