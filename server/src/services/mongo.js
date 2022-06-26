//All things Mongoose

const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://nasa-space-explorer-api:HkeQH3AbMy9rJvSZ@nasa-space-explorer-clu.tofth.mongodb.net/NASA-Habitable-Planets?retryWrites=true&w=majority';

//test mongoose database connection
mongoose.connection.once('open', () => {
    console.log('connected to mongoDB instance');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect  
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
};
