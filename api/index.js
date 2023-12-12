'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

var test = mongoose.connect('mongodb://127.0.0.1:27017/app_albums')
.then((res) => {
    console.log('Conectado a DB...');
    app.listen(port, ()=> {
        console.log('API listening...');
    });
})
.catch((err) => {
    console.log(err);
 });