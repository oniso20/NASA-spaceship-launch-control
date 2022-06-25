// const launches = require('./launches.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,  //Starts the flight number count from 100
    mission: 'Kepler Exploration X',
    rocket: 'Explore IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'kepler-442 b',
    customers: ['NASA', 'USA-Army'],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        launch.flightNumber, 
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ['SpaceX', 'OnisXPO', 'NASA'],
            flightNumber: latestFlightNumber,
         })
    );
}

function abortLaunchById(launchId) {
   const aborted = launches.get(launchId); 
   aborted.upcoming = false;
   aborted.success = false;
   return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
}