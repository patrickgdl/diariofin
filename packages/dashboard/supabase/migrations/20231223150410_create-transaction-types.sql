create table public.transaction_types (
  id NUMERIC NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

alter table transaction_types enable row level security;

CREATE POLICY "everyone can see" ON "public"."transaction_types"
AS PERMISSIVE FOR SELECT
TO public
USING (true);
