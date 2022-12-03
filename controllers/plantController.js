// plantController
'use strict';
const plantModel = require('../models/plantModel');

const plants = plantModel.plants; 

const plant_list_get = async (req, res) => {
    const plants = await plantModel.getAllPlants();
    res.json(plants);
};

const plant_get = (req, res) => {
    const plant = plants.filter(plant => plant.id === req.params.id);
    res.json(plant);
}

const plant_post = (req, res) => {
    console.log('plant_post req.body:', req.body);
    console.log('plant_post req.file:', req.file);
    res.send('Pistokkaan lisäys onnistui');
}

module.exports = {
    plant_list_get,
    plant_get,
    plant_post,
};