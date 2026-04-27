CREATE DATABASE customer_db;
USE customer_db;

CREATE TABLE customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    nic VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE mobile_number (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    mobile_number VARCHAR(15),
    FOREIGN KEY (customer_id) REFERENCES customer(id)
);

CREATE TABLE country (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country_name VARCHAR(100)
);

CREATE TABLE city (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(100)
);

CREATE TABLE address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city_id INT,
    country_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (city_id) REFERENCES city(id),
    FOREIGN KEY (country_id) REFERENCES country(id)
);

CREATE TABLE family_relation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    family_member_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (family_member_id) REFERENCES customer(id)
);

INSERT INTO country (country_name) VALUES ('Sri Lanka');

INSERT INTO city (city_name) VALUES ('Colombo'), ('Kandy');

SELECT * FROM city;
SELECT * FROM country;
SELECT * FROM customer;
SELECT * FROM mobile_number;
SELECT * FROM address;
SELECT * FROM family_relation;



