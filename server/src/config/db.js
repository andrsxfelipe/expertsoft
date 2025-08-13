import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Andrsxfelipe',
    password: 'idQ6kwx+',
    database: 'expertsoft'
})

connection.connect(err => {
    if (err){
        console.error('Error al conectar el servidor a la BD: ',err.message);
    } else {
        console.log('Conexion exitosa')
    }
})

export default connection;