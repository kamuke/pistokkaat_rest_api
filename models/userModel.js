// userModel
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.query(`SELECT user_id, email, username, municipality, role
                                                FROM user;`);
        return rows;
    } catch (e) {
        console.error('getAllUsers', e.message);
    }
};

const getUser = async (userId) => {
    try {
        const [rows] = await promisePool.query(`SELECT user_id, email, username, municipality, role
                                                FROM user
                                                WHERE user_id=?;`, [userId]);
        return rows;
    } catch (e) {
        console.error('getUser', e.message);
    }
};

const addUser = async (data) => {
    try {
        const [rows] = await promisePool.query(`INSERT INTO user(email, username, password, municipality) 
                                                VALUES(?, ?, ?, ?);`, data);
        return rows;
    } catch (e) {
        console.error('addUser', e.message);
    }
};

const updateUser = async (data) => {
    try {
        const [rows] = await promisePool.execute(`UPDATE user 
                                                SET email = ?, username = ?, password = ?, municipality = ? 
                                                WHERE user_id = ?;`, data);
        return rows;
    } catch (e) {
        console.error('updateUser', e.message);
    }
};

const deleteUser = async (userId) => {
    try {
        const [rows] = await promisePool.execute(`DELETE FROM user WHERE user_id = ?;`, [userId]);
        return rows;
    } catch (e) {
        console.error('deleteUser', e.message);
    }
};

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
};