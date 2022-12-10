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
            next(httpError('No users found', 404));
            return;
        }

        res.json(result);
    } catch (e) {
        console.error('user_list_get', e.message);
        next(httpError('Internal server error', 500));
    }
};

const user_get = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('user_get validation', errors.array());
            next(httpError('Invalid data', 400));
            return;
        }

        let result = await getUser([req.params.id], next);

        if (!result) {
            next(httpError('No user found', 404));
            return;
        }

        delete result.password;

        if (!req.authenticated) {
            delete result.email;
        }

        res.json(result);
    } catch (e) {
        console.error('user_get', e.message);
        next(httpError('Internal server error', 500));
    }
};

const user_put = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('user_put validation', errors.array());
            next(httpError(errors.array()[0].msg, 400));
            return;
        }

        const users = await getAllUsers(next);
        const user = await getUser([req.user.user_id], next);

        // Check if email is already in use
        if (users.find(user => user && user.email === req.body.email && user.user_id !== req.user.user_id)) {
            next(httpError('Email already in use', 400));
            return;
        }

        // Check if username is already in use
        if (users.find(user => user && user.username === req.body.username && user.user_id !== req.user.user_id)) {
            next(httpError('Username already in use', 400));
            return;
        }

        const data = [
            req.body.email,
            req.body.username,
            req.body.municipality_id
        ];

        if (req.body.newpassword) {
            // Check if password doesn't match the old password
            if (!bcrypt.compareSync(req.body.oldpassword, user.password)) {
                next(httpError('Incorrect password.', 400));
                return;
            }
            data.push(req.body.newpassword);
        }

        data.push(user.user_id);

        const result = await updateUser(data, next);

        if (result.affectedRows < 1) {
            next(httpError('No user updated', 400));
            return;
        }

        res.json({message: 'User updated',});
    } catch (e) {
        console.error('user_put', e.message);
        next(httpError('Internal server error', 500));
    }
};

const user_delete = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('user_delete validation', errors.array());
            next(httpError('Invalid data', 400));
            return;
        }

        const result = await deleteUser(req.user.user_id, next);

        if (result.affectedRows < 1) {
            next(httpError('No user deleted', 400));
            return;
        }

        res.json({message: 'User deleted',});
    } catch (e) {
        console.error('user_delete', e.message);
        next(httpError('Internal server error', 500));
    }
};

const check_token = (req, res, next) => {
    if (!req.user) {
      next(httpError('Token not valid', 403));
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