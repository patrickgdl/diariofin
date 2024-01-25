CREATE TABLE public.recurring_pattern (
  transaction_id uuid NOT NULL PRIMARY KEY,
  -- This column signifies the type of recurrence, whether it is daily, weekly, monthly or yearly.
  recurring_type_id NUMERIC NOT NULL,
  -- This column signifies the interval (in days, weeks, or months) before the next transaction instance is allowed. 
  -- For example, if an transaction needs to be configured for every other week, then separation_count = “1” to meet this requirement. 
  separation_count NUMERIC DEFAULT 0,
  -- This column stores an arbitrary number that defines the logical end for a transaction (installments for example).
  max_num_of_ocurrences NUMERIC,
  -- Stores which day of the week the transaction will take place. Assuming Monday is the first day of the week and Sunday is the last, possible values would be 1,2,3,4,5,6, and 7
  day_of_week NUMERIC,
  -- This is for Monthly recurrence, transactions that are scheduled for a certain week of the month – i.e. the first, second, last, second to last, etc. We can store these values as 1,2,3, 4,.. (counting from the beginning of the month) or -1,-2,-3,... (counting from the end of the month).
  week_of_month NUMERIC,
  -- This is for Monthly recurrence. There are cases when an transaction is scheduled on a particular day of the month, say the 25th. This column meets this requirement. Like week_of_month, it can be populated with positive numbers ( “7” for the 7th day from the start of the month) or negative numbers ( “-7” for the seventh day from the end of the month).
  day_of_month NUMERIC,
  -- This if for Yearly recurrence
  month_of_year NUMERIC,
  FOREIGN KEY (transaction_id) REFERENCES public.transactions(id),
  FOREIGN KEY (recurring_type_id) REFERENCES public.recurring_types(id)
);