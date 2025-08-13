# System Description

System for transactions management for a bank, where you can search for Clients, Transactions and Bills!

repository: https://github.com/andrsxfelipe/expertsoft

# Instructions

To excute the project you may do the following steps

## Clone the github repository in a folder of your pc

Open the terminal on the folder and use the command:

`git clone https://github.com/andrsxfelipe/expertsoft.git`

## Tables creation
In the folder that was created you'll find a file called querys.sql you need to execute those commands in your database manager (console, dbeaver, table plus, etc).

## Database config
In the following path you may need to change the credentials:
expertsoft/server/src/config/db.js

## Dependencies
In console VS code put cd server and type `npm install`
Open another console and put cd ExpertSoft and type `npm install`

## Initializing the project

In the server console you may type node src/index.js
And in the frontend console (expertsoft) type npm run dev

## To fill the tables
Firstly in the following file: server/src/routes/helpers.js change the database into 'expertsoft' and the rest of the information.
In antnother console type `cd server` then `node src/routes/helpers.js` this will fill the tables from the .csv on the route: server/data.csv

## Initalizing front

Go to http://localhost:5173 in a browser and start the navigation

# Used technologies

1. Vite
2. fs
3. csv-parser
4. mysql2
5. express
6. cors

# Normalization

The normalization was based on avoid all kind of dependencies in a sole table. So after this procces 4 tables appeared: clients, bills, platforms, and transaction.

## Table: clients

It contains the whole information about the costumber:
1. cliente (Name of the client, it's a VARCHAR(50))
2. identificacion (identification, it's a VARCHAR(10) and unique)
3. direccion (address, it's a text due to an address could be very long)
4. telefono (phone number, VARCHAR(25))
5. correo (email, VARCHAR(60))

## Table: bills

It contains the whole information about the bill:
1. num_factura (it's a VARCHAR(10) and UNIQUE. It's a code that identifies the bill)
2. fecha_factura (VARCHAR(10) It's the period in which the bill was created)
3. monto_facturado (INT. It's the amount of the bill)
4. monto_pagado (INT. It's the amount of the payment to the bill)

## Table: platforms

It's the list of platforms that the costumers can use to pay.
1. plataforma (VARCHAR(20). The platform)

## Table: transactions

It contains the whole information of each information
1. fecha_hora_trans (DATETIME): the date and time which the transaction was made
2. monto_trans (INT): the amount of the transaction
3. estado_trans (VARCHAR(15)): state of the transaction
4. tipo_trans (VARCHAR(15)): kind of transaction
5. id_cliente (fk INT): the id of the costumer
6. id_plataforma (fk INT): the id of the platform which the transaction was made
7. id_factura (fk INT): id of the bill.

# Uploading of the information from the .csv

This step was made in the title 'Instructions' in the part of 'To fill the tables'

# Advanced querys

```sql
SELECT Cliente, SUM(monto_pagado) FROM -- Selection of the columns from the following table
-- Table:
(SELECT c.id_cliente, c.cliente AS Cliente, f.monto_pagado -- Columns
FROM Transacciones t
LEFT JOIN Clientes c ON c.id_cliente = t.id_cliente 
LEFT JOIN Facturas f ON f.id_factura = t.id_factura) -- Table joined
AS tmp -- Alias
GROUP BY id_cliente; --Group by clients
```

```sql
SELECT f.num_factura, f.monto_pagado, f.monto_facturado, t.monto_trans, c.cliente -- Selection of column
FROM Facturas f 
LEFT JOIN Transacciones t ON f.id_factura = t.id_factura
LEFT JOIN Clientes c ON c.id_cliente = t.id_cliente -- Table joined
WHERE monto_pagado < monto_facturado; -- Condition
```

```sql
SELECT c.cliente, t.monto_trans,f.num_factura, p.plataforma -- Selection of column 
FROM Transacciones t
LEFT JOIN Plataformas p ON p.id_plataforma = t.id_plataforma
LEFT JOIN Clientes c ON c.id_cliente = t.id_cliente
LEFT JOIN Facturas f ON f.id_factura = t.id_factura -- Table joned
WHERE p.plataforma = 'Nequi'; -- Condition
```

# Capturing relational model

## Table: clients

It contains the whole information about the costumber:
1. cliente (Name of the client, it's a VARCHAR(50))
2. identificacion (identification, it's a VARCHAR(10) and unique)
3. direccion (address, it's a text due to an address could be very long)
4. telefono (phone number, VARCHAR(25))
5. correo (email, VARCHAR(60))

## Table: bills

It contains the whole information about the bill:
1. num_factura (it's a VARCHAR(10) and UNIQUE. It's a code that identifies the bill)
2. fecha_factura (VARCHAR(10) It's the period in which the bill was created)
3. monto_facturado (INT. It's the amount of the bill)
4. monto_pagado (INT. It's the amount of the payment to the bill)

## Table: platforms

It's the list of platforms that the costumers can use to pay.
1. plataforma (VARCHAR(20). The platform)

## Table: transactions

It contains the whole information of each information
1. fecha_hora_trans (DATETIME): the date and time which the transaction was made
2. monto_trans (INT): the amount of the transaction
3. estado_trans (VARCHAR(15)): state of the transaction
4. tipo_trans (VARCHAR(15)): kind of transaction
5. id_cliente (fk INT): the id of the costumer
6. id_plataforma (fk INT): the id of the platform which the transaction was made
7. id_factura (fk INT): id of the bill.

# Developer's information

Coder: Andrés Felipe Londoño
Clan: Gosling
Email: afelipelondono81@gmail.com