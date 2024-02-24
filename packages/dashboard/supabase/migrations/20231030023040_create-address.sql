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
  user_id uuid references auth.users (id) not null,
  constraint address_client_id_fkey foreign key (client_id) references public.clients (id)
);

alter table address enable row level security;

CREATE POLICY "Users can view own client address" ON "public"."address"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid()=user_id);

CREATE POLICY "Users can create own address" ON "public"."address"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid()=user_id);

CREATE POLICY "Users can update own client address" ON "public"."address"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid()=user_id)
WITH CHECK (auth.uid()=user_id);