CREATE DATABASE "shortly-database";

CREATE TABLE users (
	id SERIAL NOT NULL PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL
);


CREATE TABLE url (
	id SERIAL NOT NULL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
	"shortUrl" TEXT NOT NULL,
    "fullUrl" TEXT NOT NULL,
	"visitCount" INTEGER NOT NULL DEFAULT 0
);