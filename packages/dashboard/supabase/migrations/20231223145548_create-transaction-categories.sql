CREATE TABLE public.transaction_categories (
  id uuid default gen_random_uuid() NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  group_id uuid NOT NULL,
  CONSTRAINT transactions_categories_group_fkey FOREIGN KEY (group_id) REFERENCES public.category_groups(id)
);