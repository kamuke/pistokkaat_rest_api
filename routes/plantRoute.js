// plantRouter
'use strict';
const express = require('express');
const {check, body} = require('express-validator');
const multer  = require('multer');
const router = express.Router();
const passport = require('../utils/pass');
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

const upload = multer({dest: './uploads/', fileFilter});

router.route('/').
    get(plant_list_get).
    post(upload.single('image'),
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
        passport.authenticate('jwt', {session: false}),
        plant_post);

router.route('/:id').
    get(check('id').isInt(),
        plant_get).
    delete(check('id').isInt(),
        passport.authenticate('jwt', {session: false}),
        plant_delete).
    put(check('id').isInt(),
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
        passport.authenticate('jwt', {session: false}),
        plant_put);

module.exports = router;