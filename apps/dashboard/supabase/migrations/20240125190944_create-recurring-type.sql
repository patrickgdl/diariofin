CREATE TABLE public.recurring_types (
  id NUMERIC NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

alter table recurring_types enable row level security;

CREATE POLICY "everyone can see" ON "public"."recurring_types"
AS PERMISSIVE FOR SELECT
TO public
USING (true);