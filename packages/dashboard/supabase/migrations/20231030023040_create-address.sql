CREATE TABLE public.address (
  id uuid default gen_random_uuid () not null,
  cep TEXT NOT NULL,
  address TEXT NOT NULL,
  number TEXT NOT NULL,
  complement TEXT,
  neighborhood TEXT NOT NULL,
  city TEXT NOT NULL,
  uf TEXT NOT NULL,
  client_id uuid not null,
  constraint address_client_id_fkey foreign key (client_id) references public.clients (id)
);