create table public.account (
  id uuid default gen_random_uuid () not null PRIMARY KEY,
  name text NOT NULL,
  balance numeric DEFAULT 0 NOT NULL,
  active boolean DEFAULT true NOT NULL,
  account_number text null,
  agency text null,
  pix text null,
  pix_type text null,
  user_id uuid references auth.users (id) not null
);

alter table account enable row level security;

CREATE POLICY "Users can view own accounts" ON "public"."account"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid()=user_id);

CREATE POLICY "Users can create own accounts" ON "public"."account"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid()=user_id);

CREATE POLICY "Users can update own accounts" ON "public"."account"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid()=user_id)
WITH CHECK (auth.uid()=user_id);