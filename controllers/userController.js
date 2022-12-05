// userController
'use strict';
const {getAllUsers, getUser, addUser, updateUser, deleteUser} = require('../models/userModel');

const user_list_get = async (req, res) => {
    try {
        const result = await getAllUsers();

        if (result.length < 1) {
            console.error('Yhtäkään käyttäjää ei löytynyt.');
            return;
        }

        res.json(result);
    } catch (e) {
        console.error('user_list_get', e.message);
    }
};

const user_get = async (req, res) => {
    try {
        const result = await getUser(req.params.id);

        if (result.length < 1) {
            console.error('Käyttäjää ei löytynyt.');
            return;
        }

        res.json(result.pop());
    } catch (e) {
        console.error('user_get', e.message);
    }
};

const user_post = async (req, res) => {
    try {
        const data = [
            req.body.email,
            req.body.username,
            req.body.password,
            req.body.municipality
        ];

        if (result.affectedRows < 1) {
            console.error('Virheellistä tietoa.');
            return;
        }

        res.json({
            message: 'Käyttäjä lisätty.',
            user_id: result.insertId
        });
    } catch (e) {
        console.error('user_post', e.message);
    }
};

const user_put = async (req, res) => {
    try {
        const data = [
            req.body.email,
            req.body.username,
            req.body.password,
            req.body.municipality,
            req.body.id
        ];

        const result = await updateUser(data);

        if (result.affectedRows < 1) {
            console.error('Virheellistä tietoa.');
            return;
        }

        res.json({message: 'Käyttäjää muokattu.',});
    } catch (e) {
        console.error('user_put', e.message);
    }
};

const user_delete = async (req, res) => {
    try {
        const result = await deleteUser(req.params.id);

        console.log(result);

        if (result.affectedRows < 1) {
            console.error('Käyttäjää ei poistettu.');
            return;
        }

        res.json({message: 'Käyttäjä poistettu.',});
    } catch (e) {
        console.error('user_delete', e.message);
    }
};

module.exports = {
    user_list_get,
    user_get,
    user_post,
    user_put,
    user_delete,
};