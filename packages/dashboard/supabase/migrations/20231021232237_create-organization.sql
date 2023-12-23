create table public.organization (
  id uuid default gen_random_uuid () not null,
  name text null,
  constraint organization_pkey primary key (id)
);