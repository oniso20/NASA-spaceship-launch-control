const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-space-explorer-api:HkeQH3AbMy9rJvSZ@nasa-space-explorer-clu.tofth.mongodb.net/?retryWrites=true&w=majority';

const server = http.createServer(app);

//test mongoose database connection
mongoose.connection.once('open', () => {
    console.log('connected to mongoDB instance');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function startServer() {
    await mongoose.connect(MONGO_URL);

    //Load planets data
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    });
}

startServer();
// ....