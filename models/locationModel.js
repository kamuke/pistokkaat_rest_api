// locationModel
'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

const getAllLocations = async (next) => {
    try {
        const [rows] = await promisePool.query(`SELECT municipality.name AS municipality, province.name AS province
                                                FROM municipality
                                                INNER JOIN province ON municipality.province_id = province.province_id;`);
        return rows;
    } catch (e) {
        console.error('getAllLocations', e.message);
        next(httpError('Database error', 500));
    }
};

module.exports = {
    getAllLocations,
};