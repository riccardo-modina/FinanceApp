#!/bin/sh
set -e

# Wait for database to be ready
echo "Waiting for database..."
python << END
import sys
import psycopg2
import os
import time

dbname = os.environ.get('POSTGRES_DB')
user = os.environ.get('POSTGRES_USER')
password = os.environ.get('POSTGRES_PASSWORD')
host = os.environ.get('POSTGRES_HOST')
port = os.environ.get('POSTGRES_PORT', 5432)

max_retries = 30
retries = 0

while retries < max_retries:
    try:
        conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
        conn.close()
        break
    except Exception as e:
        retries += 1
        print(f"Database not ready... ({e}) retrying in 1s ({retries}/{max_retries})")
        time.sleep(1)
else:
    print("Could not connect to database. Exiting.")
    sys.exit(1)
END
echo "Database ready!"

# Run migrations
echo "Running migrations..."
python src/manage.py migrate --noinput

# Execute the CMD
echo "Executing: $@"
exec "$@"
