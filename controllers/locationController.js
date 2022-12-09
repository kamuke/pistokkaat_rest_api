// locationController
'use strict';
const {getAllLocations} = require('../models/locationModel');
const {httpError} = require('../utils/errors');

const location_list_get = async (req, res, next) => {
    try {
        const result = await getAllLocations(next);

        if (result.length < 1) {
            next(httpError('No locations found', 404));
            return;
        }

        let locationsArray = [];

        // Loop result
        result.forEach(item => {
            // Find index of province from locationsArray, if not found returns -1
            const index = locationsArray.findIndex(location => location.province == item.province);

            // If index is -1, push province and municipality into locationsArray
            if (index == -1) {
                locationsArray.push({
                    province: item.province,
                    province_id: item.province_id,
                    municipalities: [{municipality: item.municipality, municipality_id: item.municipality_id}]
                });
            } else {
                // If index was found, push item's municipality into array's index's municipality
                locationsArray[index].municipalities.push({municipality: item.municipality, municipality_id: item.municipality_id});
            }
        });

        res.json(locationsArray);
    } catch (e) {
        console.error('location_list_get', e.message);
        next(httpError('Internal server error', 500));
    }
};

module.exports = {
    location_list_get,
};