create table public.account (
    id uuid default gen_random_uuid () not null,
    name text null,
    balance numeric null,
    status boolean null,
    account_number text null,
    agency text null,
    pix text null,
    pix_type text null,
    user_id uuid null,
    constraint account_user_id_fkey foreign key (user_id) references public.users (id)
  );