const db = require('../../data/db-config');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    getById,
};

async function insert(electric_vehicle) {
    const [id] = await db('electric_vehicles').insert(electric_vehicle);
    return db('electric_vehicles').where({ id }).first();
}

async function update(id, changes) {
    await db('electric_vehicles').where({ id }).update(changes);
    return db('electric_vehicles').where({ id }).first();
}

function remove(id) {
    return db('electric_vehicles').where({ id }).delete();
}

function getAll() {
    return db('electric_vehicles');
}

function getById(id) {
    return db('electric_vehicles').where({ id }).first();
}