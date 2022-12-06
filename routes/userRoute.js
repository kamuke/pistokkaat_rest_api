// userRouter
'use strict';
const express = require('express');
const {check, body} = require('express-validator');
const router = express.Router();
const {user_list_get, user_get, user_post, user_put, user_delete} = require('../controllers/userController');

router.route('/').
    get(user_list_get).
    post(body('email').isEmail().normalizeEmail().isLength({max: 60}),
        body('username').isLength({min: 3, max: 20}).escape(),
        body('password').matches(/(?=.*\p{Lu}).{8,}/u).isLength({max: 80}).escape(),
        body('municipality').escape(),
        user_post).
    put(body('email').isEmail().normalizeEmail().isLength({max: 60}),
        body('username').isLength({min: 3, max: 20}).escape(),
        body('password').matches(/(?=.*\p{Lu}).{8,}/u).isLength({max: 80}).escape(),
        body('municipality').escape(),
        body('id').isInt(),
        user_put);

router.route('/:id').
    get(check('id').isInt(),
        user_get).
    delete(check('id').isInt(),
        user_delete);

module.exports = router;