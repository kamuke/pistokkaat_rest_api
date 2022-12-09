// catModel
'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

// TODO: search in this same get?
const getAllPlants = async (next) => {
    try {
        const [rows] = await promisePool.query(`SELECT 		plant.plant_id, 
                                                            plant.name, 
                                                            plant.price, 
                                                            plant.description, 
                                                            plant.instruction, 
                                                            plant.imagename, 
                                                            GROUP_CONCAT(
                                                                DISTINCT delivery.name 
                                                                ORDER BY delivery.name ASC 
                                                                SEPARATOR ', '
                                                            ) AS delivery,
                                                            (
                                                                SELECT COUNT(plant_id) 
                                                                FROM plantfavourites 
                                                                WHERE plant_id = plant.plant_id
                                                            ) AS favourites,
                                                            plant.created, 
                                                            plant.edited, 
                                                            user.user_id, 
                                                            user.username, 
                                                            user.email, 
                                                            municipality.name AS location
                                              FROM 			plant
                                              INNER JOIN 	user 
                                              ON            plant.user_id = user.user_id
                                              INNER JOIN 	municipality 
                                              ON            user.municipality_id = municipality.municipality_id
                                              INNER JOIN 	plantdelivery
                                              ON            plant.plant_id = plantdelivery.plant_id
                                              INNER JOIN 	delivery 
                                              ON            plantdelivery.delivery_id = delivery.delivery_id
                                              GROUP BY 	    plant.plant_id
                                              ORDER BY 	    plant.created DESC;`);
        return rows;
    } catch (e) {
        console.error('getAllPlants', e.message);
        next(httpError('Database error', 500));
    }
};

const getPlant = async (data, next) => {
    try {
        const [rows] = await promisePool.query(`SELECT 		plant.plant_id, 
                                                            plant.name, 
                                                            plant.price, 
                                                            plant.description, 
                                                            plant.instruction, 
                                                            plant.imagename, 
                                                            GROUP_CONCAT(
                                                                DISTINCT delivery.name 
                                                                ORDER BY delivery.name ASC 
                                                                SEPARATOR ', '
                                                            ) AS delivery,
                                                            (
                                                                SELECT COUNT(plant_id) 
                                                                FROM plantfavourites 
                                                                WHERE plant_id = plant.plant_id
                                                            ) AS favourites,
                                                            plant.created, 
                                                            plant.edited, 
                                                            user.user_id, 
                                                            user.username, 
                                                            user.email, 
                                                            municipality.name AS location
                                                FROM 		plant
                                                INNER JOIN 	user ON plant.user_id = user.user_id
                                                INNER JOIN 	municipality ON user.municipality_id = municipality.municipality_id
                                                INNER JOIN 	plantdelivery ON plant.plant_id = plantdelivery.plant_id
                                                INNER JOIN 	delivery ON plantdelivery.delivery_id = delivery.delivery_id
                                                WHERE       plant.plant_id = ?
                                                GROUP BY 	plant.plant_id;`, data);
        return rows.pop();
    } catch (e) {
        console.error('getPlant', e.message);
        next(httpError('Database error', 500));
    }
};

const addPlant = async(data, delivery, next) => {
    let connection;
    let firstQueryRows = [];

    try {
        connection = await promisePool.getConnection();

        const firstQuery = `INSERT INTO plant(name, price, imagename, description, instruction, user_id) 
                   VALUES(?, ?, ?, ?, ?, ?);`;

        let secondQuery = `INSERT INTO plantdelivery(plant_id, delivery_id) VALUES(LAST_INSERT_ID(), ?)`;

        // If delivery has more than one value, add one more insert
        if (delivery.length > 1) {
            secondQuery += `, (LAST_INSERT_ID(), ?)`;
        }

        secondQuery += `;`;

        // Begin transaction
        await connection.beginTransaction();

        firstQueryRows = await connection.query(firstQuery, data);
        await connection.query(secondQuery, delivery);

        await connection.commit();
    } catch (e) {
        // If something went wrong, rollback so changes will be deleted
        await connection.rollback();
        console.error('addPlant', e.message);
        next(httpError('Database error', 500));
    } finally {
        connection.release();
        return firstQueryRows;
    }
};

const updatePlant = async (data, delivery, user, next) => {
    let connection;
    let firstQueryRows = [];

    try {
        let firstQuery;
        connection = await promisePool.getConnection();

        // If user.role === 0, can edit any plant
        if (user.role === 0) {
            firstQuery = `UPDATE    plant
                          SET       name=?, 
                                    price=?, 
                                    description=?, 
                                    instruction=?, 
                                    edited=NOW()
                          WHERE     plant_id=?;`;
        } else {
            firstQuery = `UPDATE    plant 
                          SET       name=?, 
                                    price=?, 
                                    description=?, 
                                    instruction=?, 
                                    edited=NOW()
                          WHERE     plant_id=? AND user_id=?;`;
        }

        const secondQuery = `DELETE FROM plantdelivery WHERE plant_id=?`;

        let thirdQuery = `INSERT INTO plantdelivery(plant_id, delivery_id) VALUES(?, ?)`;

        // If delivery has more than two values, add one more insert
        if (delivery.length > 2) {
            thirdQuery += `, (?, ?)`;
        }

        thirdQuery += `;`;

        // Begin transaction
        await connection.beginTransaction();
        firstQueryRows = await connection.query(firstQuery, data);
        await connection.query(secondQuery, [data[4]]);
        await connection.query(thirdQuery, delivery);
        await connection.commit();
    } catch(e) {
        // If something went wrong, rollback so changes will be deleted
        await connection.rollback();
        console.error('updatePlant', e.message);
        next(httpError('Database error', 500));
    } finally {
        connection.release();
        return firstQueryRows;
    }
};

const deletePlant = async (data, user, next) => {
    try {
        let query;

        // If user.role === 0, can delete any plant
        if (user.role === 0) {
            query = `DELETE FROM plant WHERE plant_id=?`
        } else {
            query = `DELETE FROM plant WHERE plant_id=? AND user_id=?`
        }

        const [rows] = await promisePool.execute(query, data);

        return rows;
    } catch (e) {
        console.error('deletePlant', e.message);
        next(httpError('Database error', 500));
    }
};

const getUsersAllPlants = async (data, next) => {
    try {
        const [rows] = await promisePool.query(`SELECT 		plant.plant_id, 
                                                            plant.name, 
                                                            plant.price, 
                                                            plant.description, 
                                                            plant.instruction, 
                                                            plant.imagename, 
                                                            GROUP_CONCAT(
                                                                DISTINCT delivery.name 
                                                                ORDER BY delivery.name ASC
                                                                SEPARATOR ', '
                                                            ) AS delivery,
                                                            (
                                                                SELECT COUNT(plant_id) 
                                                                FROM plantfavourites 
                                                                WHERE plant_id = plant.plant_id
                                                            ) AS favourites,
                                                            plant.created, 
                                                            plant.edited, 
                                                            user.user_id, 
                                                            user.username, 
                                                            user.email, 
                                                            municipality.name AS location
                                                FROM 		plant
                                                INNER JOIN 	user ON plant.user_id = user.user_id
                                                INNER JOIN 	municipality ON user.municipality_id = municipality.municipality_id
                                                INNER JOIN 	plantdelivery ON plant.plant_id = plantdelivery.plant_id
                                                INNER JOIN 	delivery ON plantdelivery.delivery_id = delivery.delivery_id
                                                WHERE		user.user_id=?
                                                GROUP BY 	plant.plant_id
                                                ORDER BY 	plant.created DESC`, data);
        return rows;
    } catch (e) {
        console.error('getUsersAllPlants', e.message);
        next(httpError('Database error', 500));
    }
};

module.exports = {
    getAllPlants,
    getPlant,
    addPlant,
    updatePlant,
    deletePlant,
    getUsersAllPlants,
};