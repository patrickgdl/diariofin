/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, name, image, created_at)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.created_at);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();