
DROP DATABASE IF EXISTS employee_tr_db;
CREATE DATABASE IF NOT EXISTS employee_tr_db;
USE employee_tr_db;
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
  
    name VARCHAR(30)

   );

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    
     salary DECIMAL,
   
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);
