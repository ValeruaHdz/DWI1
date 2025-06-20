const express = require('express');
const app = express();
const routerPalapa =require('./routes/palapaRouter');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/palapa', routerPalapa);

module.exports = app;