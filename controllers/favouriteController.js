// favouriteController
'use strict';
const {getFavourites, addFavourite, deleteFavourite} = require('../models/favouriteModel');
const {httpError} = require('../utils/errors');
const {validationResult} = require('express-validator');

const favourite_list_get = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('favourite_list_get', errors.array());
            next(httpError(errors.array()[0].msg, 400));
            return;
        }

        let result = await getFavourites([req.user.user_id]);

        console.log(result);

        if (result.length < 1) {
            next(httpError('No favourites found', 404));
            return;
        }

        // Iterate and return edited item: add seller object to single item
        result = result.map(item => {

            let user = {
                user_id: item.user_id,
                username: item.username,
                location: item.location,
                email: item.email
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
        console.error('favourite_list_get', e.message);
        next(httpError('Internal server error', 500));
    }
};

const favourite_post = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('favourite_post validation', errors.array());
            next(httpError(errors.array()[0].msg, 400));
            return;
        }

        const data = [req.user.user_id, req.params.id];

        const result = await addFavourite(data, next);

        console.log(result);

        if (result.length < 1) {
            next(httpError('Invalid data', 400));
            return;
        }

        res.json({
            message: 'Favourite added'
        });
    } catch (e) {
        console.error('favourite_post', e.message);
        next(httpError('Internal server error', 500));
    }
};

const favourite_delete = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('favourite_delete validation', errors.array());
            next(httpError('Invalid data', 400));
            return;
        }

        const data = [req.user.user_id, req.params.id];

        const result = await deleteFavourite(data, next);
  
        if (result.affectedRows < 1) {
            next(httpError('No favourite deleted', 400));
            return;
        }
  
        res.json({message: 'Favourite deleted',});

    } catch (e) {
        console.error('favourite_delete', e.message);
        next(httpError('Internal server error', 500));
    }
}

module.exports = {
    favourite_list_get,
    favourite_post,
    favourite_delete,
};