'use strict'

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

var albumRoutes = require('./routes/album');
var imageRoutes = require('./routes/image');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use('/api', albumRoutes);
app.use('/api', imageRoutes);

module.exports = app;