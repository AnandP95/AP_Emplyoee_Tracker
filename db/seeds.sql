INSERT INTO department (name)
VALUES ("Restaurant"),
       ("Engineer"),
       ("Scientists"),
       ("Mechanic"),
       ("Farming");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 50000.00, 1),
       ("Civil", 100000.00, 2),
       ("Pharmacist", 57000.00, 3),
       ("Worker", 40210.00, 4),
       ("Farmer", 150790.00, 1);

       
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Anand", "Patel", 2, 5),
       ("Anthony", "Gujju", 1, 1),
       ("Rony", "Das", 4, 2),
       ("Martin", "Buch", 2, 1),
       ("Robert", "Shah", 3, 2);
