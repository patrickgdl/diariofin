/** 
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create table users (
  -- UUID from auth.users
  id uuid references auth.users(id) not null primary key,
  name text,
  email text,
  email_verified timestamp with time zone,
  image text,
  created_at timestamp with time zone, 
  updated_at timestamp with time zone,
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,
  stripe_current_period_end timestamp with time zone
);

alter table users add constraint unique_email unique (email);
alter table users add constraint unique_stripe_customer_id unique (stripe_customer_id);
alter table users add constraint unique_stripe_subscription_id unique (stripe_subscription_id);
alter table users enable row level security;
create policy "Users can view own user data." on users for select using (auth.uid() = id);
create policy "Users can update own user data." on users for update using (auth.uid() = id);
