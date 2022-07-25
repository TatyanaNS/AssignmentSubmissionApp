-- login: admin; password: admin-123
insert into users (username, password)
values ('admin', '$2a$10$9nwTLubhtCWjAQYUSOnx0Ox3klblmT3ipWPWCG1nL/I6YqpuNEH8G');
insert into authorities (user_id, authority)
values ((select id from users where username = 'admin'), 'ROLE_STUDENT');