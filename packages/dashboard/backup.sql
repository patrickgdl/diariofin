--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 16.0 (Ubuntu 16.0-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'aa3d7d3f-4f16-447f-a118-f656297049e5', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"patrick@email.com","user_id":"677fe9e0-b364-4a5d-b5e3-03be82e1f435","user_phone":""}}', '2023-10-27 21:19:40.514404+00', '');
INSERT INTO auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) VALUES ('00000000-0000-0000-0000-000000000000', 'e4b61cff-5056-4f94-a650-aa4372bfa797', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"juliana@email.com","user_id":"5c2c6e47-7caf-4a27-9318-a50346adaa4c","user_phone":""}}', '2023-10-27 21:20:01.924726+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at) VALUES ('00000000-0000-0000-0000-000000000000', '677fe9e0-b364-4a5d-b5e3-03be82e1f435', 'authenticated', 'authenticated', 'patrick@email.com', '$2a$10$KLJjEfz4mipuLrLDUvvFCeYKjDbG.Kt1NbRhWKdNWIKjgVibuJyr6', '2023-10-27 21:19:40.520076+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-10-27 21:19:40.501775+00', '2023-10-27 21:19:40.520379+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at) VALUES ('00000000-0000-0000-0000-000000000000', '5c2c6e47-7caf-4a27-9318-a50346adaa4c', 'authenticated', 'authenticated', 'juliana@email.com', '$2a$10$HIznVJkvB0efvOhHspGR9u1EGg0Q0fwTaw85lvd7xQGvoeWN21PMm', '2023-10-27 21:20:01.927305+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-10-27 21:20:01.920752+00', '2023-10-27 21:20:01.927491+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at) VALUES ('677fe9e0-b364-4a5d-b5e3-03be82e1f435', '677fe9e0-b364-4a5d-b5e3-03be82e1f435', '{"sub": "677fe9e0-b364-4a5d-b5e3-03be82e1f435", "email": "patrick@email.com"}', 'email', '2023-10-27 21:19:40.51147+00', '2023-10-27 21:19:40.511517+00', '2023-10-27 21:19:40.511517+00');
INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at) VALUES ('5c2c6e47-7caf-4a27-9318-a50346adaa4c', '5c2c6e47-7caf-4a27-9318-a50346adaa4c', '{"sub": "5c2c6e47-7caf-4a27-9318-a50346adaa4c", "email": "juliana@email.com"}', 'email', '2023-10-27 21:20:01.922858+00', '2023-10-27 21:20:01.922914+00', '2023-10-27 21:20:01.922914+00');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.schema_migrations (version) VALUES ('20171026211738');
INSERT INTO auth.schema_migrations (version) VALUES ('20171026211808');
INSERT INTO auth.schema_migrations (version) VALUES ('20171026211834');
INSERT INTO auth.schema_migrations (version) VALUES ('20180103212743');
INSERT INTO auth.schema_migrations (version) VALUES ('20180108183307');
INSERT INTO auth.schema_migrations (version) VALUES ('20180119214651');
INSERT INTO auth.schema_migrations (version) VALUES ('20180125194653');
INSERT INTO auth.schema_migrations (version) VALUES ('00');
INSERT INTO auth.schema_migrations (version) VALUES ('20210710035447');
INSERT INTO auth.schema_migrations (version) VALUES ('20210722035447');
INSERT INTO auth.schema_migrations (version) VALUES ('20210730183235');
INSERT INTO auth.schema_migrations (version) VALUES ('20210909172000');
INSERT INTO auth.schema_migrations (version) VALUES ('20210927181326');
INSERT INTO auth.schema_migrations (version) VALUES ('20211122151130');
INSERT INTO auth.schema_migrations (version) VALUES ('20211124214934');
INSERT INTO auth.schema_migrations (version) VALUES ('20211202183645');
INSERT INTO auth.schema_migrations (version) VALUES ('20220114185221');
INSERT INTO auth.schema_migrations (version) VALUES ('20220114185340');
INSERT INTO auth.schema_migrations (version) VALUES ('20220224000811');
INSERT INTO auth.schema_migrations (version) VALUES ('20220323170000');
INSERT INTO auth.schema_migrations (version) VALUES ('20220429102000');
INSERT INTO auth.schema_migrations (version) VALUES ('20220531120530');
INSERT INTO auth.schema_migrations (version) VALUES ('20220614074223');
INSERT INTO auth.schema_migrations (version) VALUES ('20220811173540');
INSERT INTO auth.schema_migrations (version) VALUES ('20221003041349');
INSERT INTO auth.schema_migrations (version) VALUES ('20221003041400');
INSERT INTO auth.schema_migrations (version) VALUES ('20221011041400');
INSERT INTO auth.schema_migrations (version) VALUES ('20221020193600');
INSERT INTO auth.schema_migrations (version) VALUES ('20221021073300');
INSERT INTO auth.schema_migrations (version) VALUES ('20221021082433');
INSERT INTO auth.schema_migrations (version) VALUES ('20221027105023');
INSERT INTO auth.schema_migrations (version) VALUES ('20221114143122');
INSERT INTO auth.schema_migrations (version) VALUES ('20221114143410');
INSERT INTO auth.schema_migrations (version) VALUES ('20221125140132');
INSERT INTO auth.schema_migrations (version) VALUES ('20221208132122');
INSERT INTO auth.schema_migrations (version) VALUES ('20221215195500');
INSERT INTO auth.schema_migrations (version) VALUES ('20221215195800');
INSERT INTO auth.schema_migrations (version) VALUES ('20221215195900');
INSERT INTO auth.schema_migrations (version) VALUES ('20230116124310');
INSERT INTO auth.schema_migrations (version) VALUES ('20230116124412');
INSERT INTO auth.schema_migrations (version) VALUES ('20230131181311');
INSERT INTO auth.schema_migrations (version) VALUES ('20230322519590');
INSERT INTO auth.schema_migrations (version) VALUES ('20230402418590');
INSERT INTO auth.schema_migrations (version) VALUES ('20230411005111');
INSERT INTO auth.schema_migrations (version) VALUES ('20230508135423');
INSERT INTO auth.schema_migrations (version) VALUES ('20230523124323');


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, name, email, email_verified, image, created_at, updated_at, stripe_customer_id, stripe_subscription_id, stripe_price_id, stripe_current_period_end) VALUES ('677fe9e0-b364-4a5d-b5e3-03be82e1f435', NULL, 'patrick@email.com', '2023-10-27 21:19:40.520076+00', NULL, '2023-10-27 21:19:40.501775+00', '2023-10-27 21:19:40.520379+00', NULL, NULL, NULL, NULL);
INSERT INTO public.users (id, name, email, email_verified, image, created_at, updated_at, stripe_customer_id, stripe_subscription_id, stripe_price_id, stripe_current_period_end) VALUES ('5c2c6e47-7caf-4a27-9318-a50346adaa4c', NULL, 'juliana@email.com', '2023-10-27 21:20:01.927305+00', NULL, '2023-10-27 21:20:01.920752+00', '2023-10-27 21:20:01.927491+00', NULL, NULL, NULL, NULL);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: organization_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

