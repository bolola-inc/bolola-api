import { createResponse } from './utils';
import {
  queryStations,
  createStation,
  getSingleStation,
  updateStation,
  deleteStation,
} from 'services/stations';

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


