const { sequelize } = require('../models/index');
const RouteStations = sequelize.import('../models/RouteStations.js');
const Stations = sequelize.import('../models/Stations.js');
const StationNames = sequelize.import('../models/StationNames.js');
const PlaceNames = sequelize.import('../models/PlaceNames.js');

const n = 15; // Number of Stations
const MOCK_DATE = {
    createdAt: '2000-11-11',
    updatedAt: '2001-11-11',
    deletedAt: '2002-11-11'
};

const rand = (min, max) => Math.floor(Math.random() * (max-min)) + min;
const randString = (len) => Buffer(len).map(e => rand(97, 123)) + '';

async function mockStations() {
    await Stations.destroy({ where: {}, truncate: true });
    await RouteStations.destroy({ where: {}, truncate: true });

    for (let i = 1; i <= n; i++) {
        try {
            await Stations.create({
                id: i,
                long: rand(2,15),
                lat: rand(2,15),
                ...MOCK_DATE
            });

            await RouteStations.create({
                routeId: rand(0, 3),
                stationId: i,
                price: 100,
                order: 0,
                ...MOCK_DATE
            });
        }
        catch (e) { console.warn("ID: " + i, e); }
    }
}

async function mockNames() {
    const name_length = 10;

    await PlaceNames.destroy({ where: {}, truncate: true });
    await StationNames.destroy({ where: {}, truncate: true });

    for (let i = 1; i <= n; i++) {
        try {
            let random_name = randString(name_length);

            await PlaceNames.create({
                id: i,
                name: random_name,
                ...MOCK_DATE
            });

            await StationNames.create({
                stationId: i,
                placeNamesId: i,
                ...MOCK_DATE
            });
        }
        catch (e) { console.warn(e); }
    }
}

mockStations();
mockNames();
