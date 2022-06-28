const axios = require('axios');

const launchesDataBase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

//On the left is were to locate the launch data on the API 
const launch = {
    flightNumber: 100,  //Starts the flight number count from 100//flight number
    mission: 'Kepler Exploration X', //name on the database
    rocket: 'Explore IS1', //rocket.name 
    launchDate: new Date('December 27, 2030'), // local
    target: 'Kepler-442 b',
    customers: ['NASA', 'USA-Army'], //payload.customers for each payload
    upcoming: true, //upcoming
    success: true   //success
}

saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

console.log('abc')

async function loadLaunchData() {
    console.log('Downloading launch data...');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        option: {
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                },
            ]
        }
    });

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: customers,
        };

        console.log(`${launch.flightNumber} ${launch.mission}`);
    }
}

async function existsLaunchWithId(launchId) {
    return await launchesDataBase.findOne({
        flightNumber: launchId,
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDataBase
        .findOne({})
        //SOrt in descending order
        .sort('-flightNumber');

        if (!latestLaunch) {
            return DEFAULT_FLIGHT_NUMBER;
        }
    
        return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return await launchesDataBase.find({}, {
        '_id': 0,
        '__v': 0,
    });
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planet found');
    }

    await launchesDataBase.findOneAndUpdate({
        //Check the flightNumber if it exists already
        flightNumber: launch.flightNumber,
    },
    launch, {
        upsert: true,  
    });
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['SpaceX', 'OnisXPO', 'NASA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
    const aborted = await launchesDataBase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifiedCount === 1;;
}

module.exports = {
    loadLaunchData,
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
}