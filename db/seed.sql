USE office_db;

INSERT INTO department (dept)
VALUES ("Sales"),
       ("Engineer"),
       ("Contractor");

INSERT INTO roles (title, salary, dept_id)
VALUES ("Manager", 50000, 1),
       ("Desk Jockey", 25000, 2),
       ("Sales Person", 25000, 1),
       ("Contractor", 50000, 3);


INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Bill", "Lumbergh", 1, NULL),
       ("Peter", "Gibbons", 2, 1),
       ("Samir", "Nagheenanajar", 2, 1),
       ("Michael", "Bolton", 2, 1),
       ("Milton", "Waddams", 2, 1),
       ("Bob", "Slydell", 3, NULL),
       ("Bob", "Porter", 3, NULL),
       ("Tom", "Smykowski", 1, 1),
       ("Nina", "Smith", 1, 1);
