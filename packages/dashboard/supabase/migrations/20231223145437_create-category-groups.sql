CREATE TABLE public.category_groups (
  id uuid default gen_random_uuid () NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(100) NOT NULL,
  user_id uuid references auth.users (id)
);

alter table category_groups enable row level security;

CREATE POLICY "Users can view own and special category_groups" ON "public"."category_groups"
AS PERMISSIVE FOR SELECT
TO public
USING ((auth.uid() = user_id) OR (user_id IS NULL));

CREATE POLICY "Users can create own category_groups" ON "public"."category_groups"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid()=user_id);

CREATE POLICY "Users can update own category_groups" ON "public"."category_groups"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid()=user_id)
WITH CHECK (auth.uid()=user_id);