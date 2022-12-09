// plantController
'use strict';
const {getAllPlants, getPlant, deletePlant, addPlant, updatePlant} = require('../models/plantModel');
const {httpError} = require('../utils/errors');
const {validationResult} = require('express-validator');

const plant_list_get = async (req, res, next) => {
    try {
        let result = await getAllPlants(next);

        if (result.length < 1) {
            next(httpError('No plants found', 404));
            return;
        }

        console.log(req.authenticated);
        console.log(req.user);

        // Iterate and return edited item: 
        // split delivery to array and add seller object to single item
        result = result.map(item => {
            item.delivery = item.delivery.split(',');

            let user = {
                user_id: item.user_id,
                username: item.username,
                location: item.location,
                likes: item.likes
            };

            // If user is authenticated, add email to user's info
            if (req.authenticated) {
                user.email = item.email;
            }

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
        console.error('plant_list_get', e.message);
        next(httpError('Internal server error', 500));
    }
};

const plant_get = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('plant_get validation', errors.array());
            next(httpError('Invalid data', 400));
            return;
        }

        const data =  [req.params.id];

        let result = await getPlant(data, next);

        if (result.length < 1) {
            next(httpError('No plant found', 404));
            return;
        }

        // Iterate and return edited item: 
        // split delivery to array and add seller object to single item
        result = result.map(item => {
            item.delivery = item.delivery.split(',');

            let user = {
                user_id: item.user_id,
                username: item.username,
                location: item.location,
                likes: item.likes
            };

            // If user is authenticated, add email to user's info
            if (req.authenticated) {
                user.email = item.email;
            }

            delete item.user_id;
            delete item.username;
            delete item.email;
            delete item.location;
            delete item.likes;

            item.seller = user;

            return item;
        });

        res.json(result.pop());
    } catch (e) {
        console.error('plant_get', e.message);
        next(httpError('Internal server error', 500));
    }
};

const plant_post = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('plant_post validation', errors.array());
            next(httpError(errors.array()[0].msg, 400));
            return;
        }

        const data = [
            req.body.name,
            req.body.price,
            req.file.filename,
            req.body.description,
            req.body.instruction,
            req.user.user_id
        ]

        const delivery = req.body.delivery.split(',');

        const result = await addPlant(data, delivery, next);

        if (result.length < 1) {
            next(httpError('Invalid data', 400));
            return;
        }

        res.json({
            message: 'Plant added.',
            plant_id: result[0].insertId,
        });
    } catch (e) {
        console.error('plant_post', e.message);
        next(httpError('Internal server error', 500));
    }
};

const plant_put = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('plant_put validation', errors.array());
            next(httpError(errors.array()[0].msg, 400));
            return;
        }

        const data = [
                req.body.name,
                req.body.price,
                req.body.description,
                req.body.instruction,
                req.params.id,
                req.user.user_id
            ];

        const delivery = req.body.delivery.split(',');
        delivery.splice(0, 0, req.params.id); // Delivery also needs plant's id to insert data

        // If there is more than one delivery option, add another plant's id
        if (delivery.length > 2) {
            delivery.splice(2, 0, req.params.id);
        }
  
        const result = await updatePlant(data, delivery, req.user, next);

        if (result[0].affectedRows < 1) {
            next(httpError('No plant modified', 400));
            return;
        }
  
        res.json({message: 'Plant updated',});
    } catch (e) {
        console.error('plant_put', e.message);
        next(httpError('Internal server error', 500));
    }
};

const plant_delete = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('plant_delete validation', errors.array());
            next(httpError('Invalid data', 400));
            return;
        }

        const data = [req.params.id];

        // If not admin, add user_id to data
        if (req.user.role === 1) {
            data.push(req.user.user_id);
        }

        const result = await deletePlant(data, req.user, next);
  
        if (result.affectedRows < 1) {
            next(httpError('No plant deleted', 400));
            return;
        }
  
        res.json({message: 'Plant deleted',});
    } catch (e) {
        console.error('plant_delete', e.message);
        next(httpError('Internal server error', 500));
    }
};

module.exports = {
    plant_list_get,
    plant_get,
    plant_post,
    plant_put,
    plant_delete,
};