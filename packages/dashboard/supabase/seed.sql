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
INSERT INTO public.address (cep, address, number, complement, neighborhood, city, uf, client_id) VALUES ('83.701-300', 'Rua Alagoas', '416', NULL, 'Iguaçu', 'Araucária', 'PR', 'e28e3adc-ccfd-48ae-9f66-83759b29f540');
