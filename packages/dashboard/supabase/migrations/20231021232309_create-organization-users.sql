create table
  public.organization_users (
    organization_id uuid not null,
    user_id uuid not null,
    constraint organization_users_pkey primary key (organization_id, user_id),
    constraint organization_users_organization_id_fkey foreign key (organization_id) references public.organization (id),
    constraint organization_users_user_id_fkey foreign key (user_id) references public.users (id)
  );