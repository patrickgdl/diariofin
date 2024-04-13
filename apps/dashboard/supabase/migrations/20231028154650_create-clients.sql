create table public.clients (
  id uuid default gen_random_uuid () not null,
  name VARCHAR(255) NOT NULL,
  person_type VARCHAR(10) NOT NULL,
  email VARCHAR(255) NULL,
  cpf_cnpj VARCHAR(20) NULL,
  phone VARCHAR(20) NULL,
  description TEXT,
  is_client BOOLEAN NOT NULL DEFAULT TRUE,
  -- we have both is_client and is_supplier because a client row can be both
  is_supplier BOOLEAN NOT NULL DEFAULT FALSE,
  user_id uuid references auth.users (id) not null
);

alter table
  clients
add
  constraint unique_id unique (id);

alter table clients enable row level security;

CREATE POLICY "Users can view own clients" ON "public"."clients"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid()=user_id);

CREATE POLICY "Users can create own clients" ON "public"."clients"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid()=user_id);

CREATE POLICY "Users can update own clients" ON "public"."clients"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid()=user_id)
WITH CHECK (auth.uid()=user_id);