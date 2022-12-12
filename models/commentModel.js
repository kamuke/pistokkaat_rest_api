// commentModel
'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

const getComments = async (data, next) => {
    try {
        const [rows] = await promisePool.query(`SELECT      comment.comment_id, 
                                                            comment.user_id,
                                                            user.username,
                                                            comment.created, 
                                                            comment.comment
                                                FROM        comment
                                                INNER JOIN  user
                                                ON          comment.user_id = user.user_id
                                                WHERE       comment.plant_id = ?
                                                ORDER BY    comment.created;`, data);
        return rows;
    } catch (e) {
        console.error('getComments', e.message);
        next(httpError('Virhe tietokannassa.', 500));
    }
};

const addComment = async (data, next) => {
    try {
        const [rows] = await promisePool.query(`INSERT INTO comment(comment, plant_id, user_id)
                                                VALUES(?, ?, ?);`, data);
        return rows;
    } catch (e) {
        console.error('addComment', e.message);
        next(httpError('Virhe tietokannassa.', 500));
    }
}

const deleteComment = async (data, user, next) => {
    try {
        let query;

        // If user.role === 0, can delete any comment
        if (user.role === 0) {
            query = `DELETE FROM comment WHERE comment_id=? AND plant_id=?`
        } else {
            query = `DELETE FROM comment WHERE comment_id=? AND plant_id=? AND user_id=?`
        }

        const [rows] = await promisePool.execute(query, data);

        return rows;
    } catch (e) {
        console.error('deleteComment', e.message);
        next(httpError('Virhe tietokannassa.', 500));
    }
}

module.exports = {
    getComments,
    addComment,
    deleteComment,
};