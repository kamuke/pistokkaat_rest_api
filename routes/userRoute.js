// userRouter
'use strict';
const express = require('express');
const {check, body} = require('express-validator');
const router = express.Router();
const {user_list_get, user_get, user_post, user_put, user_delete, users_plant_list_get, check_token} = require('../controllers/userController');

router.route('/').
    get(user_list_get).
    post(body('email').
            isEmail().
            withMessage('Email must be valid email and maximum of 60 characters.').
            normalizeEmail().isLength({max: 60}),
        body('username').
            isLength({min: 3, max: 20}).
            withMessage('Username must have minimum of 3 and maximum of 20 characters.').
            escape(),
        body('password').
            matches(/(?=.*\p{Lu}).{8,}/u).
            withMessage('Password must have minimum of 8 and maximum of 80 characters, and at least one capital character.').
            isLength({max: 80}).
            escape(),
        body('municipality_id').isInt(),
        user_post).
    put(body('email').
            isEmail().
            withMessage('Email must be valid email and maximum of 60 characters.').
            normalizeEmail().
            isLength({max: 60}),
        body('username').
            isLength({min: 3, max: 20}).
            withMessage('Username must have minimum of 3 and maximum of 20 characters.').
            escape(),
        body('password').
            matches(/(?=.*\p{Lu}).{8,}/u).
            withMessage('Password must have minimum of 8 and maximum of 80 characters, and at least one capital character.').
            isLength({max: 80}).
            escape(),
        body('municipality_id').isInt(),
        body('user_id').isInt(),
        user_put);

router.get('/token', check_token);

router.route('/:id').
    get(check('id').isInt(),
        user_get).
    delete(check('id').isInt(),
        user_delete);

router.route('/:id/plant').
    get(check('id').isInt(),
        users_plant_list_get);

module.exports = router;