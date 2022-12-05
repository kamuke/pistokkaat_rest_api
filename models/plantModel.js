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
                                                            GROUP_CONCAT(DISTINCT plantdelivery.delivery ORDER BY plantdelivery.delivery ASC) AS delivery, 
                                                            COUNT(plantfavourites.plant_id) AS favourites, 
                                                            plant.created, 
                                                            plant.edited, 
                                                            user.user_id, 
                                                            user.username, 
                                                            user.email, 
                                                            user.municipality AS location,
                                                            COUNT(userlikes.liked) AS likes
                                                FROM 		plant
                                                INNER JOIN 	user ON plant.user_id = user.user_id
                                                INNER JOIN 	plantdelivery ON plant.plant_id = plantdelivery.plant_id
                                                LEFT JOIN 	plantfavourites ON plant.plant_id = plantfavourites.plant_id
                                                LEFT JOIN 	userlikes ON user.user_id = userlikes.liked
                                                GROUP BY 	plant.plant_id
                                                ORDER BY 	plant.created DESC;`);
        return rows;
    } catch (e) {
        console.error('getAllPlants', e.message);
        next(httpError('Database error', 500));
    }
};

const getPlant = async (plantId, next) => {
    try {
        const [rows] = await promisePool.query(`SELECT        plant.plant_id, 
                                                            plant.name, 
                                                            plant.price, 
                                                            plant.description, 
                                                            plant.instruction, 
                                                            plant.imagename, 
                                                            GROUP_CONCAT(DISTINCT plantdelivery.delivery ORDER BY plantdelivery.delivery ASC) AS delivery, 
                                                            COUNT(plantfavourites.plant_id) AS favourites, 
                                                            plant.created, 
                                                            plant.edited, 
                                                            user.user_id, 
                                                            user.username, 
                                                            user.email, 
                                                            user.municipality AS location,
                                                            COUNT(userlikes.liked) AS likes
                                                FROM 		plant
                                                INNER JOIN 	user ON plant.user_id = user.user_id
                                                INNER JOIN 	plantdelivery ON plant.plant_id = plantdelivery.plant_id
                                                LEFT JOIN 	plantfavourites ON plant.plant_id = plantfavourites.plant_id
                                                LEFT JOIN 	userlikes ON user.user_id = userlikes.liked
                                                GROUP BY 	plant.plant_id
                                                HAVING 	 	plant.plant_id = ?;`, [plantId]);
        return rows;
    } catch (e) {
        console.error('getPlant', e.message);
        next(httpError('Database error', 500));
    }
};

// TODO: Only logged users can add plants
const addPlant = async(data, delivery, next) => {
    const connection = await promisePool.getConnection();
    let firstQueryRows = [];

    try {
        const firstQuery = `INSERT INTO plant(name, price, imagename, description, instruction, user_id) 
                   VALUES(?, ?, ?, ?, ?, ?);`;

        let secondQuery = `INSERT INTO plantdelivery(plant_id, delivery) VALUES(LAST_INSERT_ID(), ?)`;

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

// TODO: users can only update own plants, except admins.
const updatePlant = async (data, delivery, next) => {
    const connection = await promisePool.getConnection();
    let firstQueryRows = [];

    try {
        const firstQuery = `UPDATE plant SET name=?, price=?, description=?, instruction=?, edited=NOW()
                          WHERE plant_id=?;`;

        const secondQuery = `DELETE FROM plantdelivery WHERE plant_id=?`;

        // If delivery has more than two values, add one more insert
        let thirdQuery = `INSERT INTO plantdelivery(plant_id, delivery) VALUES(?, ?)`;

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

// TODO: users can only delete own plants, except admins.
const deletePlant = async (plantId, next) => {
    try {
        const [rows] = await promisePool.execute(`DELETE FROM plant WHERE plant_id=?`, [plantId]);
        return rows;
    } catch (e) {
        console.error('deletePlant', e.message);
        next(httpError('Database error', 500));
    }
};

module.exports = {
    getAllPlants,
    getPlant,
    addPlant,
    updatePlant,
    deletePlant,
};