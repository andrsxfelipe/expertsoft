CREATE DATABASE expertsoft;

USE expertsoft;

CREATE TABLE data(
id INT PRIMARY KEY AUTO_INCREMENT,
fecha_hora DATETIME,
monto_transaccion INT,
estado_transaccion VARCHAR(15),
tipo_transaccion VARCHAR(15),
cliente VARCHAR(50),
identificacion VARCHAR(10),
direccion TEXT,
telefono VARCHAR(25),
correo VARCHAR(60),
plataforma VARCHAR(20),
num_factura VARCHAR(10),
fecha_factura VARCHAR(10),
monto_facturado INT,
monto_pagado INT
);

CREATE TABLE Clientes (
id_cliente INT PRIMARY KEY AUTO_INCREMENT,
cliente VARCHAR(50),
identificacion VARCHAR(10) UNIQUE,
direccion TEXT,
telefono VARCHAR(25),
correo VARCHAR(60)
);

CREATE TABLE Facturas (
id_factura INT PRIMARY KEY AUTO_INCREMENT,
num_factura VARCHAR(10) UNIQUE,
fecha_factura VARCHAR(10),
monto_facturado INT,
monto_pagado INT
);

CREATE TABLE Plataformas(
id_plataforma INT PRIMARY KEY AUTO_INCREMENT,
plataforma VARCHAR(20) UNIQUE
);

CREATE TABLE Transacciones(
id_transaccion INT PRIMARY KEY AUTO_INCREMENT,
fecha_hora_trans DATETIME,
monto_trans INT,
estado_trans VARCHAR(15),
tipo_trans VARCHAR(15),
id_cliente INT,
id_plataforma INT,
id_factura INT,
FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
FOREIGN KEY (id_plataforma) REFERENCES Plataformas(id_plataforma),
FOREIGN KEY (id_factura) REFERENCES Facturas(id_factura)
);

