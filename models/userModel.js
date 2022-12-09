// userModel
'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

const getAllUsers = async (next) => {
    try {
        const [rows] = await promisePool.query(`SELECT      user.user_id, 
                                                            user.email, 
                                                            user.username, 
                                                            municipality.name as location, 
                                                            COUNT(userlikes.liked_id) AS likes, 
                                                            user.role
                                                FROM        user
                                                INNER JOIN  municipality 
                                                ON          user.municipality_id = municipality.municipality_id
                                                LEFT JOIN   userlikes 
                                                ON          user.user_id = userlikes.liked_id
                                                GROUP BY    user.user_id;`);
        return rows;
    } catch (e) {
        console.error('getAllUsers', e.message);
        next(httpError('Database error', 500));
    }
};

const getUser = async (data, next) => {
    try {
        const [rows] = await promisePool.query(`SELECT      user.user_id, 
                                                            user.email, 
                                                            user.username, 
                                                            municipality.name as location, 
                                                            COUNT(userlikes.liked_id) AS likes,
                                                            user.password,
                                                            user.role
                                                FROM        user
                                                INNER JOIN  municipality 
                                                ON          user.municipality_id = municipality.municipality_id
                                                LEFT JOIN   userlikes 
                                                ON          user.user_id = userlikes.liked_id
                                                GROUP BY    user.user_id     
                                                HAVING      user_id=?;`, 
                                                data);
        return rows.pop();
    } catch (e) {
        console.error('getUser', e.message);
        // next error handlign might not work with pass.js
        // next(httpError('Database error', 500));
    }
};

const addUser = async (data, next) => {
    try {
        const [rows] = await promisePool.query(`INSERT INTO user(email, username, municipality_id, password,) 
                                                VALUES(?, ?, ?, ?);`, data);
        return rows;
    } catch (e) {
        console.error('addUser', e.message);
        next(httpError('Database error', 500));
    }
};

const updateUser = async (data, next) => {
    try {
        let query = `UPDATE user 
                     SET    email = ?, 
                            username = ?, 
                            municipality_id = ?
                     WHERE  user_id = ?;`

        if (data.length > 4) {
            query = `UPDATE user 
                     SET    email = ?, 
                            username = ?, 
                            municipality_id = ?, 
                            password = ?
                     WHERE  user_id = ?;`
        }

        const [rows] = await promisePool.execute(query, data);
        return rows;
    } catch (e) {
        console.error('updateUser', e.message);
        next(httpError('Database error', 500));
    }
};

const deleteUser = async (data, next) => {
    try {
        const [rows] = await promisePool.execute(`DELETE FROM user WHERE user_id = ?;`, data);
        return rows;
    } catch (e) {
        console.error('deleteUser', e.message);
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
                                                            GROUP_CONCAT(DISTINCT delivery.name ORDER BY delivery.name ASC) AS delivery,
                                                            COUNT(plantfavourites.plant_id) AS favourites, 
                                                            plant.created, 
                                                            plant.edited, 
                                                            user.user_id, 
                                                            user.username, 
                                                            user.email, 
                                                            municipality.name AS location,
                                                            COUNT(userlikes.liked_id) AS likes
                                                FROM 		plant
                                                INNER JOIN 	user ON plant.user_id = user.user_id
                                                INNER JOIN 	municipality ON user.municipality_id = municipality.municipality_id
                                                INNER JOIN 	plantdelivery ON plant.plant_id = plantdelivery.plant_id
                                                INNER JOIN 	delivery ON plantdelivery.delivery_id = delivery.delivery_id
                                                LEFT JOIN 	plantfavourites ON plant.plant_id = plantfavourites.plant_id
                                                LEFT JOIN 	userlikes ON user.user_id = userlikes.liked_id
                                                GROUP BY 	plant.plant_id
                                                HAVING 		user.user_id=?
                                                ORDER BY 	plant.created DESC;`, data);
        return rows;
    } catch (e) {
        console.error('getUsersAllPlants', e.message);
        next(httpError('Database error', 500));
    }
};

const getUserLogin = async (data, next) => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM user WHERE email = ?;', data);
        return rows;
    } catch (e) {
        console.error('getUserLogin', e.message);
        next(httpError('Database error', 500));
    }
  };

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getUsersAllPlants,
    getUserLogin,
};