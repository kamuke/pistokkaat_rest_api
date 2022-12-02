// plantRouter
'use strict';
const express = require('express');
const multer  = require('multer');
const upload = multer({dest: './uploads/'});
const router = express.Router();
const {plant_list_get, plant_get, plant_post} = require('../controllers/plantController');

// GET method route
router.get('/', plant_list_get);

// GET method route
router.get('/:id', plant_get);

// POST method route
router.post('/', upload.single('image'), plant_post);

// PUT method route
router.put('/', (req, res) => {
    res.send('With this endpoint you can edit plants.');
});

// DELETE method route
router.delete('/', (req, res) => {
    res.send('With this endpoint you can delete plants.');
});

module.exports = router;