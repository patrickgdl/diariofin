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
INSERT INTO public.account (id, name, balance, active, account_number, agency, pix, pix_type, user_id) VALUES ('589f4b55-4c84-46bd-a31d-5fd8417eebaf', 'C6 Bank', 1000, true, '234527', '0001', '09440091908', 'cpf-cnpj', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');
INSERT INTO public.account (id, name, balance, active, account_number, agency, pix, pix_type, user_id) VALUES ('2c6b5b7a-785e-4ac1-9a4d-24dd2d02aaa4', 'Nubank', 900, true, '12344', '0001', '09295930082', 'cpf-cnpj', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');
INSERT INTO public.account (id, name, balance, active, account_number, agency, pix, pix_type, user_id) VALUES ('ee92d24a-0aa8-4195-9e19-e367c2a8aede', 'Itaú', 700, true, '808080', '0001', 'patrickgdlima@gmail.com', 'email', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');


-- Create public.clients values
--
-- Data for public.clients; Schema: public
--
INSERT INTO public.clients (id, name, person_type, email, cpf_cnpj, phone, description, is_client, is_supplier, user_id) VALUES ('e28e3adc-ccfd-48ae-9f66-83759b29f540', 'Vs Informática', 'legal', 'juliana@solucoesvs.com.br', '08.302.412/0001-98', '(41) 3642-1190', '', true, true, '677fe9e0-b364-4a5d-b5e3-03be82e1f435');


-- Create public.address values
--
-- Data for public.address; Schema: public
--
INSERT INTO public.address (id, cep, address, number, complement, neighborhood, city, uf, client_id, user_id) VALUES ('09e1734d-9356-4cbb-a308-865358fe9c93', '83.701-300', 'Rua Alagoas', '416', NULL, 'Iguaçu', 'Araucária', 'PR', 'e28e3adc-ccfd-48ae-9f66-83759b29f540', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');


-- Create public.category_groups values
--
-- Data for public.category_groups; Schema: public
--
INSERT INTO public.category_groups (id, name, color, user_id) VALUES ('492f210b-0def-43e7-9786-393ebf2d6a6a', 'Carro & Transporte', '#34D399', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');
INSERT INTO public.category_groups (id, name, color, user_id) VALUES ('1151ff10-0a2b-498c-b55f-ae4f554d41a4', 'Casa & Jardim', '#ff75c3', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');
INSERT INTO public.category_groups (id, name, color, user_id) VALUES ('5011e7e0-9097-4171-a306-5d1d25dee5de', 'Comida & Bebida', '#ffa647', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');


-- Create public.transaction_categories values
--
-- Data for public.transaction_categories; Schema: public
--
INSERT INTO public.transaction_categories (id, name, icon, group_id, user_id) VALUES ('c5aee89c-f7ca-430d-ba9e-d9a90ada09d7', 'Combustível', '⛽', '492f210b-0def-43e7-9786-393ebf2d6a6a', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');
INSERT INTO public.transaction_categories (id, name, icon, group_id, user_id) VALUES ('3dc3ba14-2243-4003-a03e-fa18331041c0', 'Aluguel', '🏠', '1151ff10-0a2b-498c-b55f-ae4f554d41a4', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');
INSERT INTO public.transaction_categories (id, name, icon, group_id, user_id) VALUES ('83e8b0b5-3d43-4618-9aef-7980022f5603', 'Mercado', '🛒', '5011e7e0-9097-4171-a306-5d1d25dee5de', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');


-- Create public.transaction_types values
--
-- Data for public.transaction_types; Schema: public
--
INSERT INTO public.transaction_types (id, name) VALUES (1, 'INCOME');
INSERT INTO public.transaction_types (id, name) VALUES (2, 'EXPENSE');


-- Create public.transaction_types values
--
-- Data for public.transaction_types; Schema: public
--
INSERT INTO transactions (id, amount, description, type_id, account_id, category_id, client_id, user_id) VALUES ('b7d5044e-e98b-4c1d-b594-1f437b7d2282', 1000, 'Salário', 1, '589f4b55-4c84-46bd-a31d-5fd8417eebaf', '3dc3ba14-2243-4003-a03e-fa18331041c0', 'e28e3adc-ccfd-48ae-9f66-83759b29f540', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');
INSERT INTO transactions (id, amount, description, type_id, account_id, category_id, client_id, user_id) VALUES ('cfc6efe7-772e-4cc5-bb7d-3c0666a4dd04', -500, 'Pagamento de Fatura', 2, '589f4b55-4c84-46bd-a31d-5fd8417eebaf', '3dc3ba14-2243-4003-a03e-fa18331041c0', 'e28e3adc-ccfd-48ae-9f66-83759b29f540', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');
INSERT INTO transactions (id, amount, description, type_id, account_id, category_id, is_recurring, start_date, user_id) VALUES ('1e3440c3-d8a0-41b3-b09b-9d637f2d5a48', -55, 'Netflix', 2, '589f4b55-4c84-46bd-a31d-5fd8417eebaf', '3dc3ba14-2243-4003-a03e-fa18331041c0', true, '2024-01-25 11:30:30', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');
INSERT INTO transactions (id, amount, description, type_id, account_id, category_id, is_recurring, start_date, end_date, user_id) VALUES ('387d5f46-274b-4ffc-bc53-90c0e43f744a', -120, 'Amazon 1/3', 2, '589f4b55-4c84-46bd-a31d-5fd8417eebaf', '3dc3ba14-2243-4003-a03e-fa18331041c0', true, '2024-01-02 11:30:30', '2024-04-02 11:30:30', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');

-- Create public.recurring_types values
--
-- Data for public.recurring_types; Schema: public
--
INSERT INTO public.recurring_types (id, name) VALUES (1, 'Diário');
INSERT INTO public.recurring_types (id, name) VALUES (2, 'Semanal');
INSERT INTO public.recurring_types (id, name) VALUES (3, 'Mensal');
INSERT INTO public.recurring_types (id, name) VALUES (4, 'Anual');

-- Create public.recurring_pattern values
--
-- Data for public.recurring_pattern; Schema: public
--
INSERT INTO public.recurring_pattern (transaction_id, recurring_type_id, day_of_month, user_id) VALUES ('1e3440c3-d8a0-41b3-b09b-9d637f2d5a48', 3, 25, '677fe9e0-b364-4a5d-b5e3-03be82e1f435');
INSERT INTO public.recurring_pattern (transaction_id, recurring_type_id, max_num_of_ocurrences, day_of_month, user_id) VALUES ('387d5f46-274b-4ffc-bc53-90c0e43f744a', 3, 4, 25, '677fe9e0-b364-4a5d-b5e3-03be82e1f435');

-- Create public.transactions_instance values
--
-- Data for public.transactions_instance; Schema: public
--
INSERT INTO public.transactions_instance (id, transaction_id, is_done, is_rescheduled, is_canceled, start_date, user_id) VALUES ('f8db0cc6-dbe4-493e-859e-da9c48c14680', '1e3440c3-d8a0-41b3-b09b-9d637f2d5a48', true, false, false, '2024-01-25 11:30:30', '677fe9e0-b364-4a5d-b5e3-03be82e1f435');