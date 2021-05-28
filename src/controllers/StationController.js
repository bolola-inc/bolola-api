import { createResponse } from './utils';
import {
  queryStations,
  createStation,
  getSingleStation,
  updateStation,
  deleteStation,
} from 'services/stations';
const { sequelize } = require('../models/index');
const StationNames = sequelize.import('../models/StationNames');
const Stations = sequelize.import('../models/Stations');
const PlaceNames = sequelize.import('../models/PlaceNames');

export function list(req, res, next) {
  queryStations(req.query)
    .then((result) => {
      res.json(createResponse(result));
    }).catch(next);
}

export function getById(req, res, next) {
  getSingleStation(req.params.id)
    .then((deal) => {
      res.json(createResponse({ deal }));
    }).catch(next);
}

export function create(req, res, next) {
  createStation(req.user._id, {...req.body})
    .then((deal) => {
      res.status(201).json(createResponse({ deal }));
    }).catch(next);
}

export function update(req, res, next) {
  updateStation(req.params.id, req.body)
    .then((deal) => {
      res.json(createResponse({ deal }));
    }).catch(next);
}

export function destroy(req, res, next) {
  deleteStation(req.params.id)
    .then((deal) => {
      res.json(createResponse({ deal }));
    }).catch(next);
}

async function GetStation(req, res) {
    const { stations } = req.query;
    const stationIDs = stations.split(',');
    console.log("STATION IDs: ", stationIDs);

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
