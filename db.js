const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'javascript_conection'
});

connection.connect(err => {
    if (err) console.error(err.message);
    else console.log('Conectado a MySQL');
});

module.exports = connection;