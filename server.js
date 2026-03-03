const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Leer todos los registros (read all)
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM usuario', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows)
    })
});

//Leer un registro (read one)
app.get('/api/users/:id', (req, res) => {
    db.query('SELECT * FROM usuario WHERE id=?', [req.params.id],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message })
            if (!rows.length) return res.status(404).json({ message: 'No encontrado' }),
                res.json(rows[0])

        })
})

//Crear registros (Create)
app.post('/api/users', (req, res) => {
    const { nombre, telefono, correo } = req.body;
    db.query('INSERT INTO usuario (nombre, telefono, correo) VALUES (?,?,?)',
        [nombre, telefono, correo],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Creado', id: result.insertId })
        })
})

//Actualizar registro (Update)
app.put('/api/users/:id', (req, res) => {
    const { nombre, telefono, correo } = req.body;
    db.query('UPDATE usuario SET nombre=?, telefono=?, correo=? WHERE id=?',
        [nombre, telefono, correo, req.params.id],

        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Actualizado' });
        })
})

// Eliminar registro (Delete)
app.delete('/api/users/:id', (req, res) => {
    db.query('DELETE FROM usuario WHERE id=?',
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Eliminado' });
        });
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));