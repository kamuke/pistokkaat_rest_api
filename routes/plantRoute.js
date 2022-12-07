// plantRouter
'use strict';
const express = require('express');
const {check, body} = require('express-validator');
const multer  = require('multer');
const router = express.Router();
const {plant_list_get, plant_get, plant_post, plant_delete, plant_put} = require('../controllers/plantController');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const testFile = (req, res, next) => {
    if (req.file) {
        next();
    } else {
        res.status(400).json({errors: 'File is not image'});
    }
}

const upload = multer({ dest: './uploads/', fileFilter });

router.route('/').
    get(plant_list_get).
    post(upload.single('image'),
        testFile,
        body('name').
            isLength({min: 3, max: 200}).
            withMessage('Name must have minimum of 3 and maximum of 200 characters.').
            escape(),
        body('price').
            isInt(),
        body('description').
            isLength({min: 30, max: 280}).
            withMessage('Description must have minimum of 30 and maximum of 280 characters.').
            escape(),
        body('instruction').
            isLength({min: 30, max: 280}).
            withMessage('Instruction must have minimum of 30 and maximum of 280 characters.').
            escape(),
        body('delivery').escape(),
        body('seller_id').isInt(),
        plant_post).
    put(body('name').
            isLength({min: 3, max: 200}).
            withMessage('Name must have minimum of 3 and maximum of 200 characters.').
            escape(),
        body('price').
            isInt(),
        body('description').
            isLength({min: 30, max: 280}).
            withMessage('Description must have minimum of 30 and maximum of 280 characters.').
            escape(),
        body('instruction').
            isLength({min: 30, max: 280}).
            withMessage('Instruction must have minimum of 30 and maximum of 280 characters.').
            escape(),
        body('delivery').escape(),
        body('plant_id').isInt(),
        plant_put);

router.route('/:id').
    get(check('id').isInt(),
        plant_get).
    delete(check('id').isInt(),
        plant_delete);

module.exports = router;