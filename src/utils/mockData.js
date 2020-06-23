const { sequelize } = require('../models/index');
const RouteStations = sequelize.import('../models/RouteStations.js');
const Stations = sequelize.import('../models/Stations.js');
const StationNames = sequelize.import('../models/StationNames.js');
const PlaceNames = sequelize.import('../models/PlaceNames.js');
const n = 4; // Number of Stations
const MOCK_DATE = {
    createdAt: '2000-11-11',
    updatedAt: '2001-11-11',
    deletedAt: '2002-11-11'
};
const rand = (min, max) => Math.floor(Math.random() * (max-min)) + min;
const randf = (min, max) => Math.random() * (max-min) + min;
const randString = (len) => Buffer(len).map(e => rand(97, 123)) + '';
const stations = [
    {
        lat: 40.18782816,
        long: 44.51490641
    },
    {
        lat: 40.19118438,
        long: 44.5114249
    },
    {
        lat: 40.19220474,
        long: 44.5052129
    },
    {
        lat: 40.1928276,
        long: 44.49954271
    }
    ,
    {
        lat: 40.19634339,
        long: 44.49405491
    },
    {
        lat: 40.1996869,
        long: 44.49400127
    },
    {
        lat: 40.20155116,
        long: 44.49603438
    },
    {
        lat: 40.20284997,
        long: 44.49923158
    },
    {
        lat: 40.20437409,
        long: 44.50297058
    },
    {
        lat: 40.20558271,
        long: 44.50599611
    },
    {
        lat: 40.20679951,
        long: 44.51081872
    },
    {
        lat: 40.20656189,
        long: 44.5150727
    },
    {
        lat: 40.20634885,
        long: 44.5188868
    },
    {
        lat: 40.20615219,
        long: 44.52270091
    },
    {
        lat: 40.20796302,
        long: 44.52844083
    },
    {
        lat: 40.21136331,
        long: 44.53231931
    },
    {
        lat: 40.207074,
        long: 44.5284301
    },
    {
        lat: 40.20390293,
        long: 44.52933669
    },
    {
        lat: 40.20182977,
        long: 44.53305155
    },
    {
        lat: 40.19940008,
        long: 44.5375067
    },
    {
        lat: 40.20056372,
        long: 44.54155147
    },
    {
        lat: 40.20278851,
        long: 44.54668522
    },
    {
        lat: 40.20423889,
        long: 44.55059052
    },
    {
        lat: 40.2093928,
        long: 44.5606032
    },
    {
        lat: 40.21363281,
        long: 44.5623976
    },
    {
        lat: 40.21859758,
        long: 44.56158221
    },
    {
        lat: 40.21949464,
        long: 44.5645541
    },
    {
        lat: 40.21993703,
        long: 44.56730604
    },
    {
        lat: 40.21959705,
        long: 44.56903338
    },
    {
        lat: 40.21960524,
        long: 44.57175851
    },
    {
        lat: 40.22021966,
        long: 44.57442462
    },
    {
        lat: 40.22039169,
        long: 44.57787126
    },
    {
        lat: 40.22055963,
        long: 44.58129644
    },
    {
        lat: 40.21801182,
        long: 44.58249807
    },
    {
        lat: 40.21775376,
        long: 44.58247125
    },
    {
        lat: 40.21741787,
        long: 44.58477259
    },
    /*
    {
        lat: 40.21474295,
        long: 44.58577573
    },
    {
        lat: 40.21392776,
        long: 44.58512664
    },
    {
        lat: 40.21332967,
        long: 44.58435953
    },
    {
        lat: 40.21157224,
        long: 44.58145201
    },
    {
        lat: 40.21045795,
        long: 44.57819849
    },
    {
        lat: 40.21132235,
        long: 44.57492888
    },
    {
        lat: 40.21172381,
        long: 44.57391769
    }
     */
]
async function mockStations() {
    await Stations.destroy({ where: {}, truncate: true });
    await RouteStations.destroy({ where: {}, truncate: true });
    for (let i = 1; i < stations.length; i++) {
        try {
            await Stations.create({
                id: i,
                ...stations[i],
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
    await PlaceNames.destroy({ where: {}, truncate: true });
    await StationNames.destroy({ where: {}, truncate: true });
    for (let i = 1; i < stations.length; i++) {
        try {
            await PlaceNames.create({
                id: i,
                name: `route ${i}`,
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
