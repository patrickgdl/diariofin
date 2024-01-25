CREATE TABLE public.transactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  amount DECIMAL(10, 2) NOT NULL,
  description VARCHAR(255),
  type_id NUMERIC NOT NULL,
  account_id uuid NOT NULL,
  category_id uuid NULL,
  client_id uuid NULL,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP DEFAULT NULL,
  is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
  -- This is used when all future instances of a recurring are rescheduled. 
  -- Where we create a new transaction with new date and link it with its earlier transaction (the parent transaction) 
  -- With this solution, we can get all past occurrences of an transaction, even when its recurrence pattern has been changed.
  parent_transaction_id uuid NULL,
  CONSTRAINT transactions_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id),
  CONSTRAINT transactions_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.transaction_types(id),
  FOREIGN KEY (category_id) REFERENCES public.transaction_categories(id),
  FOREIGN KEY (client_id) REFERENCES public.clients(id),
  CONSTRAINT transactions_parent_id_fkey FOREIGN KEY (parent_transaction_id) REFERENCES public.transactions(id)
);