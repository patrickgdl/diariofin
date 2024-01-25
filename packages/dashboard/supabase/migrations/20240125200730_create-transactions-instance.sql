-- If a particular instance of a recurring transaction is cancelled or rescheduled? 
-- All such instances are logged separately in the transactions_instance table.
CREATE TABLE public.transactions_instance (
  id uuid default gen_random_uuid () not null,
  transaction_id uuid NOT NULL,
  -- This column signify whether this instance is rescheduled to some later date/ time
  is_rescheduled BOOLEAN NOT NULL,
  -- This column signify whether this instance is cancelled.
  is_canceled BOOLEAN NOT NULL,
  -- This column signify whether this instance is done.
  is_done BOOLEAN NOT NULL,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP DEFAULT NULL,
  FOREIGN KEY (transaction_id) REFERENCES public.transactions(id)
);