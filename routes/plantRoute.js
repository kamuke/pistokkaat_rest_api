// plantRouter
'use strict';
const express = require('express');
const multer  = require('multer');
const upload = multer({dest: './uploads/'});
const router = express.Router();
const {plant_list_get, plant_get, plant_post, plant_delete, plant_put} = require('../controllers/plantController');

router.route('/').
    get(plant_list_get).
    post(upload.single('image'), plant_post).
    put(plant_put);

router.route('/:id').
    get(plant_get).
    delete(plant_delete);

module.exports = router;