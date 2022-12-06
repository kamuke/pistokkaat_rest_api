// deliveryRouter
'use strict';
const express = require('express');
const router = express.Router();
const {delivery_list_get} = require('../controllers/deliveryController');

router.route('/').get(delivery_list_get);

module.exports = router;