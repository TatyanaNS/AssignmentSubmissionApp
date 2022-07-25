--users dictionary
create table users(
    id serial not null,
    username varchar(50) not null,
    password varchar(100) not null,
    name varchar(50),
    authority_id serial,
    cohortStartDate date,
    bootcampDurationInWeeks integer,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

-- assignments dictionary
create table assignments(
    id serial not null,
    number integer,
    status varchar(50),
    githubUrl varchar(100),
    branch varchar(50),
    codeReviewVideoUrl varchar(100),
    submittedDate date,
    CONSTRAINT assignments_pk PRIMARY KEY (id)
);

-- authorities dictionary
create table authorities(
    id serial PRIMARY KEY,
    user_id serial not null,
    authority varchar(255),
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id)
);