'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { httpError } = require('../utils/errors');

const login = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log('info: ', info);
        console.log('err1', err);
        if (err || !user) {
            next(httpError('Login failed', 403));
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

module.exports = {
  login,
};