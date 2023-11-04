CREATE TABLE public.address (
  cep TEXT NOT NULL,
  address TEXT NOT NULL,
  number TEXT NOT NULL,
  complement TEXT,
  neighborhood TEXT NOT NULL,
  city TEXT NOT NULL,
  uf TEXT NOT NULL,
  user_id uuid not null,
  constraint address_user_id_fkey foreign key (user_id) references public.users (id)
);
