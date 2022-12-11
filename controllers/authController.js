'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {getAllUsers, addUser} = require('../models/userModel');
const {httpError} = require('../utils/errors');
const {validationResult} = require('express-validator');

const login = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log('info: ', info);
        console.log('err1', err);
        if (err || !user) {
            next(httpError('Väärä sähköposti tai salasana.', 403));
            return;
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                console.log('err2', err);
                next(httpError('Login failed', 403));
                return;
            }

            const token = jwt.sign(user, 'asdfghjkl');
            return res.json({user, token});
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout();
    res.json({message: 'logout'});
};

const user_post = async (req, res, next) => {
    try {
        const users = await getAllUsers(next);

        // Check if email is already in use
        if (users.find(user => user && user.email === req.body.email)) {
            next(httpError('Sähköposti on jo käytössä.', 400));
            return;
        }

        // Check if username is already in use
        if (users.find(user => user && user.username === req.body.username)) {
            next(httpError('Käyttäjätunnus on jo käytössä.', 400));
            return;
        }

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('user_post validation', errors.array());
            next(httpError(errors.array()[0].msg, 400));
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt);

        const data = [
            req.body.email,
            req.body.username,
            req.body.municipality,
            password
        ];

        const result = await addUser(data, next);

        if (result.affectedRows < 1) {
            next(httpError('Virheellistä tietoa.', 400));
            return;
        }

        res.json({
            message: 'Käyttäjä lisätty onnistuneesti.',
            user_id: result.insertId
        });
    } catch (e) {
        console.error('user_post', e.message);
        next(httpError('Internal server error', 500));
    }
};

module.exports = {
  login,
  logout,
  user_post,
};