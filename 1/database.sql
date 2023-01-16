
create TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    passwords VARCHAR(255)
);


create TABLE post(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255)
);
