const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api')

const app = express();

//Security middleware
app.use(cors({
    origin: 'http://localhost:3000',
}));

//login middleware - morgan
app.use(morgan('combined'));

//Other middleware
app.use(express.json());
//serving the client side with express.static()
app.use(express.static(path.join(__dirname, "..", "public")));

//Route and api version
app.use('/v1' ,api);

//Front End/ getting the launch page from the root route
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

module.exports = app;