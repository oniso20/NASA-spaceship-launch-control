//Setting up our Launch Endpoint 

//First get access to Express framework built in Router
const express = require('express');

//Define the rocket launches route
const {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch); //using :id to catch the id value

module.exports = launchesRouter;