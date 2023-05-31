const express = require('express');
const ecVehiclesRouter = require('./electric_vehicles/electric_vehicles-router')
const server = express();

server.use(express.json());

server.use('/api', ecVehiclesRouter);

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = server;
