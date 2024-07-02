const express = require('express');
const db = require('./config/database.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.listen(8800, () => {
    console.log('Server started at http://localhost:8800');
});

