#!/bin/bash

DB_NAME="happy_home"
NEW_DB_NAME="happy_home"
POSTGRES_USER="postgres"
SCRIPT="./migrate.sh"

execute_psql() {
  sudo -i -u $POSTGRES_USER psql -c "$1"
}

echo "Dropping database $DB_NAME if it exists..."
execute_psql "REVOKE CONNECT ON DATABASE $DB_NAME FROM public;"
execute_psql "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$DB_NAME' AND pid <> pg_backend_pid();"
execute_psql "DROP DATABASE IF EXISTS $DB_NAME;"

echo "Creating new database $NEW_DB_NAME..."
execute_psql "CREATE DATABASE $NEW_DB_NAME;"

echo "Running additional scripts..."
if [ -x "$SCRIPT" ]; then
  $SCRIPT
else
  echo "Script $SCRIPT not found or not executable."
fi

npm run seed

echo "Database management and script execution completed."
