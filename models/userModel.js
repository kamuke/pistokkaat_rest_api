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
                                                            user.role
                                                FROM        user
                                                INNER JOIN  municipality 
                                                ON          user.municipality_id = municipality.municipality_id
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
                                                            user.password,
                                                            user.role
                                                FROM        user
                                                INNER JOIN  municipality 
                                                ON          user.municipality_id = municipality.municipality_id
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
        console.log(data);
        const [rows] = await promisePool.query(`INSERT INTO user(email, username, municipality_id, password) 
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
    getUserLogin,
};