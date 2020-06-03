const { sequelize } = require('../models/index');
const StationNames = sequelize.import('../models/StationNames');
const Stations = sequelize.import('../models/Stations');
const PlaceNames = sequelize.import('../models/PlaceNames');

async function GetStation(req, res) {
    const { stations } = req.query;
    const stationIDs = stations.split(',');

    const output = [];

    for (let station of stationIDs) {
        const place_id = await StationNames.findAll({ attributes: ['placeNamesId'], where: { stationId: station }, plain: true });
        const { placeNamesId } = place_id;

        const place_name = await PlaceNames.findAll({ attributes: ['name'], where: { id: placeNamesId }, plain: true });
        const title = place_name.name;

        const _coords = await Stations.findAll({ attributes: ['long', 'lat'], where: { id: station }, plain: true });
        const coordinate = {
            latitude: _coords.dataValues.lat,
            longitude: _coords.dataValues.long,
        };

        output.push({
            coordinate: coordinate,
            name: station,
            title: title,
        });
    }

    res.send(output);
}

module.exports = {
    GetStation
};