## Installation (self hosted)

To install and set up the project instantly, run:

```bash
curl -sSL "https://raw.githubusercontent.com/GodzillaWasTaken/FinanceApp/main/install.sh" | bash
```

it will download a `docker-compose.yml` and a `.env` file that you need to fill in with your database credentials.

Once configured, start the application and run the database migrations:

```bash
# 1. Start the containers
docker compose up -d

# 2. Run migrations
docker compose exec backend python src/manage.py migrate
```