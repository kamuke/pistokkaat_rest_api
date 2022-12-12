// userController
'use strict';
const bcrypt = require('bcryptjs');
const {getAllUsers, getUser, updateUser, deleteUser} = require('../models/userModel');
const {httpError} = require('../utils/errors');
const {validationResult} = require('express-validator');

const user_list_get = async (req, res, next) => {
    try {
        const result = await getAllUsers(next);

        if (result.length < 1) {
            next(httpError('Käyttäjiä ei löytynyt.', 404));
            return;
        }

        res.json(result);
    } catch (e) {
        console.error('user_list_get', e.message);
        next(httpError('Sisäinen palvelinvirhe.', 500));
    }
};

const user_get = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('user_get validation', errors.array());
            next(httpError('Virheellistä tietoa.', 400));
            return;
        }

        let result = await getUser([req.params.id], next);

        if (!result) {
            next(httpError('Käyttäjää ei löytynyt.', 404));
            return;
        }

        delete result.password;

        if (!req.authenticated) {
            delete result.email;
        }

        res.json(result);
    } catch (e) {
        console.error('user_get', e.message);
        next(httpError('Sisäinen palvelinvirhe.', 500));
    }
};

const user_put = async (req, res, next) => {
    try {
        const users = await getAllUsers(next);
        const user = await getUser([req.user.user_id], next);

        // Check if email is already in use
        if (users.find(user => user && user.email.toLowerCase() === req.body.email.toLowerCase() && user.user_id !== req.user.user_id)) {
            next(httpError('Sähköposti on jo käytössä.', 400));
            return;
        }

        // Check if username is already in use
        if (users.find(user => user && user.username.toLowerCase() === req.body.username.toLowerCase() && user.user_id !== req.user.user_id)) {
            next(httpError('Käyttäjätunnus on jo käytössä.', 400));
            return;
        }

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('user_put validation', errors.array());
            next(httpError(errors.array()[0].msg, 400));
            return;
        }

        const data = [
            req.body.email,
            req.body.username,
            req.body.municipality
        ];

        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.newpassword, salt);

        if (req.body.newpassword) {
            // Check if password doesn't match the old password
            if (!bcrypt.compareSync(req.body.oldpassword, user.password)) {
                next(httpError('Väärä salasana.', 400));
                return;
            }
            data.push(password);
        }

        data.push(user.user_id);

        const result = await updateUser(data, next);

        if (result.affectedRows < 1) {
            next(httpError('Käyttäjää ei päivitetty.', 400));
            return;
        }

        res.json({message: 'Käyttäjä päivitetty.',});
    } catch (e) {
        console.error('user_put', e.message);
        next(httpError('Sisäinen palvelinvirhe.', 500));
    }
};

const user_delete = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('user_delete validation', errors.array());
            next(httpError('Virheellistä tietoa.', 400));
            return;
        }

        const result = await deleteUser(req.user.user_id, next);

        if (result.affectedRows < 1) {
            next(httpError('Käyttäjää ei poistettu.', 400));
            return;
        }

        res.json({message: 'Käyttäjä poistettu.',});
    } catch (e) {
        console.error('user_delete', e.message);
        next(httpError('Sisäinen palvelinvirhe.', 500));
    }
};

const check_token = (req, res, next) => {
    if (!req.user) {
      next(httpError('Tokeni ei ole validi.', 403));
    } else {
      res.json({ user: req.user });
    }
};

module.exports = {
    user_list_get,
    user_get,
    user_put,
    user_delete,
    check_token,
};