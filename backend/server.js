const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./tasks.db');

app.use(bodyParser.json());
app.use(cors());

db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed BOOLEAN DEFAULT 0)');

app.post('/add', (req, res) => {
    db.run('INSERT INTO tasks (title) VALUES (?)', [req.body.title], function (err) {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            id: this.lastID,
            title: req.body.title,
            completed: 0
        });
    });
});

app.get('/liste_abrufen', (req, res) => {
    db.all('SELECT * FROM tasks', function (err, rows) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json(rows);
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tasks WHERE id = ?', id, function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({message: 'Task deleted'});
    });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    db.run('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], function (err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({message: 'Task updated'});
    });
});

app.get('/', (req, res) => {
    res.send('Request received');
});

const PORT = process.env.PORT || 3500;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
