// deliveryController
'use strict';
const {getAllDeliveries} = require('../models/deliveryModel');
const {httpError} = require('../utils/errors');

const delivery_list_get = async (req, res, next) => {
    try {
        const result = await getAllDeliveries(next);

        if (result.length < 1) {
            next(httpError('Toimitustapoja ei löytynyt.', 404));
            return;
        }

        res.json(result);
    } catch (e) {
        console.error('delivery_list_get', e.message);
        next(httpError('Sisäinen palvelinvirhe.', 500));
    }
};

module.exports = {
    delivery_list_get,
};