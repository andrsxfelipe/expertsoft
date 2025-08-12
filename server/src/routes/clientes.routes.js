import { Router } from 'express';
import connection from '../config/db.js';

const router = Router();

router.get('/', (req,res) => {
    const sql = `
    SELECT * FROM Clientes
    `;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, identification, direccion, telefono, correo } = req.body;
    const sql = `
    UPDATE Clientes SET cliente = ?, identificacion = ?, direccion = ?, telefono = ?, correo = ? WHERE id_cliente = ?;
    `;
    const lista = [nombre, identification, direccion, telefono, correo, id]
    connection.query(sql, lista, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0){
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente actualizado correctamente' });
    })
});

router.post('/', (req, res) => {
    const { name, identification, address, phone, email } = req.body;
    const sql = `
    INSERT INTO Clientes (cliente, identificacion, direccion, telefono, correo)
    VALUES (?, ?, ?, ?, ?);
    `;
    connection.query(sql, [name, identification, address, phone, email], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Cliente creado', id: result.insertId });
        }
    );
})

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM Clientes WHERE id_cliente = ?';
    connection.query(sql, [id], (err,result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0 ){
            return res.status(400).json({ message: 'Cliente no encontrado'});
        }
        res.json({ message: 'Cliente eliminado correctamente' });
    });
});

export default router;