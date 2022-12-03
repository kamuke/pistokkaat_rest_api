// catModel
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPlants = async () => {
    try {
        let [plants] = await promisePool.query(`SELECT 		plant.plant_id, 
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
                                                                user.municipality AS locations
                                                FROM 			plant
                                                INNER JOIN 	    user ON plant.user_id = user.user_id
                                                INNER JOIN 	    plantdelivery ON plant.plant_id = plantdelivery.plant_id
                                                LEFT JOIN 	    plantfavourites ON plant.plant_id = plantfavourites.plant_id
                                                GROUP BY 	    plant.plant_id
                                                ORDER BY 	    plant.created DESC;`);

        // Iterate plants and return edited plant: 
        // split delivery to array and add seller object to single plant
        plants = plants.map(plant => {
            plant.delivery = plant.delivery.split(',');

            let user = {
                userId: plant.user_id,
                username: plant.username,
                email: plant.email,
                location: plant.location
            };

            delete plant.user_id;
            delete plant.username;
            delete plant.email;
            delete plant.location;

            plant.seller = user;

            return plant;
        });

        console.log('getAllPlants', plants);
        return plants;
    } catch (e) {
        console.error('getAllPlants', e.message);
    }
};

module.exports = {
    getAllPlants,
};