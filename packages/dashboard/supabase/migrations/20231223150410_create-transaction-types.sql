create table public.transaction_types (
  id uuid default gen_random_uuid () NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);