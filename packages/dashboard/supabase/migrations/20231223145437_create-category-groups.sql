CREATE TABLE public.category_groups (
  id uuid default gen_random_uuid () NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  user_id uuid references auth.users (id) not null
);

alter table category_groups enable row level security;

CREATE POLICY "Users can view own category_groups" ON "public"."category_groups"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid()=user_id);

CREATE POLICY "Users can create own category_groups" ON "public"."category_groups"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid()=user_id);

CREATE POLICY "Users can update own category_groups" ON "public"."category_groups"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid()=user_id)
WITH CHECK (auth.uid()=user_id);