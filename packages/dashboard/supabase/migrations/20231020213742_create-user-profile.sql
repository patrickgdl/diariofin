create table "public"."user_profiles" (
    "user_id" uuid not null,
    "username" text not null
);

CREATE UNIQUE INDEX user_profiles_pkey ON public.user_profiles USING btree (user_id);

CREATE UNIQUE INDEX user_profiles_username_key ON public.user_profiles USING btree (username);

alter table "public"."user_profiles" add constraint "user_profiles_pkey" PRIMARY KEY using index "user_profiles_pkey";

alter table "public"."user_profiles" add constraint "proper_username" CHECK ((username ~* '^[a-zA-Z0-9_]+$'::text)) not valid;

alter table "public"."user_profiles" validate constraint "proper_username";

alter table "public"."user_profiles" add constraint "user_profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."user_profiles" validate constraint "user_profiles_user_id_fkey";

alter table "public"."user_profiles" add constraint "user_profiles_username_key" UNIQUE using index "user_profiles_username_key";

alter table "public"."user_profiles" add constraint "username_length" CHECK (((char_length(username) >= 3) AND (char_length(username) <= 14))) not valid;

alter table "public"."user_profiles" validate constraint "username_length";

