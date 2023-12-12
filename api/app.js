'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var albumRoutes = require('./routes/album');
var imageRoutes = require('./routes/image');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
// });

app.use('/api', albumRoutes);
app.use('/api', imageRoutes);

module.exports = app;