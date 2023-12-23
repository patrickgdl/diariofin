CREATE TABLE public.category_groups (
  id uuid default gen_random_uuid () NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);