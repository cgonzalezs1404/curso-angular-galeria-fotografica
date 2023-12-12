'use strict'

var Album = require('../models/album');

async function getAlbum(req, res) {
    console.log('getAlbum');
    var albumId = req.params.id;
    await Album.findById(albumId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

async function getAlbums(req, res) {
    console.log('getAlbums');
    await Album.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

async function saveAlbum(req, res) {
    console.log('saveAlbum');
    var album = new Album();
    var params = req.body;
    album.title = params.title;
    album.description = params.description;

    await album.save()
        .then((result) => {
            res.status(200).send({ album: result });
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

async function updateAlbum(req, res) {
    console.log('updateAlbum');
    var albumId = req.params.id;
    var params = req.body;

    Album.findByIdAndUpdate(albumId, params)
        .then((result) => {
            res.status(200).send({ album: params });
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

async function deleteAlbum(req, res) {
    console.log('deleteAlbum');
    var albumId = req.params.id;
    var params = req.body;

    Album.findByIdAndDelete(albumId)
        .then((result) => {
            res.status(200).send({ album: params });
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum
};