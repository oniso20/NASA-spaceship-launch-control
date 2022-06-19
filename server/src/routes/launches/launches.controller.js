const {
    addNewLaunch, 
    getAllLaunches,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
};

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    //check if all launch data are inputted correctly
    if ( !launch.mission || !launch.rocket || !launch.launchDate || !launch.target ) {
        return res.status(400).json({
           error: 'Missing key launch property', 
        })
    }

    launch.launchDate = new Date(launch.launchDate);

    //check if a date is really entered
    if ( isNaN(launch.launchDate) ) {
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
};

function httpAbortLaunch(req, res) {
    const launchId = req.params.id;

    //if launch doesn't exist
    if ( !existsLaunchWithId(launchId) ){
        return res.status(404).json({
            error: 'Launch not found'
        });
    }

    //if launch does exist
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};