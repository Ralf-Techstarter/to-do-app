const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('request received')
    });


app.listen(3500, 'localhost', () => {
console.log("bald ist Mittagspause")
})








const host = "localhost"