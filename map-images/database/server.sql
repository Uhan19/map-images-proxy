-- CREATE DATABASE chompy;
DROP TABLE IF EXISTS photo;
DROP TABLE IF EXISTS business;
-- ---
-- Table 'user'
-- ---
-- CREATE TABLE user (
--   id           VARCHAR(22)  PRIMARY KEY,
--   name         VARCHAR(255) UNIQUE NOT NULL DEFAULT 'anonymous',
--   review_count INTEGER      NOT NULL DEFAULT 0,
--   fans         INTEGER      NOT NULL DEFAULT 0
-- );
-- ---
-- Table 'business'
--
-- ---
CREATE TABLE business
(
  id VARCHAR(22) PRIMARY KEY,
  name VARCHAR(255) NOT NULL DEFAULT 'business name',
  neighborhood VARCHAR(255) NOT NULL DEFAULT 'neighborhood',
  address VARCHAR(255) NOT NULL DEFAULT 'address',
  city VARCHAR(255) NOT NULL DEFAULT 'city',
  state VARCHAR(255) NOT NULL DEFAULT 'state',
  postal_code VARCHAR(255) NOT NULL DEFAULT 'postal_code',
  logitude FLOAT NOT NULL DEFAULT 0.0,
  latitude FLOAT NOT NULL DEFAULT 0.0
);
-- ---
-- Table 'photos'
-- ---
CREATE TABLE photo2
(
  unique_id VARCHAR(22) PRIMARY KEY,
  id VARCHAR(22),
  business_id VARCHAR(22) REFERENCES business,
  caption VARCHAR(255) DEFAULT 'no caption',
  label VARCHAR(255) DEFAULT NULL
);


-- ---


/**
 * Execute this file from the command line by typing:
 * mysql -u root < server/schema.sql
 * to create the database and the tables.*/

/**
 * POSTGRES
 * To execute this file, start psql from this directory with
 * `psql postgress -U _username_`
 * Then connect to database chompy
 * `\connect chompy`
 * The run this script
 * `\i server.sql`
 */