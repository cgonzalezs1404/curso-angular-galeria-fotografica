'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var api = express.Router();

api.get('/album/:id', AlbumController.getAlbum);
api.get('/album', AlbumController.getAlbums);
api.post('/album', AlbumController.saveAlbum);
api.put('/album/:id', AlbumController.updateAlbum);
api.delete('/album/:id', AlbumController.deleteAlbum);

module.exports = api;