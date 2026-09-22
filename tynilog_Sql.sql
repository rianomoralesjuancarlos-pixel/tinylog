create database tinylog;
use tinylog;
-- TABLAS 
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
    
    
-- TABLA ASISTENCIA
 
create table asistencia(
	id_asistencia int primary key auto_increment,
	fecha date not null,
	estado enum ('presente', 'ausente', 'tarde', 'justificado'), 
    id_estudiantes int not null);

-- TABLA CURSOS DEL JARDIN

create table curso(
id_Curso int primary key auto_increment,
nombre_curso varchar (50) not null,
jornada enum('mañana') not null,
capacidad int not null
);

-- TABLA DE JUSTIFICACIONES 

create table justificaciones(
id_justificaciones int primary key auto_increment,
id_asistencia int, 
motivo text not null,
fecha_de_justificacion date not null,
foreign key (id_asistencia) references asistencia(id_asistencia)
);

-- TABLA DE REPORTES 

create table reportes(
id_reportes int primary key auto_increment,
tipo varchar(50) not null,
fecha_de_generacion date not null,
descripcion text 
); 

-- TABLA CALENDARIO

CREATE TABLE calendario(
    id_calendario INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL
);

-- TABLA DE EVENTOS

create table evento(
id_eventos int primary key auto_increment,
titulo varchar(100) not null,
descripcion text,
fecha date not null,
hora time 
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

-- TABLA DE CURSO_ESTUDIANTES
create table curso_estudiante (
    id_Curso int not null,
    id_estudiantes int not null,
    primary key(id_Curso, id_estudiantes),
    foreign key (id_Curso) references curso(id_Curso),
    foreign key (id_estudiantes) references estudiantes(id_estudiantes)
);

-- TABLA DE USUARIOS 
create table usuarios(
id_usuario int auto_increment primary key,
correo varchar (100),
contraseña varchar (255),
rol enum('directivo', 'acudiente', 'profesor')
);

-- borrar estudiantes de rol 
-- borrar estado
-- TABLA CURSO_PROFESOR

create table curso_profesor (
    id_curso int not null,
    id_profesor int not null,
    fecha_inicio date,
    fecha_fin date,
    primary key (id_curso, id_profesor, fecha_inicio),
    foreign key (id_curso) references curso(id_curso),
    foreign key (id_profesor) references profesores(id_profesor)
);


-- ALTER TABLE 
-- ALTER TABLE ACUDIENTES
alter table acudientes
	modify direccion varchar(100) not null;
    
alter table acudientes
    add id_estudiantes int;
    
alter table acudientes 
	add foreign key (id_estudiantes) references estudiantes(id_estudiantes);
    
SHOW INDEX FROM acudientes;


alter table acudientes
modify direccion varchar(100) not null;

-- se modifica varchar 
ALTER TABLE acudientes
	MODIFY tipo_documento varchar(5) not null;
    
-- se modifica varchar en numero de documento
alter table acudientes
	modify numero_de_documento varchar(15) not null unique ;


-- ALTER TABLE ESTUDIANTES

alter table estudiantes
add id_Curso int ;

alter table estudiantes 
add foreign key (id_curso) references curso (id_Curso);

alter table estudiantes 
add genero varchar (20) not null;

-- ALTER TABLE ASISTENCIA 

        -- default pero que podria ponerse en este caso
alter table asistencia 
	add observaciones varchar (255);

alter table asistencia 
	add id_profesor int ;

alter table asistencia 
add foreign key(id_profesor) references profesores (id_profesor);


alter table profesores
drop column id_asistencia;

-- ALTER TABLE JUSTIFICACIONES

alter table justificaciones
	add id_reportes int ;
    
alter table justificaciones
	add foreign key (id_reportes) references reportes(id_reportes);
    
-- ALTER TABLE CALENDARIO

alter table calendario
	add id_eventos int;
    
alter table calendario
	drop column id_evento;
    
alter table calendario 
	add foreign key (id_eventos) references evento(id_eventos);
    
-- ALTER TABLE EVENTO

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

-- ALTER TABLE PROFESORES 

alter table profesores
	add id_asistencia int ;
    
alter table profesores 
	add foreign key (id_asistencia) references asistencia(id_asistencia);

alter table profesores
	drop foreign key profesores_ibfk_1;
-- INSERT INTO 
-- INSERT INTO ACUDIENTES

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

-- INSERT INTO ESTUDIANTES

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

-- INSERT INTO ASISTENCIA 

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

-- INSERT INTO CURSO

INSERT INTO curso (id_curso,nombre_curso, jornada, capacidad) VALUES
('1', 'Exploradores', 'mañana','15'),
('2', 'Aventureros', 'mañana', 15),
('3','investigadores', 'mañana', '15'),
('4', 'innovadores', 'mañana', '15'),
('5','emprendedores', 'mañana', 15);

-- INSERT INTO JUSTIFICACIONES

INSERT INTO justificaciones
(id_asistencia, motivo, fecha_de_justificacion)
VALUES
(3, 'Incapacidad medica', '2026-09-01'),
(4, 'Retraso debido a problemas de transporte', '2026-09-01'),
(6, 'Cita medica', '2026-09-01'),
(8, 'Retraso debido a inconvenientes familiares', '2026-09-01'),
(10, 'Incapacidad medica presentada por el estudiante', '2026-09-01');

-- INSERT INTO REPORTES

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

-- INSERT INTO CALENDARIO

INSERT INTO calendario (fecha)
VALUES
('2026-09-01'),
('2026-09-02'),
('2026-09-03'),
('2026-09-04'),
('2026-09-05');

-- INSERT INTO EVENTO

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

-- INSERT INTO PROFESORES 

INSERT INTO profesores
(tipo_documento, numero_documento, nombres, apellidos, telefono, correo)
VALUES
('CC', '1002456789', 'Carlos Andres', 'Gomez Rodriguez', '3104567890', 'carlos.gomez@colegio.edu.co'),
('CC', '1013567890', 'Laura Sofia', 'Martinez Perez', '3115678901', 'laura.martinez@colegio.edu.co'),
('CC', '1024678901', 'Juan David', 'Hernandez Lopez', '3126789012', 'juan.hernandez@colegio.edu.co'),
('CC', '1035789012', 'Maria Fernanda', 'Torres Ramirez', '3137890123', 'maria.torres@colegio.edu.co'),
('CC', '1046890123', 'Andres Felipe', 'Castro Morales', '3148901234', 'andres.castro@colegio.edu.co');

-- INSERT INTO DIRECTIVOS

INSERT INTO directivos
(tipo_documento, numero_documento, nombres, apellidos, telefono, correo, cargo)
VALUES
('CC', '1001234567', 'Carlos Alberto', 'Rodriguez Gomez', '3104567890', 'carlos.rodriguez@colegio.edu.co', 'Director'),
('CC', '1002345678', 'Laura Marcela', 'Martinez Lopez', '3115678901', 'laura.martinez@colegio.edu.co', 'Subdirector');

-- INSERT INTO CURSO_PROFESORES
insert into curso_profesor (id_curso, id_profesor, fecha_inicio) values
(1, 1, '2026-02-01'),
(2, 2, '2026-02-01'),
(3, 3, '2026-02-01'),
(4, 4, '2026-02-01'),
(5, 5, '2026-02-01');

-- INSERT INTO USUARIOS 
insert into usuarios (id_usuario, correo, rol) values
('1', 'carlos.rodriguez@colegio.edu.co', 'directivo'),
('3', 'juanpanlo323.@colegio.edu.co', 'profesor'),
('4', 'jessica4324.t@colegio.edu.co', 'profesor'),
('5', 'juan.hernandez@colegio.edu.co', 'profesor'),
('6', 'maria.torres@colegio.edu.co', 'profesor'),
('7', 'andres.castro@colegio.edu.co', 'profesor'),
('8', 'pedro.perez@gmail.com', 'acudiente'),
('9', 'ana.gomez@gmail.com', 'acudiente'),
('10', 'luis.rodriguez@gmail.com', 'acudiente'),
('12', 'marta.martinez@gmail.com', 'acudiente'),
('13', 'jorge.lopez@gmail.com', 'acudiente'),
('14', 'diana.hernandez@gmail.com', 'acudiente');
 -- update curso_profesor
-- set fecha_fin = '2026-08-31'
-- where id_curso = 1 and fecha_fin is null;
-- ARREGLOS 
SHOW CREATE TABLE acudientes;
ALTER TABLE acudientes
DROP FOREIGN KEY acudientes_ibfk_2;
alter table acudientes
drop foreign key acudientes_ibfk_3;
show create table asistencia;
alter table asistencia
drop foreign key asistencia_ibfk_2;

-- SENTENCIAS 

select 
    c.id_calendario,
    c.fecha,
    e.id_eventos,
    e.titulo,
    e.hora
from calendario c
left join evento e
    on c.fecha = e.fecha
order by c.fecha;

select c.nombre_curso, p.nombres, p.apellidos
from curso_profesor cp
join curso c on c.id_curso = cp.id_curso
join profesores p on p.id_profesor = cp.id_profesor
where cp.fecha_fin is null;

select a.id_asistencia, a.fecha, a.estado, e.nombres, e.apellidos
from asistencia a
inner join estudiantes e on a.id_estudiantes = e.id_estudiantes;

select a.id_asistencia, a.estado, j.motivo, j.fecha_de_justificacion
from asistencia a
inner join justificaciones j on a.id_asistencia = j.id_asistencia;

select e.nombres, e.apellidos, ac.nombres as acudiente_nombre, ac.apellidos as acudiente_apellido
from estudiantes e
inner join acudientes ac on e.id_estudiantes = ac.id_estudiantes;

select c.nombre_curso, e.nombres, e.apellidos
from curso_estudiantes ce
inner join curso c on ce.id_curso = c.id_curso
inner join estudiantes e on ce.id_estudiantes = e.id_estudiantes;

select c.nombre_curso, p.nombres, p.apellidos
from curso_profesor cp
inner join curso c on cp.id_curso = c.id_curso
inner join profesores p on cp.id_profesor = p.id_profesor;

select c.nombre_curso, p.nombres, p.apellidos
from curso_profesor cp
inner join curso c on cp.id_curso = c.id_curso
inner join profesores p on cp.id_profesor = p.id_profesor;

select ev.id_eventos, ev.titulo, ev.fecha, ev.hora, ca.id_calendario
from evento ev
inner join calendario ca on ev.id_calendario = ca.id_calendario;

select ev.id_eventos, ev.titulo, d.nombres, d.apellidos, d.cargo
from evento ev
inner join directivos d on ev.id_directivo = d.id_directivo;

select a.id_asistencia, a.fecha, a.estado, e.nombres, e.apellidos, c.nombre_curso
from asistencia a
inner join estudiantes e on a.id_estudiantes = e.id_estudiantes
inner join curso_estudiantes ce on e.id_estudiantes = ce.id_estudiantes
inner join curso c on ce.id_curso = c.id_curso;

-- SELECT
SELECT * FROM acudientes;
SELECT * FROM estudiantes;
SELECT * FROM calendario;
SELECT * FROM curso;
SELECT * FROM curso_estudiantes;
SELECT * FROM directivos;
SELECT * FROM asistencia;
SELECT * FROM evento;
SELECT * FROM justificaciones;
SELECT * FROM profesores;
SELECT * FROM reportes;
SELECT * FROM usuarios;
SELECT * FROM curso_profesor;
-- agregar id usuario a directivos y profesore

-- AGREGAR COSAS FALTANTES

UPDATE calendario SET id_eventos = 1 where id_calendario = 1;
UPDATE calendario SET id_eventos = 2 where id_calendario = 2;
UPDATE calendario SET id_eventos = 3 where id_calendario = 3;
UPDATE calendario SET id_eventos = 4 where id_calendario = 4;
UPDATE calendario SET id_eventos = 5 where id_calendario = 5;
-- se agrega en acudientes id_usuario

select * from usuarios;

UPDATE acudientes SET id_usuario = 8 where id_acudiente = 1;
UPDATE acudientes SET id_usuario = 9 where id_acudiente = 2;
UPDATE acudientes SET id_usuario = 10 where id_acudiente = 3;
UPDATE acudientes SET id_usuario = 11 where id_acudiente = 4;
UPDATE acudientes SET id_usuario = 12 where id_acudiente = 5;
UPDATE acudientes SET id_usuario = 13 where id_acudiente = 6;
UPDATE acudientes SET id_usuario = 14 where id_acudiente = 7;
UPDATE acudientes SET id_usuario = 15 where id_acudiente = 8;
UPDATE acudientes SET id_usuario = 16 where id_acudiente = 9;
UPDATE acudientes SET id_usuario = 17 where id_acudiente = 10;

-- se agregan datos en curso_estudiantes

insert into curso_estudiantes (id_curso, id_estudiantes) values
(1, 1 ),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(1, 6),
(2, 7),
(3, 8),
(4, 9),
(5, 10);

SHOW CREATE TABLE curso_estudiantes;
alter table curso_estudiantes
drop foreign key curso_estudiantes_ibfk_3;
alter table curso_estudiantes
drop foreign key curso_estudiantes_ibfk_4;

-- se agrega observaciones en asistencia

update asistencia set observaciones = 'asistió puntualmente a la jornada' where id_asistencia = 1;
update asistencia set observaciones = 'participó activamente en clase' where id_asistencia = 2;
update asistencia set observaciones = 'no asistió; justificó por motivos de salud' where id_asistencia = 3;
update asistencia set observaciones = 'llegó 20 minutos tarde; presentó justificación por cita médica' where id_asistencia = 4;
update asistencia set observaciones = 'completó todas las actividades asignadas' where id_asistencia = 5;
update asistencia set observaciones = 'no asistió; justificó por emergencia familiar' where id_asistencia = 6;
update asistencia set observaciones = 'buen desempeño durante la sesión' where id_asistencia = 7;
update asistencia set observaciones = 'ingresó tarde; justificó por retraso en el transporte' where id_asistencia = 8;
update asistencia set observaciones = 'asistió y entregó el trabajo a tiempo' where id_asistencia = 9;
update asistencia set observaciones = 'no asistió; justificó con certificado médico' where id_asistencia = 10;

SELECT * FROM curso_estudiantes;
SELECT * FROM curso_profesor;
SELECT * FROM asistencia;
-- se agregan datos en asistencia

update asistencia set id_profesor = 1 where id_asistencia = 1;
update asistencia set id_profesor = 2 where id_asistencia = 2;
update asistencia set id_profesor = 3 where id_asistencia = 3;
update asistencia set id_profesor = 4 where id_asistencia = 4;
update asistencia set id_profesor = 5 where id_asistencia = 5;
update asistencia set id_profesor = 1 where id_asistencia = 6;
update asistencia set id_profesor = 2 where id_asistencia = 7;
update asistencia set id_profesor = 3 where id_asistencia = 8;
update asistencia set id_profesor = 4 where id_asistencia = 9;
update asistencia set id_profesor = 5 where id_asistencia = 10;
-- se agregan datos en eventos 

UPDATE evento SET id_calendario = 1 where id_eventos = 1;
UPDATE evento SET id_calendario = 2 where id_eventos = 2;
UPDATE evento SET id_calendario = 3 where id_eventos = 3;
UPDATE evento SET id_calendario = 4 where id_eventos = 4;
UPDATE evento SET id_calendario = 5 where id_eventos = 5;

UPDATE evento SET creado_por = 'director' where id_justificaciones = 1;
UPDATE evento SET creado_por = 'subdirector' where id_eventos = 2;
UPDATE evento SET creado_por = 'subdirector' WHERE id_eventos = 3;
UPDATE evento SET creado_por = 'directivo' where id_eventos = 4;
UPDATE evento SET creado_por = 'subdirector' where id_eventos = 5;

SELECT * FROM justificaciones;
select * from asistencia;
select * from reportes;
-- se agrega datos en justificaciones

UPDATE justificaciones SET id_reportes = 1 where id_justificaciones = 1;
UPDATE justificaciones SET id_reportes = 2 where id_justificaciones = 2;
UPDATE justificaciones SET id_reportes = 3 WHERE id_justificaciones = 3;
UPDATE justificaciones SET id_reportes = 4 where id_justificaciones = 4;
UPDATE justificaciones SET id_reportes = 5 where id_justificaciones = 5;

alter table usuarios
drop column estado;
alter table usuarios 
modify rol enum('directivo','subdirectivo' , 'profesor', 'acudiente');
UPDATE usuarios SET rol = 'subdirectivo' where id_usuario = 2;

UPDATE usuarios SET id_usuario = 11 where id_usuario = 12;
UPDATE usuarios SET id_usuario = 12 where id_usuario = 13;
UPDATE usuarios SET id_usuario = 13 where id_usuario = 14;
insert into usuarios ( id_usuario, correo, rol) values
('14', 'oscar.torres@gmail.com', 'acudiente'),
('15', 'claudia.ramirez@gmail.com', 'acudiente'),
('16', 'ricardo.castro@gmail.com', 'acudiente'),
('17', 'sandra.moreno@gmail.com', 'acudiente');

select * from usuarios;
select * from profesores;
select * from evento;
UPDATE profesores SET id_usuario = 3 where id_profesor = 1;
update profesores set id_usuario = 4 where id_profesor = 2;
update profesores set id_usuario = 5 where id_profesor = 3;
update profesores set id_usuario = 6 where id_profesor = 4;
update profesores set id_usuario = 7 where id_profesor = 5;

update evento set id_directivo = 1 where id_eventos = 1;
update evento set id_directivo = 2 where id_eventos = 2;
update evento set id_directivo = 2 where id_eventos = 3;
update evento set id_directivo = 1 where id_eventos = 4;
update evento set id_directivo = 2 where id_eventos = 5;

alter table usuarios 
add salt varchar(200);