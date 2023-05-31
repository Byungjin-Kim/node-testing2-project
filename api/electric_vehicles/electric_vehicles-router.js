const router = require("express").Router();
const EC_Vehicles = require('./electric_vehicles-model');

router.get("/electric_vehicles", (req, res, next) => {
    EC_Vehicles.getAll()
        .then(elecCars => {
            res.status(200).json(elecCars);
        })
        .catch(next);
});

router.get("/electric_vehicles/:id", async (req, res, next) => {
    try {
        const elecCar = await EC_Vehicles.getById(req.params.id);
        if (!elecCar) {
            res.status(404).json({ message: 'Record not found' });
        } else {
            res.json(elecCar);
        }
    } catch (err) {
        next(err)
    }
});

router.post("/electric_vehicles", async (req, res) => {
    const newElectricCar = await EC_Vehicles.insert(req.body);
    res.json(newElectricCar);
});

router.delete("/electric_vehicles/:id", (req, res) => {
    res.end();
});

router.put("/electric_vehicles/:id", (req, res) => {
    res.end();
});

module.exports = router;

