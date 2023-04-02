insert into users (name, email, password) values
('Svetlana', 'Svetlana@gmail.com', 'Svetlana'),
('Oksana', 'Oksana@gmail.com', 'Oksana'),
('Varvara', 'Varvara@gmail.com', 'Varvara'),
('Yulia', 'Yulia@gmail.com', 'Yulia'),
('Anton', 'Anton@gmail.com', 'Anton'),
('Vikentii', 'Vikentii@gmail.com', 'Vikentii'),
('Dmitrii', 'Dmitrii@gmail.com', 'Dmitrii')

insert into carts (user_id, created_at, updated_at, status) values
('5cf6be85-3e67-4257-bebe-1c3cdaf40dc0', '23-Mar-2023', '23-Mar-2023', 'OPEN')
('2c918005-0f23-4ddd-860a-993d87a46836', '22-Mar-2023', '22-Mar-2023', 'OPEN'),
('2ed39026-5aac-4359-a8b8-45ccbdcf636d', '21-Mar-2023', '21-Mar-2023', 'OPEN'),
('60a372ce-5049-4509-a34e-d09f8d27c22a', '20-Mar-2023', '20-Mar-2023', 'OPEN'),
('6fcfa55f-2ee2-4877-af8a-7555a3ed8318', '22-Mar-2023', '22-Mar-2023', 'OPEN'),
('0e430b1f-183c-42a2-9ddb-7a0ed0529e6d', '21-Mar-2023', '22-Mar-2023', 'OPEN'),
('735194cb-1562-4363-a041-ddec12be820c', '22-Mar-2023', '23-Mar-2023', 'OPEN')

insert into cart_items (cart_id, product_id, count) values
('741ccb8e-fc65-4fb6-ae98-07e0c9cc5e46', '41f749b9-0168-4d5e-8482-81a71bdf124a', 1),
('e4ac2271-8b44-417c-9a91-00212ce61151', 'a2edde97-8a51-4cc5-bd70-215f06949f86', 2),
('5fe76581-eb6c-49b9-b56a-e368be1f0e21', '170b3d1d-618f-4ecf-8695-92b8a284e825', 1),
('1b288273-93c1-4d94-b1f4-bd257bc93f1c', '24d1ce06-5890-4d15-8386-a3014d259b35', 3),
('7511826e-4a40-4274-a287-c4a0260ccedf', '47e646df-344d-42a7-93d5-44c855f4481f', 2),
('5af272ac-0490-487f-b33c-641271e32cd8', '6ea5c276-5db3-432c-b9ea-f8465ae1dfea', 1),
('1118d434-c5a5-431e-8dcd-7656dca56ede', 'e1d2537b-95fb-424e-ae91-00fb8093de80', 3)


insert into orders (user_id, cart_id, payment, delivery, comments, status, total) values
('5cf6be85-3e67-4257-bebe-1c3cdaf40dc0', '741ccb8e-fc65-4fb6-ae98-07e0c9cc5e46', '{"type": "card", "summ": "10"}', '{"address": "Antalya", "type": "PTT"}', 'Have a good day!', 'ORDERED', 10),
('2c918005-0f23-4ddd-860a-993d87a46836', 'e4ac2271-8b44-417c-9a91-00212ce61151', '{"type": "cash", "summ": "20"}', '{"address": "Istambul", "type": "SDEK"}', 'Have a good day!', 'ORDERED', 20)