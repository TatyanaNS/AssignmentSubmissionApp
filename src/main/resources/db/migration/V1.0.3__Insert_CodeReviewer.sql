-- login: mentor; password: mentor-123
insert into users (username, password)
values ('mentor', '$2a$10$1aMYy8Jwiyy/gLduXv1dReXLD5jTAxuIvXOr.u0fs1oiYTNKtZQpO');

insert into authorities (user_id, authority)
values ((select id from users where username = 'mentor'), 'ROLE_CODE_REVIEWER');