// deliveryModel
'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

const getAllDeliveries = async (next) => {
    try {
        const [rows] = await promisePool.query(`SELECT delivery_id, name FROM delivery;`);
        return rows;
    } catch (e) {
        console.error('getAllDeliveries', e.message);
        next(httpError('Database error', 500));
    }
};

module.exports = {
    getAllDeliveries,
};