'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const {login, logout, user_post} = require('../controllers/authController');

router.post('/login', login);
router.get('/logout', logout);
router.post('/register',
            body('email', 'Email must be valid email and maximum of 60 characters.').
                isEmail().
                normalizeEmail().isLength({max: 60}),
            body('username', 'Username must have minimum of 3 and maximum of 20 characters.').
                isLength({min: 3, max: 20}).
                escape(),
            body('municipality_id', 'Must have municipality.').
                exists().
                isInt(),
            body('password', 'Password must have minimum of 8 and maximum of 80 characters, and at least one capital letter.').
                matches(/(?=.*\p{Lu}).{8,}/u).
                isLength({max: 80}).
                escape(),
            user_post);

module.exports = router;