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

## Re-running Migrations

When you made some new migrations or deleted/updated, you should now apply these migrations.

To easily apply just stop the containers:

```bash
npx supabase stop --no-backup
```

And start it again:

```bash
npx supabase start
```

You could also run, but sometimes there are some errors:

```bash
npx supabase db reset
```

## Recurring Transactions explained

https://vertabelo.com/blog/again-and-again-managing-recurring-events-in-a-data-model/

##### Daily Recurrence

Do we really need to capture a pattern for a daily recurring transaction? No, because all the details required to generate a daily recurrence pattern are already logged in the transactions table.

The only scenario that requires a pattern is when events are scheduled for alternate days or every X number of days. In this case, the separation_count column will help us understand the recurrence pattern and derive further instances.

##### Weekly Recurrence

We require only one additional column, day_of_week, to store which day of the week this transaction will take place. Assuming Monday is the first day of the week and Sunday is the last, possible values would be 1,2,3,4,5,6, and 7. Appropriate changes in the code that generates individual transaction occurrences should be made as needed. All remaining columns would be null for weekly events.

Let’s take a classic type of weekly transaction: the bi-weekly occurrence. In this case, we’ll say it happens every alternate week on a Tuesday, the second day of the week. So:

The recurring_type_id would be “weekly”.
The separation_count would be “1”.
The day_of_week would be “2”.

##### Monthly Recurrence

Besides day_of_week, we require two more columns to meet any monthly recurrence scenario. In brief, these columns are:

Week_of_month – This column is for transactions that are scheduled for a certain week of the month – i.e. the first, second, last, second to last, etc. We can store these values as 1,2,3, 4,.. (counting from the beginning of the month) or -1,-2,-3,... (counting from the end of the month).
Day_of_month – There are cases when an transaction is scheduled on a particular day of the month, say the 25th. This column meets this requirement. Like week_of_month, it can be populated with positive numbers ( “7” for the 7th day from the start of the month) or negative numbers ( “-7” for the seventh day from the end of the month).
Let’s now consider a more complicated example – a quarterly transaction. Suppose a company schedules a quarterly result projection transaction for the 11th day of the first month in each quarter (usually January, April, July, and October). So in this case:

The recurring_type_id would be “monthly”.
The separation_count would be “2”.
The day_of_month would be “11”.
All remaining columns would be null.
In the above example, we assume that the user is creating the quarterly result projection in January. Please note that this separation logic will start counting from the month, week, or day when the transaction is created.

On similar lines, half-yearly transactions can be logged as monthly transactions with a separation_count of “5”.

##### Yearly Recurrence

Yearly recurrence is quite straightforward. We have columns for particular days of the week and the month, so we only require one additional column for the month of year. We’ve named this column month_of_year.

## Deploy Supabase

If you haven't yet, you should first link your local project and remote project (one time only)

```
npx supabase@beta link --project-ref jejzmdizmkkczvnfvggc --debug
```

Deploy any local database migrations using db push, this is the daily basis command you should run for any new migrations:

```
npx supabase@beta db push
```

To run any local seed.sql you can reset the remote database (not usual). Something like:

```
npx supabase@beta db reset --db-url 'postgres://postgres:postgres@localhost:54322/postgres'
```

This is going to make something like this, note that this is only going to populate public schemas, auth is going to be empty by default:

```
Resetting remote database...
Applying migration 20220810154537_full.sql...
Seeding data supabase/seed.sql...
```

If seed is not created remember to run the seed.sql query manually on Supabase SQL Editor. It should already have a query called "Create Initial Data"
