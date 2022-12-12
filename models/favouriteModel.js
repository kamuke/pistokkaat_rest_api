// favouriteModel
'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

const getFavourites = async (data, next) => {
    try {
        const [rows] = await promisePool.query(`SELECT 	    plant.plant_id,
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
                                                                SELECT COUNT(plantfavourites.plant_id) 
                                                                FROM plantfavourites 
                                                                WHERE plantfavourites.plant_id = plant.plant_id
                                                            ) AS favourites,
                                                            plant.created,
                                                            plant.edited,
                                                            user.user_id, 
                                                            user.username, 
                                                            user.email, 
                                                            municipality.name AS location
                                              FROM          plantfavourites
                                              INNER JOIN    plant ON plantfavourites.plant_id = plant.plant_id
                                              INNER JOIN 	user ON plant.user_id = user.user_id
                                              INNER JOIN 	municipality ON user.municipality_id = municipality.municipality_id
                                              INNER JOIN 	plantdelivery ON plant.plant_id = plantdelivery.plant_id
                                              INNER JOIN 	delivery ON plantdelivery.delivery_id = delivery.delivery_id
                                              WHERE         plantfavourites.user_id = ?
                                              GROUP BY      plant.plant_id
                                              ORDER BY      plant.created;`, data);
        return rows;
    } catch (e) {
        console.error('getFavourites', e.message);
        next(httpError('Virhe tietokannassa.', 500));
    }
};

const addFavourite = async (data, next) => {
    try {
        const [rows] = await promisePool.query(`INSERT INTO plantfavourites(user_id, plant_id) VALUES(?, ?);`, data);
        return rows;
    } catch (e) {
        console.error('addFavourite', e.message);
        next(httpError('Virhe tietokannassa.', 500));
    }
};

const deleteFavourite = async (data, next) => {
    try {
        const [rows] = await promisePool.execute(`DELETE FROM plantfavourites WHERE user_id=? AND plant_id=?;`, data);
        return rows;
    } catch (e) {
        console.error('deleteFavourite', e.message);
        next(httpError('Virhe tietokannassa.', 500));
    }
};

module.exports = {
    getFavourites,
    addFavourite,
    deleteFavourite,
};