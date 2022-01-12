INSERT INTO department (name)
VALUES ("Curators"),
INSERT INTO department (name)
VALUES ("Educators"),
INSERT INTO department (name)
VALUES ("Docents"),
INSERT INTO department (name)
VALUES ("Legal Team");

INSERT INTO role (title, salary, department_id)
VALUES ("Curator", 65000, 1),
INSERT INTO role (title, salary, department_id)
VALUES ("Educator", 57500, 2),
INSERT INTO role (title, salary, department_id)
VALUES ("Docent", 50000, 3),
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 130000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Katrina", "Rodgers", 1, null),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jacob", "Jimenez", 2, null),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Straham", 3, null),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Terry", "Jones", 4, null),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kayle", "Rodriguez", 1, 001),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Zayne", "Johnson", 2, 002),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Grace", "Ramos", 2, 002),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amber", "Ingram", 3, 003),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Matt", "Westbrook", 3, 003),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Caroline", "Long", 4, 004);