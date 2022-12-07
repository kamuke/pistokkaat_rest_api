// userModel
'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

const getAllUsers = async (next) => {
    try {
        const [rows] = await promisePool.query(`SELECT user.user_id, user.email, user.username, municipality.name as location, COUNT(userlikes.liked_id) AS likes, user.role
                                                FROM user
                                                INNER JOIN municipality ON user.municipality_id = municipality.municipality_id
                                                LEFT JOIN userlikes ON user.user_id = userlikes.liked_id
                                                GROUP BY user.user_id;`);
        return rows;
    } catch (e) {
        console.error('getAllUsers', e.message);
        next(httpError('Database error', 500));
    }
};

const getUser = async (userId, next) => {
    try {
        const [rows] = await promisePool.query(`SELECT user.user_id, user.email, user.username, municipality.name as location, COUNT(userlikes.liked_id) AS likes, user.role
                                                FROM user
                                                INNER JOIN municipality ON user.municipality_id = municipality.municipality_id
                                                LEFT JOIN userlikes ON user.user_id = userlikes.liked_id
                                                GROUP BY user.user_id     
                                                HAVING user_id=?;`, [userId]);
        return rows;
    } catch (e) {
        console.error('getUser', e.message);
        next(httpError('Database error', 500));
    }
};

const addUser = async (data, next) => {
    try {
        const [rows] = await promisePool.query(`INSERT INTO user(email, username, password, municipality_id) 
                                                VALUES(?, ?, ?, ?);`, data);
        return rows;
    } catch (e) {
        console.error('addUser', e.message);
        next(httpError('Database error', 500));
    }
};

const updateUser = async (data, next) => {
    try {
        const [rows] = await promisePool.execute(`UPDATE user 
                                                SET email = ?, username = ?, password = ?, municipality_id = ? 
                                                WHERE user_id = ?;`, data);
        return rows;
    } catch (e) {
        console.error('updateUser', e.message);
        next(httpError('Database error', 500));
    }
};

const deleteUser = async (userId, next) => {
    try {
        const [rows] = await promisePool.execute(`DELETE FROM user WHERE user_id = ?;`, [userId]);
        return rows;
    } catch (e) {
        console.error('deleteUser', e.message);
        next(httpError('Database error', 500));
    }
};

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
};