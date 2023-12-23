create table public.clients (
  id uuid default gen_random_uuid () not null,
  name VARCHAR(255) NOT NULL,
  person_type VARCHAR(10) NOT NULL,
  email VARCHAR(255) NULL,
  cpf_cnpj VARCHAR(20) NULL,
  phone VARCHAR(20) NULL,
  description TEXT,
  is_client BOOLEAN NOT NULL DEFAULT TRUE,
  is_supplier BOOLEAN NOT NULL DEFAULT FALSE
);

alter table
  clients
add
  constraint unique_id unique (id);