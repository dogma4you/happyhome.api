#!/bin/bash
npx knex migrate:make $1 --knexfile src/knexfile.ts
