// userRouter
'use strict';
const express = require('express');
const {check, body} = require('express-validator');
const router = express.Router();
const passport = require('../utils/pass');
const {user_list_get, user_get, user_put, user_delete, check_token} = require('../controllers/userController');
const {favourite_list_get} = require('../controllers/favouriteController');
const {users_plant_list_get} = require('../controllers/plantController');

const optionalAuth = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        req.authenticated = !! user;
        next();
    })(req, res, next);
};

router.route('/').
    get(passport.authenticate('jwt', {session: false}),
        user_list_get).
    put(body('email').
            isEmail().
            withMessage('Sähköpostin tulee olla toimiva ja maksimissaan 60 merkkiä.').
            normalizeEmail().
            isLength({max: 60}),
        body('username').
            isLength({min: 3, max: 20}).
            withMessage('Käyttäjänimen tulee olla vähintään 3 ja maksimissaan 20 merkkiä.').
            escape(),
        body('oldpassword').
            if((value, {req}) => req.body.newpassword).
            if(body('newpassword').exists()).
            notEmpty().
            withMessage('Lisää vanha salasana, kun vaihdat salasanaa.').
            custom((value, {req}) => value !== req.body.newpassword).
            withMessage('Uusi ja vanha salasana eivät voi olla sama.').
            escape(),
        body('newpassword').
            if(body('newpassword').exists()).
            matches(/(?=.*\p{Lu}).{8,}/u).
            withMessage('Salasanan tulee olla vähintään 8 ja maksimissaan 80 merkkiä, ja salasanassa tulee olla vähintään 1 iso kirjain.').
            isLength({max: 80}).
            escape(),
        body('municipality', 'Lisää kunta.').
            isInt(),
        passport.authenticate('jwt', {session: false}),
        user_put).
    delete(passport.authenticate('jwt', {session: false}),
        user_delete);

router.get('/token',
        passport.authenticate('jwt', {session: false}),
        check_token);

router.route('/favourite').
    get(passport.authenticate('jwt', {session: false}), favourite_list_get);

router.route('/:id').
    get(check('id').isInt(),
        optionalAuth,
        user_get);

router.route('/:id/plant').
    get(check('id').isInt(),
        optionalAuth,
        users_plant_list_get);

module.exports = router;