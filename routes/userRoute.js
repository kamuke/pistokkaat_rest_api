// userRouter
'use strict';
const express = require('express');
const {check, body} = require('express-validator');
const router = express.Router();
const passport = require('../utils/pass');
const {user_list_get, user_get, user_post, user_put, user_delete, check_token} = require('../controllers/userController');
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
            withMessage('Email must be valid email and maximum of 60 characters.').
            normalizeEmail().
            isLength({max: 60}),
        body('username').
            isLength({min: 3, max: 20}).
            withMessage('Username must have minimum of 3 and maximum of 20 characters.').
            escape(),
        body('oldPassword').
            if((value, {req}) => req.body.newPassword).
            if(body('newPassword').exists()).
            notEmpty().
            withMessage('Must have old password when changing it.').
            custom((value, {req}) => value !== req.body.newPassword).
            withMessage('Old and new passwords can not be same.').
            escape(),
        body('newPassword').
            if(body('newPassword').exists()).
            matches(/(?=.*\p{Lu}).{8,}/u).
            withMessage('Password must have minimum of 8 and maximum of 80 characters, and at least one capital character.').
            isLength({max: 80}).
            escape(),
        body('municipality_id').isInt(),
        passport.authenticate('jwt', {session: false}),
        user_put);

router.get('/token', check_token);

router.route('/:id').
    get(check('id').isInt(),
        optionalAuth,
        user_get).
    delete(check('id').isInt(),
        passport.authenticate('jwt', {session: false}),
        user_delete);

router.route('/:id/plant').
    get(check('id').isInt(),
        optionalAuth,
        users_plant_list_get);

module.exports = router;