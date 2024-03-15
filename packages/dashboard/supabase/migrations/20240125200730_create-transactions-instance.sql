-- If a particular instance of a recurring transaction is cancelled or marked as done/reviewed? 
-- All such instances are logged separately in the transactions_instance table.
CREATE TABLE public.transactions_instance (
  -- UUID from public.transactions
  transaction_id uuid REFERENCES public.transactions(id) NOT NULL PRIMARY KEY,
  -- This column signify whether this instance is cancelled.
  is_cancelled BOOLEAN DEFAULT FALSE,
  -- This column signify whether this instance is refunded.
  is_refunded BOOLEAN DEFAULT FALSE,
  -- This column signify whether this instance is done.
  is_done BOOLEAN NOT NULL,
  user_id uuid references auth.users (id) not null
);

alter table transactions_instance enable row level security;

CREATE POLICY "Users can view own transactions_instance" ON "public"."transactions_instance"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid()=user_id);

CREATE POLICY "Users can create own transactions_instance" ON "public"."transactions_instance"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid()=user_id);

CREATE POLICY "Users can update own transactions_instance" ON "public"."transactions_instance"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid()=user_id)
WITH CHECK (auth.uid()=user_id);