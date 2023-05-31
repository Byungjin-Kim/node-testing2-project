const EC_Vehicles = require('./electric_vehicles-model');
const db = require('../../data/db-config');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeEach(async () => {
    await db('electric_vehicles').truncate();
});
afterAll(async () => {
    await db.destroy();
});


describe('electric_vehicles model', () => {
    describe('insert()', () => {
        it('inserts provided electric_vehicle into db', async () => {
            await EC_Vehicles.insert({ vehicles_name: 'Ford F-150 Electric' });
            let insert = await EC_Vehicles.getAll();
            expect(insert).toHaveLength(1);

            await EC_Vehicles.insert({ vehicles_name: 'Rivian R1T' });
            let insert2 = await EC_Vehicles.getAll();
            expect(insert2).toHaveLength(2);
        });

        it('gives back the inserted EC_Vehicle', async () => {
            let insert = await EC_Vehicles.insert({ vehicles_name: 'Ford F-150 Electric' });
            expect(insert).toMatchObject({ id: 1, vehicles_name: 'Ford F-150 Electric' });
            let insert2 = await EC_Vehicles.insert({ vehicles_name: 'Rivian R1T' });
            expect(insert2).toMatchObject({ id: 2, vehicles_name: 'Rivian R1T' });
        });
    });

    describe('update()', () => {
        it('updates the EC_Vehicle', async () => {
            await EC_Vehicles.insert({ vehicles_name: 'Ford F-150' });
            const updated = await EC_Vehicles.update(1, { vehicles_name: 'Ford F-150 Electric' });
            expect(updated).toMatchObject({ id: 1, vehicles_name: 'Ford F-150 Electric' });
        });
    });

    describe('remove()', () => {
        it('deletes the EC_Vehicle', async () => {
            await EC_Vehicles.insert({ vehicles_name: 'Ford F-150 Electric' });
            await EC_Vehicles.insert({ vehicles_name: 'Rivian R1T' });
            await EC_Vehicles.remove(1);
            const elecVehicles = await db('electric_vehicles');
            expect(elecVehicles).toHaveLength(1);
        });
    });

    describe('getAll()', () => {
        it('gets empty list when no elecVehicles in db', async () => {
            const elecVehicles = await EC_Vehicles.getAll();
            expect(elecVehicles).toHaveLength(0);
        });

        it('can get a list with all elecVehicles in db', async () => {
            await db('electric_vehicles').insert({ vehicles_name: 'Rivian R1T' });
            let elecVehicles = await EC_Vehicles.getAll();
            expect(elecVehicles).toHaveLength(1);
            await db('electric_vehicles').insert({ vehicles_name: 'Ford F-150 Electric' });
            elecVehicles = await EC_Vehicles.getAll();
            expect(elecVehicles).toHaveLength(2);
        });
    });

    describe('getById()', () => {
        it('can find a elecVehicle by id', async () => {
            await db('electric_vehicles').insert({ vehicles_name: 'Ford F-150 Electric' });
            await db('electric_vehicles').insert({ vehicles_name: 'Rivian R1T' });
            const Ford_F_150_Electric = await EC_Vehicles.getById(1);
            const Rivian_R1T = await EC_Vehicles.getById(2);
            expect(Ford_F_150_Electric).toMatchObject({ id: 1, vehicles_name: 'Ford F-150 Electric' });
            expect(Rivian_R1T).toMatchObject({ id: 2, vehicles_name: 'Rivian R1T' });
        });
    });
});