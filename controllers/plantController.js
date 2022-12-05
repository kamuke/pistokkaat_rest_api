// plantController
'use strict';
const {getAllPlants, getPlant, deletePlant, addPlant, updatePlant}= require('../models/plantModel');

const plant_list_get = async (req, res) => {
    try {
        let result = await getAllPlants();

        if (result.length < 1) {
            console.error('Yhtäkään pistokasta ei löytynyt.');
            return;
        }

        // Iterate and return edited item: 
        // split delivery to array and add seller object to single item
        result = result.map(item => {
            item.delivery = item.delivery.split(',');

            let user = {
                user_id: item.user_id,
                username: item.username,
                email: item.email,
                location: item.location,
                likes: item.likes
            };

            delete item.user_id;
            delete item.username;
            delete item.email;
            delete item.location;
            delete item.likes;

            item.seller = user;

            return item;
        });

        res.json(result);
    } catch (e) {
        console.error('plant_list_get', e.message);
    }
};

const plant_get = async (req, res) => {
    try {
        let result = await getPlant(req.params.id);

        if (result.length < 1) {
            console.error('Pistokasta ei löytynyt.');
            return;
        }

        // Iterate and return edited item: 
        // split delivery to array and add seller object to single item
        result = result.map(item => {
            item.delivery = item.delivery.split(',');

            let user = {
                user_id: item.user_id,
                username: item.username,
                email: item.email,
                location: item.location,
                likes: item.likes
            };

            delete item.user_id;
            delete item.username;
            delete item.email;
            delete item.location;
            delete item.likes;

            item.seller = user;

            return item;
        });

        res.json(result.pop());
    } catch (e) {
        console.error('plant_get', e.message);
    }
};

// TODO: should receive deliverys as an array from front
// have to change in front side so that the form posts delivery input as array? Maybe? not sure 
const plant_post = async (req, res) => {
    try {
        const data = [
            req.body.name,
            req.body.price,
            req.file.filename,
            req.body.description,
            req.body.instruction,
            req.body.seller
        ]

        const delivery = req.body.delivery.split(', ');

        const result = await addPlant(data, delivery);

        if (result.length < 1) {
            console.error('Virheellistä tietoa.');
            return;
        }

        res.json({
            message: 'Pistokas lisätty.',
            plant_id: result[0].insertId,
        });
    } catch (e) {
        console.error('plant_post', e.message);
    }
};

const plant_put = async (req, res) => {
    try {
        const data = [
            req.body.name,
            req.body.price,
            req.body.description,
            req.body.instruction,
            req.body.id
        ];

        const delivery = req.body.delivery.split(', ');
        delivery.splice(0, 0, req.body.id); // Delivery also needs plant's id to insert data

        // If there is more than one delivery option, add another plant's id
        if (delivery.length > 2) {
            delivery.splice(2, 0, req.body.id);
        }
  
        const result = await updatePlant(data, delivery);

        if (result[0].affectedRows < 1) {
            console.error('Virheellistä tietoa.');
            return;
        }
  
        res.json({message: 'Pistokasta muokattu.',});
    } catch (e) {
        console.error('plant_put', e.message);
    }
};

const plant_delete = async (req, res) => {
    try {
        const result = await deletePlant(req.params.id);
  
        if (result.affectedRows < 1) {
            console.error('Pistokasta ei poistettu.')
            return;
        }
  
        res.json({message: 'Pistokas poistettu.',});
    } catch (e) {
        console.error('plant_delete', e.message);
    }
};

module.exports = {
    plant_list_get,
    plant_get,
    plant_post,
    plant_put,
    plant_delete,
};