'use strict'

var path = require('path');
var Image = require('../models/image');
var Album = require('../models/album');

async function getImage(req, res) {
    var imageId = req.params.id;
    await Image.findById(imageId)
        .then((image) => {
            Album.populate(image, { path: 'album' })
                .then((album) => {
                    res.status(200).send(album);
                })
                .catch((error) => {
                    res.status(500).send(error);
                });

        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

async function getImages(req, res) {
    var albumId = req.params.album;
    if (!albumId) {
        await Image.find({}).sort('-title').exec()
            .then((image) => {
                Album.populate(image, { path: 'album' })
                    .then((album) => {
                        res.status(200).send(album);
                    })
                    .catch((error) => {
                        res.status(500).send(error);
                    });
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    } else {
        await Image.find({ album: albumId }).sort('-title').exec()
            .then((result) => {
                Album.populate(image, { path: 'album' })
                    .then((album) => {
                        res.status(200).send(album);
                    })
                    .catch((error) => {
                        res.status(500).send(error);
                    });
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }
}

async function saveImage(req, res) {
    var image = new Image();
    var params = req.body;

    image.title = params.title;
    image.picture = null;
    image.album = params.album;

    await image.save()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

async function updateImage(req, res) {
    var imageId = req.params.id;
    var update = req.body;

    await Image.findByIdAndUpdate(imageId, update)
        .then((result) => {
            res.status(200).send(update);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

async function deleteImage(req, res) {
    var imageId = req.params.id;
    var params = req.body;

    await Image.findByIdAndDelete(imageId)
        .then((result) => {
            res.status(200).send(params);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

async function uploadImage(req, res) {
    var imageId = req.params.id;
    var file_name = 'No subido';
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[1];

        await Image.findByIdAndUpdate(imageId, { picture: file_name })
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    }
}

var fs = require('fs');
async function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    if (fs.existsSync('./uploads/' + imageFile)) {
        await res.sendFile(path.resolve('./uploads/' + imageFile));
    }

}

module.exports = {
    getImage,
    getImages,
    saveImage,
    updateImage,
    deleteImage,
    uploadImage,
    getImageFile
};