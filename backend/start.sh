#!/bin/sh
set -e

# Default to production if DJANGO_DEBUG is not set to True
if [ "$DJANGO_DEBUG" = "True" ]; then
    echo "Starting Django Development Server on port 8080..."
    exec python src/manage.py runserver 0.0.0.0:8080
else
    echo "Starting Gunicorn Production Server on port 8080..."
    exec gunicorn config.wsgi:application --bind 0.0.0.0:8080 --workers 3
fi
