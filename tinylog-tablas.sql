create database tinylog;
use tinylog;

-- TABLA DATOS DE ACUDIENTES

create table acudientes(
	id_acudiente int primary key auto_increment,
	tipo_documento varchar(5) not null,
	numero_de_documento varchar (10) not null unique,
    nombres varchar (50) not null,
    apellidos varchar (50) not null,
    telefono varchar (10) not null unique,
    correo varchar (100) not null unique,
    direccion varchar (10) not null,
    id_estudiantes int
    );
    ALTER TABLE acudientes
MODIFY direccion VARCHAR(100) NOT NULL;
    alter table acudientes
    add id_estudiantes int;
    
    alter table acudientes 
    add foreign key (id_estudiantes) references estudiantes(id_estudiantes);
    SHOW INDEX FROM acudientes;
    ALTER TABLE acudientes
DROP INDEX direccion;
ALTER TABLE acudientes
MODIFY direccion VARCHAR(100) NOT NULL;


    
INSERT INTO acudientes(id_acudiente,tipo_documento, numero_de_documento, nombres, apellidos, telefono, correo, direccion)
VALUES
('1','CC', '53985216', 'Pedro', 'Perez', '3228743678', 'pedro.perez@gmail.com', 'Carrera 90 80-41'),
('2', 'CC', '80754887', 'Ana', 'Gomez', '3149854009', 'ana.gomez@gmail.com', 'Calle 80 92-15'),
('3', 'CC', '10002794', 'Luis', 'Rodriguez', '3008112543', 'luis.rodriguez@gmail.com', 'Carrera 77 68-32'),
('4','CC', '53076245', 'Marta', 'Martinez', '3007633321 ', 'marta.martinez@gmail.com', 'Calle 63 105-24'),
('5', 'CC', '52342118', 'Jorge', 'Lopez', '3028909221', 'jorge.lopez@gmail.com', 'Carrera 96 72-18'),
('6', 'CC', '1985634764', 'Diana', 'Hernandez', '3016990087', 'diana.hernandez@gmail.com', 'Calle 90 100-45'),
('7','CC', '52001007', 'Oscar', 'Torres', '3016342876', 'oscar.torres@gmail.com', 'Calle 90 100-45'),
('8','CC', '1019763890', 'Claudia', 'Ramirez', '3058879992', 'claudia.ramirez@gmail.com', 'Carrera 86 75-20'),
('9', 'CC', '51001009', 'Ricardo', 'Castro', '3001000009', 'ricardo.castro@gmail.com', 'Carrera 104 67-12'),
('10', 'CC', '52451010', 'Sandra', 'Moreno', '3007532111', 'sandra.moreno@gmail.com', 'Calle 10 35 65');
SELECT * FROM acudientes;
-- se modifica varchar 
ALTER TABLE acudientes
MODIFY tipo_documento varchar(5) not null;
-- se modifica varchar en numero de documento
ALTER TABLE acudientes
MODIFY numero_de_documento varchar(15) not null unique ;
-- se suben datos de id_estudiantes 
UPDATE acudientes SET id_estudiantes = 1 WHERE id_acudiente = 1;
UPDATE acudientes SET id_estudiantes = 2 WHERE id_acudiente = 2;
UPDATE acudientes SET id_estudiantes = 3 WHERE id_acudiente = 3;
UPDATE acudientes SET id_estudiantes = 4 where id_acudiente = 4;
UPDATE acudientes SET id_estudiantes = 5 where id_acudiente = 5;
UPDATE acudientes SET id_estudiantes = 6 where id_acudiente = 6;
UPDATE acudientes SET id_estudiantes = 7 where id_acudiente = 7;
UPDATE acudientes SET id_estudiantes = 8 where id_acudiente = 8;
UPDATE acudientes SET id_estudiantes = 9 where id_acudiente = 9;
UPDATE acudientes SET id_estudiantes = 10 where id_acudiente = 10;
-- se agrega datos a la tabla de tipo de documento 
UPDATE acudientes
SET tipo_documento = 'CC'
WHERE id_acudiente >= 1;


    -- TABLA DATOS DE ESTUDIANTES

    
    create table estudiantes(
	id_estudiantes int primary key auto_increment,
    tipo_documento varchar (20) not null,
    numero_documento varchar(20) not null unique, 
    nombres varchar (50) not null,
    apellidos varchar (50) not null,
    fecha_de_nacimineto date not null,
    tipo_de_sangre varchar(5) not null
    );
    
alter table estudiantes
add id_Curso int ;

alter table estudiantes 
add foreign key (id_curso) references curso (id_Curso);

alter table estudiantes 
add genero varchar (20) not null;

insert into estudiantes (id_estudiantes, tipo_documento, numero_documento, nombres, apellidos, fecha_de_nacimineto, 
tipo_de_sangre, id_curso, genero) values
('1', 'TI', '1001001001', 'Juan', 'Perez', '2010-03-15', 'O+', '1'),
('2', 'TI', '1001001002', 'Maria', 'Gomez', '2010-07-22', 'A+', '2'),
('3', 'TI', '1001001003', 'Carlos', 'Rodriguez', '2009-11-08', 'B+', '3'),
('4', 'TI', '1001001004', 'Laura', 'Martinez', '2010-01-30', 'O-', '4'),
('5', 'TI', '1001001005', 'Andres', 'Lopez', '2009-05-18', 'AB+', '5'),
('6', 'TI', '1001001006', 'Sofia', 'Hernandez', '2010-09-12', 'A-', '1'),
('7', 'TI', '1001001007', 'Daniel', 'Torres', '2009-12-05', 'O+', '2'),
('8', 'TI', '1001001008', 'Valentina', 'Ramirez', '2010-04-27', 'B-', '3'),
('9', 'TI', '1001001009', 'Sebastian', 'Castro', '2009-08-19', 'A+', '4'),
('10', 'TI', '1001001010', 'Camila', 'Moreno', '2010-06-10', 'O+', '5');

SELECT * FROM estudiantes;

ALTER TABLE estudiantes
DROP COLUMN genero;


-- TABLA ASISTENCIA
 
 
create table asistencia(
	id_asistencia int primary key auto_increment,
	fecha date not null,
	estado enum ('presente', 'ausente', 'tarde', 'justificado'), 
    id_estudiantes int not null
    
    -- default pero que podria ponerse en este caso
);
alter table asistencia 
add observaciones varchar (255);

alter table asistencia 
add id_profesor int ;

ALTER TABLE asistencia
DROP COLUMN id_profesores;


alter table asistencia 
add foreign key(id_profesor) references profesores (id_profesor);


alter table profesores
drop column id_asistencia;

INSERT INTO asistencia
(fecha, estado, id_estudiantes)
VALUES
('2026-08-31', 'presente', 1),
('2026-08-31', 'presente', 2),
('2026-08-31', 'ausente', 3),
('2026-08-31', 'tarde', 4),
('2026-08-31', 'presente', 5),
('2026-08-31', 'ausente', 6),
('2026-08-31', 'presente', 7),
('2026-08-31', 'tarde', 8),
('2026-08-31', 'presente', 9),
('2026-08-31', 'justificado', 10);
SELECT * FROM asistencia;
-- TABLA CURSOS DEL JARDIN

create table curso(
id_Curso int primary key auto_increment,
nombre_curso varchar (50) not null,
jornada enum('mañana') not null,
capacidad int not null
);

INSERT INTO curso (id_curso,nombre_curso, jornada, capacidad) VALUES
('1', 'Exploradores', 'mañana','15'),
('2', 'Aventureros', 'mañana', 15),
('3','investigadores', 'mañana', '15'),
('4', 'innovadores', 'mañana', '15'),
('5','emprendedores', 'mañana', 15);

-- TABLA DE JUSTIFICACIONES 

create table justificaciones(
id_justificaciones int primary key auto_increment,
id_asistencia int, 
motivo text not null,
fecha_de_justificacion date not null,
foreign key (id_asistencia) references asistencia(id_asistencia)
);
alter table justificaciones
add id_reportes int ;
alter table justificaciones
add foreign key (id_reportes) references reportes(id_reportes);

INSERT INTO justificaciones
(id_asistencia, motivo, fecha_de_justificacion)
VALUES
(3, 'Incapacidad medica', '2026-09-01'),
(4, 'Retraso debido a problemas de transporte', '2026-09-01'),
(6, 'Cita medica', '2026-09-01'),
(8, 'Retraso debido a inconvenientes familiares', '2026-09-01'),
(10, 'Incapacidad medica presentada por el estudiante', '2026-09-01');

-- TABLA DE REPORTES 

create table reportes(
id_reportes int primary key auto_increment,
tipo varchar(50) not null,
fecha_de_generacion date not null,
descripcion text 
); 
INSERT INTO reportes
(tipo, fecha_de_generacion, descripcion)
VALUES
('Inasistencia justificada', '2026-09-01',
'El directivo informa a los padres de familia que el estudiante presentó una inasistencia el día 31 de agosto de 2026 debido a una incapacidad medica.'),
('Llegada tarde justificada', '2026-09-01',
'El directivo informa a los padres de familia que el estudiante presentó un retraso el día 31 de agosto de 2026 debido a problemas de transporte.'),
('Inasistencia justificada', '2026-09-01',
'El directivo informa a los padres de familia que el estudiante presentó una inasistencia el día 31 de agosto de 2026 debido a una cita medica.'),
('Llegada tarde justificada', '2026-09-01',
'El directivo informa a los padres de familia que el estudiante presentó un retraso el día 31 de agosto de 2026 debido a inconvenientes familiares.'),
('Inasistencia justificada', '2026-09-01',
'El directivo informa a los padres de familia que el estudiante presentó una inasistencia el día 31 de agosto de 2026 debido a una incapacidad medica presentada por el estudiante.');

-- TABLA CALENDARIO

CREATE TABLE calendario(
    id_calendario INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL
);
INSERT INTO calendario (fecha)
VALUES
('2026-09-01'),
('2026-09-02'),
('2026-09-03'),
('2026-09-04'),
('2026-09-05');


alter table calendario
add id_eventos int;
ALTER TABLE calendario
DROP COLUMN id_evento;
alter table calendario 
add foreign key (id_eventos) references evento(id_eventos);

-- TABLA DE EVENTOS

create table evento(
id_eventos int primary key auto_increment,
titulo varchar(100) not null,
descripcion text,
fecha date not null,
hora time 
);
alter table evento
add id_calendario int;

alter table evento
add foreign key (id_calendario) references calendario(id_calendario);

alter table evento
add creado_por int;

alter table evento
add foreign key (creado_por) references usuarios(id_usuario);

alter table evento 
add  id_directivo int;

ALTER TABLE evento
ADD FOREIGN KEY (id_directivo) 
REFERENCES directivos(id_directivo);

SHOW CREATE TABLE evento;

alter table evento
drop foreign key evento_ibfk_2;

INSERT INTO evento
(titulo, descripcion, fecha, hora)
VALUES
('Reunion de padres', 'Reunion general de padres de familia', '2026-09-05', '08:00:00'),
('Dia deportivo', 'Actividad deportiva para los estudiantes', '2026-09-10', '09:00:00'),
('Izada de bandera', 'Actividad institucional', '2026-09-15', '07:30:00'),
('Entrega de boletines', 'Entrega de notas del periodo', '2026-09-20', '08:00:00'),
('Dia cultural', 'Actividad cultural del colegio', '2026-09-25', '10:00:00');

UPDATE evento
SET fecha = '2026-09-01'
WHERE id_eventos = 1;

UPDATE evento
SET fecha = '2026-09-02'
WHERE id_eventos = 2;

UPDATE evento
SET fecha = '2026-09-03'
WHERE id_eventos = 3;

UPDATE evento
SET fecha = '2026-09-04'
WHERE id_eventos = 4;

UPDATE evento
SET fecha = '2026-09-05'
WHERE id_eventos = 5;
SELECT 
    c.id_calendario,
    c.fecha,
    e.id_eventos,
    e.titulo,
    e.hora
FROM calendario c
LEFT JOIN evento e
    ON c.fecha = e.fecha
ORDER BY c.fecha;
-- TABLA ROLES

create table roles(
id_roles int primary key auto_increment,
nombre_rol varchar(50) unique not null
);


-- TABLA PROFESORES

CREATE TABLE profesores(
    id_profesor INT PRIMARY KEY AUTO_INCREMENT,
    tipo_documento VARCHAR(20) NOT NULL,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE
);

alter table profesores
add id_asistencia int ;
alter table profesores 
add foreign key (id_asistencia) references asistencia(id_asistencia);

show create table profesores ;

alter table profesores
drop foreign key profesores_ibfk_1;

INSERT INTO profesores
(tipo_documento, numero_documento, nombres, apellidos, telefono, correo)
VALUES
('CC', '1002456789', 'Carlos Andres', 'Gomez Rodriguez', '3104567890', 'carlos.gomez@colegio.edu.co'),
('CC', '1013567890', 'Laura Sofia', 'Martinez Perez', '3115678901', 'laura.martinez@colegio.edu.co'),
('CC', '1024678901', 'Juan David', 'Hernandez Lopez', '3126789012', 'juan.hernandez@colegio.edu.co'),
('CC', '1035789012', 'Maria Fernanda', 'Torres Ramirez', '3137890123', 'maria.torres@colegio.edu.co'),
('CC', '1046890123', 'Andres Felipe', 'Castro Morales', '3148901234', 'andres.castro@colegio.edu.co');

-- TABLA DIRECTIVOS

CREATE TABLE directivos(
    id_directivo INT PRIMARY KEY AUTO_INCREMENT,
    tipo_documento VARCHAR(20) NOT NULL,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    cargo VARCHAR(50) NOT NULL
);
INSERT INTO directivos
(tipo_documento, numero_documento, nombres, apellidos, telefono, correo, cargo)
VALUES
('CC', '1001234567', 'Carlos Alberto', 'Rodriguez Gomez', '3104567890', 'carlos.rodriguez@colegio.edu.co', 'Director'),
('CC', '1002345678', 'Laura Marcela', 'Martinez Lopez', '3115678901', 'laura.martinez@colegio.edu.co', 'Subdirector');

-- ARREGLOS 
SHOW CREATE TABLE acudientes;
ALTER TABLE acudientes
DROP FOREIGN KEY acudientes_ibfk_2;
alter table acudientes
drop foreign key acudientes_ibfk_3;
show create table asistencia;
alter table asistencia
drop foreign key asistencia_ibfk_2;
