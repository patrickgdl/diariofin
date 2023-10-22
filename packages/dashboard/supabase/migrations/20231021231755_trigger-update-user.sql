/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create function public.update_public_user_info()
returns trigger as $$
begin
  update public.users 
  set email_verified = new.email_confirmed_at, updated_at = new.updated_at, name = new.raw_user_meta_data->>'full_name'
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.update_public_user_info();