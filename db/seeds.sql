INSERT INTO department (name)
VALUES
('Curators'),
('Educators'),
('Docents'),
('Legal Team');

INSERT INTO role (title, salary, department_id)
VALUES
('Curator', 65000, 1),
('Educator', 57500, 2),
('Docent', 50000, 3),
('Lawyer', 130000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Katrina', 'Rodgers', 1, null),
('Jacob', 'Jimenez', 2, null),
('John', 'Straham', 3, null),
('Terry', 'Jones', 4, null),
('Kayle', 'Rodriguez', 1, 1),
('Zayne', 'Johnson', 2, 2),
('Grace', 'Ramos', 2, 2),
('Amber', 'Ingram', 3, 3),
('Matt', 'Westbrook', 3, 3),
('Caroline', 'Long', 4, 4);