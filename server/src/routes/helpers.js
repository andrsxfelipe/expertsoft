import fs from 'fs';
import csv from 'csv-parser';
import mysql from 'mysql2/promise';

// export function insertRows(){
const db = await mysql.createConnection({
    host: 'localhost',
    user: 'Andrsxfelipe',
    password: 'idQ6kwx+',
    database: 'prueba2'
});

console.log('Conectado exitosamente a la BD');

const rows = await new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (row) => data.push(row))
        .on('end', () => resolve(data))
        .on('error', reject);
})

console.log('Archivo csv leido');

const sql = `
INSERT INTO data (fecha_hora, monto_transaccion, estado_transaccion, tipo_transaccion, cliente, identificacion, 
direccion, telefono, correo, plataforma, num_factura, fecha_factura, monto_facturado, monto_pagado) VALUES
(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`

for (const row of rows) {
    try {
        const columnas = [row.fecha_hora_trans, row.monto_trans, row.estado_trans, row.tipo_trans, row.nombre_cliente, row.identificacion, row.direccion,
        row.tel, row.correo, row.plataforma, row.num_factura, row.periodo_factura, row.monto_facturado, row.monto_pagado];
        await db.query(sql, columnas);
        console.log('Fila insertada')

    } catch (error) {
        console.log(`Error al procesar fila: \n ${row} \nError: ${error.message}`);
    }
}

console.log('Todos los registros procesados');
//await db.end();

// Normalizacion:
const queryClientes = `
    INSERT INTO Clientes (cliente, identificacion, direccion, telefono, correo)
	SELECT DISTINCT cliente, identificacion, direccion, telefono, correo FROM data;
    `;
    const queryFacturas = `
    INSERT INTO Facturas (num_factura, fecha_factura, monto_facturado, monto_pagado)
	SELECT DISTINCT num_factura, fecha_factura, monto_facturado, monto_pagado FROM data;
    `;

    const queryPlataformas = `
    INSERT INTO Plataformas (plataforma)
	SELECT DISTINCT plataforma FROM data;
    `;

    const queryTransacciones = `
    INSERT INTO Transacciones (fecha_hora_trans, monto_trans, estado_trans, tipo_trans, id_cliente, id_plataforma, id_factura)
    SELECT d.fecha_hora, d.monto_transaccion, d.estado_transaccion, d.tipo_transaccion, c.id_cliente, p.id_plataforma, f.id_factura 
    FROM data d
    LEFT JOIN Clientes c ON c.identificacion = d.identificacion
    LEFT JOIN Plataformas p ON p.plataforma = d.plataforma
    LEFT JOIN Facturas f ON f.num_factura = d.num_factura;
    `;
try {
    await db.query(queryClientes);
    await db.query(queryFacturas);
    await db.query(queryPlataformas);
    await db.query(queryTransacciones);

    console.log('El archivo se ha normalizado y se han separado las tablas')
} catch (err) {
    console.error('Hubo un error poblando las tablas, asegurese de subir el archivo correcto. ERROR: ', err.message);
}
await db.end();
console.log('BD Cerrada');

// }