server {
    listen 80;
    listen [::]:80;

    server_name teerece.tk www.teerece.tk;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://teerece.tk$request_uri;
    }
}