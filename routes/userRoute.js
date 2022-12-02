// userRouter
'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET method route
router.get('/', userController.user_list_get);

// GET method route
router.get('/:id', userController.user_get);

// POST method route
router.post('/', (req, res) => {
    res.send('With this endpoint you can add users.');
});

// PUT method route
router.put('/', (req, res) => {
    res.send('With this endpoint you can edit users.');
});

// DELETE method route
router.delete('/', (req, res) => {
    res.send('With this endpoint you can delete users.');
});

module.exports = router;