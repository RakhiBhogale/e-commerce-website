const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/data', (req, res) => {
    db.query('SELECT * FROM your_table', (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
