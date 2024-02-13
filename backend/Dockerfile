# Use dunglas/frankenphp image as the base image
FROM dunglas/frankenphp

# Copy files
COPY ./config/Caddyfile /etc/caddy/Caddyfile
COPY ./app /app

# Expose port 80 for HTTP traffic and 443 for HTTPS
EXPOSE 80
EXPOSE 443

# The default command runs FrankenPHP server
CMD ["frankenphp", "php-server", "/app/index.php"]
