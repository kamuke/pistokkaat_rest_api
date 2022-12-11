// plantRouter
'use strict';
const express = require('express');
const {check, body} = require('express-validator');
const multer  = require('multer');
const router = express.Router();
const passport = require('../utils/pass');
const {plant_list_get, plant_get, plant_post, plant_delete, plant_put} = require('../controllers/plantController');
const {comment_list_get, comment_post, comment_delete} = require('../controllers/commentController');
const { favourite_post, favourite_delete } = require('../controllers/favouriteController');

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

const optionalAuth = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        req.authenticated = !! user;
        next();
    })(req, res, next);
};

router.route('/').
    get(optionalAuth,
        plant_list_get).
    post(upload.single('image'),
        body('name', 'Name must have minimum of 3 and maximum of 200 characters.').
            isLength({min: 3, max: 200}).
            escape(),
        body('price').
            isInt(),
        body('description', 'Description must have minimum of 30 and maximum of 280 characters.').
            isLength({min: 30, max: 280}).
            escape(),
        body('instruction', 'Instruction must have minimum of 30 and maximum of 280 characters.').
            isLength({min: 30, max: 280}).
            escape(),
        body('delivery').escape(),
        passport.authenticate('jwt', {session: false}),
        plant_post);

router.route('/:id').
    get(check('id').isInt(),
        optionalAuth,
        plant_get).
    delete(check('id').isInt(),
        passport.authenticate('jwt', {session: false}),
        plant_delete).
    put(check('id').isInt(),
        body('name', 'Name must have minimum of 3 and maximum of 200 characters.').
            isLength({min: 3, max: 200}).
            escape(),
        body('price').
            isInt(),
        body('description', 'Description must have minimum of 30 and maximum of 280 characters.').
            isLength({min: 30, max: 280}).
            escape(),
        body('instruction', 'Instruction must have minimum of 30 and maximum of 280 characters.').
            isLength({min: 30, max: 280}).
            escape(),
        body('delivery').escape(),
        passport.authenticate('jwt', {session: false}),
        plant_put);

router.route('/:id/comment').
        get(check('id').isInt(),
            comment_list_get).
        post(check('id').isInt(),
            body('comment', 'Comment must have minimum of 3 and maximum of 280 characters.').
                isLength({min: 3, max: 280}).
                escape(),
            passport.authenticate('jwt', {session: false}),
            comment_post);

router.route('/:id/comment/:comment_id').
        delete(check('id').isInt(),
            check('comment_id').isInt(),
            passport.authenticate('jwt', {session: false}),
            comment_delete);

router.route('/:id/favourite').
        post(check('id').isInt(),
            passport.authenticate('jwt', {session: false}),
            favourite_post).
        delete(check('id').isInt(),
            passport.authenticate('jwt', {session: false}),
            favourite_delete);

module.exports = router;