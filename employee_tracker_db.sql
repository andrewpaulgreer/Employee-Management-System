CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (30) NOT NULL
);

CREATE TABLE role ( 
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL (6,2),
department_id INTEGER,
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER,
manager_id INTEGER,

FOREIGN KEY(role_id) REFERENCES role(id),

FOREIGN KEY(manager_id) REFERENCES role(id)
);
