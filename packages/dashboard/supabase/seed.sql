-- Create auth test users
--
-- Data for auth.users; Schema: auth
--
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at) VALUES ('00000000-0000-0000-0000-000000000000', '677fe9e0-b364-4a5d-b5e3-03be82e1f435', 'authenticated', 'authenticated', 'patrick@email.com', '$2a$10$KLJjEfz4mipuLrLDUvvFCeYKjDbG.Kt1NbRhWKdNWIKjgVibuJyr6', '2023-10-27 21:19:40.520076+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-10-27 21:19:40.501775+00', '2023-10-27 21:19:40.520379+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at) VALUES ('00000000-0000-0000-0000-000000000000', '5c2c6e47-7caf-4a27-9318-a50346adaa4c', 'authenticated', 'authenticated', 'juliana@email.com', '$2a$10$HIznVJkvB0efvOhHspGR9u1EGg0Q0fwTaw85lvd7xQGvoeWN21PMm', '2023-10-27 21:20:01.927305+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-10-27 21:20:01.920752+00', '2023-10-27 21:20:01.927491+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);

--
-- Data for auth.identities; Schema: auth
--
INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at) VALUES ('677fe9e0-b364-4a5d-b5e3-03be82e1f435', '677fe9e0-b364-4a5d-b5e3-03be82e1f435', '{"sub": "677fe9e0-b364-4a5d-b5e3-03be82e1f435", "email": "patrick@email.com"}', 'email', '2023-10-27 21:19:40.51147+00', '2023-10-27 21:19:40.511517+00', '2023-10-27 21:19:40.511517+00');
INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at) VALUES ('5c2c6e47-7caf-4a27-9318-a50346adaa4c', '5c2c6e47-7caf-4a27-9318-a50346adaa4c', '{"sub": "5c2c6e47-7caf-4a27-9318-a50346adaa4c", "email": "juliana@email.com"}', 'email', '2023-10-27 21:20:01.922858+00', '2023-10-27 21:20:01.922914+00', '2023-10-27 21:20:01.922914+00');


-- Create public.account values
--
-- Data for public.account; Schema: public
--
INSERT INTO public.account (id, name, balance, status, account_number, agency, pix, pix_type, user_id) VALUES ('589f4b55-4c84-46bd-a31d-5fd8417eebaf', 'C6 Bank', 1000, true, '234527', '0001', '09440091908', 'cpf-cnpj', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');
INSERT INTO public.account (id, name, balance, status, account_number, agency, pix, pix_type, user_id) VALUES ('2c6b5b7a-785e-4ac1-9a4d-24dd2d02aaa4', 'Nubank', 900, true, '12344', '0001', '09295930082', 'cpf-cnpj', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');
INSERT INTO public.account (id, name, balance, status, account_number, agency, pix, pix_type, user_id) VALUES ('ee92d24a-0aa8-4195-9e19-e367c2a8aede', 'Itaú', 700, true, '808080', '0001', 'patrickgdlima@gmail.com', 'email', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');


-- Create public.clients values
--
-- Data for public.clients; Schema: public
--
INSERT INTO public.clients (id, name, person_type, email, cpf_cnpj, phone, description, is_client, is_supplier) VALUES ('e28e3adc-ccfd-48ae-9f66-83759b29f540', 'Vs Informática', 'legal', 'juliana@solucoesvs.com.br', '08.302.412/0001-98', '(41) 3642-1190', '', true, true);


-- Create public.address values
--
-- Data for public.address; Schema: public
--
INSERT INTO public.address (id, cep, address, number, complement, neighborhood, city, uf, client_id) VALUES ('09e1734d-9356-4cbb-a308-865358fe9c93', '83.701-300', 'Rua Alagoas', '416', NULL, 'Iguaçu', 'Araucária', 'PR', 'e28e3adc-ccfd-48ae-9f66-83759b29f540');


-- Create public.category_groups values
--
-- Data for public.category_groups; Schema: public
--
INSERT INTO public.category_groups (id, name) VALUES ('1151ff10-0a2b-498c-b55f-ae4f554d41a4', 'Receita Operacional');
INSERT INTO public.category_groups (id, name) VALUES ('5011e7e0-9097-4171-a306-5d1d25dee5de', 'Financiamentos');


-- Create public.transaction_categories values
--
-- Data for public.transaction_categories; Schema: public
--
INSERT INTO public.transaction_categories (id, name, group_id) VALUES ('3dc3ba14-2243-4003-a03e-fa18331041c0', 'Receitas com Serviços', '1151ff10-0a2b-498c-b55f-ae4f554d41a4');
INSERT INTO public.transaction_categories (id, name, group_id) VALUES ('83e8b0b5-3d43-4618-9aef-7980022f5603', 'Aporte de Capital', '5011e7e0-9097-4171-a306-5d1d25dee5de');


-- Create public.transaction_types values
--
-- Data for public.transaction_types; Schema: public
--
INSERT INTO public.transaction_types (id, name) VALUES ('ee9b7660-332f-4ae3-a6d6-4c630bad2b13', 'INCOME');
INSERT INTO public.transaction_types (id, name) VALUES ('e18bb7e2-9eac-4fd1-9830-98b3a99173a9', 'EXPENSE');


-- Create public.transaction_types values
--
-- Data for public.transaction_types; Schema: public
--
INSERT INTO transactions (id, amount, description, type_id, account_id, category_id, client_id) VALUES ('b7d5044e-e98b-4c1d-b594-1f437b7d2282', 1000, 'Salário', 'ee9b7660-332f-4ae3-a6d6-4c630bad2b13', '589f4b55-4c84-46bd-a31d-5fd8417eebaf', '3dc3ba14-2243-4003-a03e-fa18331041c0', 'e28e3adc-ccfd-48ae-9f66-83759b29f540');
INSERT INTO transactions (id, amount, description, type_id, account_id, category_id, client_id) VALUES ('cfc6efe7-772e-4cc5-bb7d-3c0666a4dd04', -500, 'Pagamento de Fatura', 'e18bb7e2-9eac-4fd1-9830-98b3a99173a9', '589f4b55-4c84-46bd-a31d-5fd8417eebaf', '3dc3ba14-2243-4003-a03e-fa18331041c0', 'e28e3adc-ccfd-48ae-9f66-83759b29f540');