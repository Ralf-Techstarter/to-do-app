const express = require('express');

const sqlite3 = require('sqlite3');

const bodyParser = require('body-parser');

const app = express();

const db = new sqlite3.Database('./tasks.db');

const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed BOOLEAN DEFAULT 0)')


app.post('/add', (req, res) => {
    db.run('INSERT INTO tasks (title) VALUES (?)', [req.body.title], function () {
        res.json({tag: "Mittwoch", bald_wirds: "Mittagspause"});
    });
});


app.get/('/liste_abrufen', (req, res) => {
    db.all('SELECT * FROM tasks', function (err, rows){
        res.json(rows);
    })
});


app.get('/', (req, res) => {
    res.send('request received')
    });


app.listen(3500, 'localhost', () => {
console.log("bald ist Mittagspause")
})









const host = "localhost"