// userController
'use strict';
const {getAllUsers, getUser, addUser, updateUser, deleteUser, getUsersAllPlants} = require('../models/userModel');
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

        const result = await getUser(req.params.id, next);

        if (result.length < 1) {
            next(httpError('No user found', 404));
            return;
        }

        res.json(result.pop());
    } catch (e) {
        console.error('user_get', e.message);
        next(httpError('Internal server error', 500));
    }
};

const user_post = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('user_post validation', errors.array());
            next(httpError(errors.array()[0].msg, 400));
            return;
        }

        const users = await getAllUsers(next);

        // Check if email is already in use
        if (users.find(user => user && user.email === req.body.email)) {
            next(httpError('Email already in use', 400));
            return;
        }

        // Check if username is already in use
        if (users.find(user => user && user.username === req.body.username)) {
            next(httpError('Username already in use', 400));
            return;
        }

        const data = [
            req.body.email,
            req.body.username,
            req.body.password,
            req.body.municipality_id
        ];

        const result = await addUser(data, next);

        if (result.affectedRows < 1) {
            next(httpError('Invalid data', 400));
            return;
        }

        res.json({
            message: 'User added.',
            user_id: result.insertId
        });
    } catch (e) {
        console.error('user_post', e.message);
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

        // Check if email is already in use
        if (users.find(user => user && user.email === req.body.email && user.user_id !== req.params.user_id)) {
            next(httpError('Email already in use', 400));
            return;
        }

        // Check if username is already in use
        if (users.find(user => user && user.username === req.body.username && user.user_id !== req.params.user_id)) {
            next(httpError('Username already in use', 400));
            return;
        }

        const data = [
            req.body.email,
            req.body.username,
            req.body.password,
            req.body.municipality_id,
            req.params.user_id
        ];

        const result = await updateUser(data, next);

        if (result.affectedRows < 1) {
            next(httpError('No user modified', 400));
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

        const result = await deleteUser(req.params.id, next);

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

const users_plant_list_get = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('user_plant_list_get validation', errors.array());
            next(httpError('Invalid data', 400));
            return;
        }

        let result = await getUsersAllPlants(req.params.id, next);

        if (result.length < 1) {
            next(httpError('No plants found', 404));
            return;
        }

        // Iterate and return edited item: 
        // split delivery to array and add seller object to single item
        result = result.map(item => {
            item.delivery = item.delivery.split(',');

            let user = {
                user_id: item.user_id,
                username: item.username,
                email: item.email,
                location: item.location,
                likes: item.likes
            };

            delete item.user_id;
            delete item.username;
            delete item.email;
            delete item.location;
            delete item.likes;

            item.seller = user;

            return item;
        });

        res.json(result);
    } catch (e) {
        console.error('user_plant_list_get', e.message);
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
    user_post,
    user_put,
    user_delete,
    users_plant_list_get,
    check_token,
};