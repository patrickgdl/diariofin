CREATE TABLE public.transactions (
  id uuid DEFAULT gen_random_uuid () PRIMARY KEY,
  amount DECIMAL(10, 2) NOT NULL,
  description VARCHAR(255) NOT NULL,
  notes VARCHAR(500) NULL,
  type_id NUMERIC NOT NULL,
  account_id uuid NOT NULL,
  category_id uuid NULL,
  client_id uuid DEFAULT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
  user_id uuid references auth.users (id) not null,
  -- This is used when future instances of a recurring are rescheduled or a transaction is refunded. 
  -- We create a new transaction with new date, type, category or amount (negative/positive) and link it with its earlier transaction (the parent transaction) 
  -- With this solution, we can get all past occurrences of an transaction, even when its recurrence pattern or category (refund) has been changed.
  parent_transaction_id uuid NULL,
  CONSTRAINT transactions_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id),
  CONSTRAINT transactions_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.transaction_types(id),
  FOREIGN KEY (category_id) REFERENCES public.transaction_categories(id),
  FOREIGN KEY (client_id) REFERENCES public.clients(id),
  CONSTRAINT transactions_parent_id_fkey FOREIGN KEY (parent_transaction_id) REFERENCES public.transactions(id)
);

alter table transactions enable row level security;

CREATE POLICY "Users can view own transactions" ON "public"."transactions"
AS PERMISSIVE FOR SELECT
TO public
USING (auth.uid()=user_id);

CREATE POLICY "Users can create own transactions" ON "public"."transactions"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (auth.uid()=user_id);

CREATE POLICY "Users can update own transactions" ON "public"."transactions"
AS PERMISSIVE FOR UPDATE
TO public
USING (auth.uid()=user_id)
WITH CHECK (auth.uid()=user_id);