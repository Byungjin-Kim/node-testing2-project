const express = require('express');
const EC_Vehicles = require('./electric_vehicles/electric_vehicles-model');
const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.get("/electric_vehicles", (req, res) => {
    EC_Vehicles.getAll()
        .then(eleCars => {
            res.status(200).json(eleCars);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

server.get("/electric_vehicles/:id", async (req, res) => {
    const hobbit = await EC_Vehicles.getById(req.params.id);
    if (!hobbit) {
        res.status(404).end();
    } else {
        res.json(hobbit);
    }
});

server.post("/electric_vehicles", async (req, res) => {
    const newElectricCar = await EC_Vehicles.insert(req.body);
    res.json(newElectricCar);
});

server.delete("/electric_vehicles/:id", (req, res) => {
    res.end();
});

server.put("/electric_vehicles/:id", (req, res) => {
    res.end();
});

module.exports = server;