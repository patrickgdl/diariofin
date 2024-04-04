CREATE TABLE public.reports (
  id uuid default gen_random_uuid () NOT NULL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  expire_at text,
  "from" text,
  "to" text,
  link_id text,
  short_link text,
  user_id uuid references auth.users (id) not null,
  type text
);

alter table reports enable row level security;

CREATE POLICY "Everyone can see reports" ON "public"."reports"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can create own reports" ON "public"."reports"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid()=user_id);

CREATE POLICY "Users can update own reports" ON "public"."reports"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid()=user_id)
WITH CHECK (auth.uid()=user_id);