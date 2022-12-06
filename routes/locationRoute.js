// locationRouter
'use strict';
const express = require('express');
const router = express.Router();
const {location_list_get} = require('../controllers/locationController');

router.route('/').get(location_list_get);

module.exports = router;