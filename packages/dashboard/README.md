# Fluxo Simples's Dashboard

This is the dashboard for Fluxo Simples's website.

## Running locally

To run the dashboard locally, you need to have [Node.js](https://nodejs.org/en/) installed.

After installing Node.js, run the following commands:

```bash
npm install
npm run dev
```

The dashboard will be available at http://localhost:3000.

## Local Supabase

To run the dashboard locally, you need to have [Docker](https://www.docker.com/) installed.

After installing Docker, you need to install Supabase CLI

```bash
npm install -g supabase-cli
```

After installing Supabase CLI, run the following commands:

```bash
npx supabase init
```

Then run:

````bash

```bash
npx supabase start
````

To know which port Supabase is running, run:

```bash
npx supabase status
```
