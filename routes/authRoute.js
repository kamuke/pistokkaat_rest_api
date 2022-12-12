'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const {login, logout, user_post} = require('../controllers/authController');

router.post('/login', login);
router.get('/logout', logout);
router.post('/register',
            body('email', 'Sähköpostin tulee olla toimiva ja maksimissaan 60 merkkiä.').           
                isEmail().
                isLength({max: 60}).
                normalizeEmail(),
            body('username', 'Käyttäjänimen tulee olla vähintään 3 ja maksimissaan 20 merkkiä.').
                isLength({min: 3, max: 20}).
                escape(),
            body('municipality', 'Lisää kunta.').
                isInt(),
            body('password', 'Salasanan tulee olla vähintään 8 ja maksimissaan 80 merkkiä, ja salasanassa tulee olla vähintään 1 iso kirjain.').
                matches(/(?=.*\p{Lu}).{8,}/u).
                isLength({max: 80}).
                escape(),
            user_post);

module.exports = router;