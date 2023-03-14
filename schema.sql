CREATE DATABASE addressBook_app;

CREATE TABLE addressBook (
    id SERIAL PRIMARY KEY,
    name TEXT,
    phone INTEGER,
    address TEXT,
    email TEXT,
    userid INTEGER
);

CREATE TABLE user (
    userid SERIAL PRIMARY KEY,
    name TEXT,
    username TEXT,
    digested_password TEXT
);

INSERT INTO addressBook (name, phone, address, email, userid) VALUES ('deepa', '0451469425', 'sydney', 'ds@gmail.com', 1);