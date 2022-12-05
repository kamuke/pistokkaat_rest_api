// userRouter
'use strict';
const express = require('express');
const router = express.Router();
const {user_list_get, user_get, user_post, user_put, user_delete} = require('../controllers/userController');

router.route('/').
    get(user_list_get).
    post(user_post).
    put(user_put);

router.route('/:id').
    get(user_get).
    delete(user_delete);

module.exports = router;