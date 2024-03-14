CREATE TABLE public.transaction_categories (
  id uuid default gen_random_uuid () NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(100) NOT NULL,
  group_id uuid NOT NULL,
  user_id uuid references auth.users (id),
  CONSTRAINT transactions_categories_group_fkey FOREIGN KEY (group_id) REFERENCES public.category_groups(id)
);

alter table transaction_categories enable row level security;

CREATE POLICY "Users can view own and special transaction_categories" ON "public"."transaction_categories"
AS PERMISSIVE FOR SELECT
TO public
USING ((auth.uid() = user_id) OR (user_id IS NULL));

CREATE POLICY "Users can create own transaction_categories" ON "public"."transaction_categories"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid()=user_id);

CREATE POLICY "Users can update own transaction_categories" ON "public"."transaction_categories"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid()=user_id)
WITH CHECK (auth.uid()=user_id);