CREATE TABLE public.transactions (
  id uuid NOT NULL PRIMARY KEY,
  amount DECIMAL(10, 2) NOT NULL,
  description VARCHAR(255),
  type_id uuid NOT NULL,
  account_id uuid NOT NULL,
  category_id uuid NULL,
  client_id uuid NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT transactions_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id),
  CONSTRAINT transactions_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.transaction_types(id),
  FOREIGN KEY (category_id) REFERENCES public.transaction_categories(id),
  FOREIGN KEY (client_id) REFERENCES public.clients(id)
);