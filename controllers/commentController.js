// plantController
'use strict';
const {getComments, addComment, deleteComment} = require('../models/commentModel');
const {httpError} = require('../utils/errors');
const {validationResult} = require('express-validator');

const comment_list_get = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('comment_list_get', errors.array());
            next(httpError(errors.array()[0].msg, 400));
            return;
        }

        let result = await getComments([req.params.id]);

        if (result.length < 1) {
            next(httpError('Kommentteja ei löytynyt.', 404));
            return;
        }

        res.json(result);
    } catch (e) {
        console.error('comment_list_get', e.message);
        next(httpError('Sisäinen palvelinvirhe.', 500));
    }
};

const comment_post = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('comment_post validation', errors.array());
            next(httpError(errors.array()[0].msg, 400));
            return;
        }

        const data = [
            req.body.comment,
            req.params.id,
            req.user.user_id,
        ]

        const result = await addComment(data, next);

        console.log(result);

        if (result.length < 1) {
            next(httpError('Virheellistä tietoa.', 400));
            return;
        }

        res.json({
            message: 'Kommentti lisätty.'
        });
    } catch (e) {
        console.error('comment_post', e.message);
        next(httpError('Sisäinen palvelinvirhe.', 500));
    }
};

const comment_delete = async (req, res, next) => {
    try {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // There are errors in data
        if (!errors.isEmpty()) {
            console.error('comment_delete validation', errors.array());
            next(httpError('Virheellistä tietoa.', 400));
            return;
        }

        const data = [req.params.comment_id, req.params.id];

        // If not admin, add user_id to data
        if (req.user.role === 1) {
            data.push(req.user.user_id);
        }

        const result = await deleteComment(data, req.user, next);
  
        if (result.affectedRows < 1) {
            next(httpError('Kommenttia ei poistettu.', 400));
            return;
        }
  
        res.json({message: 'Kommentti poistettu.',});

    } catch (e) {
        console.error('comment_delete', e.message);
        next(httpError('Sisäinen palvelinvirhe.', 500));
    }
}

module.exports = {
    comment_list_get,
    comment_post,
    comment_delete,
};