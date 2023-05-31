const request = require('supertest');
const db = require('../../data/db-config');
const server = require('../server');

const Tesla_Model_3 = { vehicles_name: 'Tesla Model 3' };
const Hyundai_Ioniq_5 = { vehicles_name: 'Hyundai Ioniq 5' };
const Porsche_Taycan = { vehicles_name: 'Porsche Taycan' };

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


describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.NODE_ENV).toBe('testing');
    });

    describe('[GET] /', () => {
        it('should return 200 OK', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
        it('should return 200 OK using the squad', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });
    });
});

describe('[GET] /electric_vehicles', () => {
    it('responds with 200 OK', async () => {
        const res = await request(server).get('/api/electric_vehicles');
        expect(res.status).toBe(200);
    });
    it('responds with empty array if no electric vehicles', async () => {
        const res = await request(server).get('/api/electric_vehicles');
        expect(res.body).toHaveLength(0);
    });
    it('responds with electric_vehicles', async () => {
        await db('electric_vehicles').insert(Tesla_Model_3);
        let res = await request(server).get('/api/electric_vehicles');
        expect(res.body).toHaveLength(1);
        await db('electric_vehicles').insert(Hyundai_Ioniq_5);
        res = await request(server).get('/api/electric_vehicles');
        expect(res.body).toHaveLength(2);
        expect(res.body[0]).toMatchObject(Tesla_Model_3);
        expect(res.body[1]).toMatchObject(Hyundai_Ioniq_5);
    });
});

describe('[GET] /electric_vehicles/:id', () => {
    it('responds with the electric_vehicles with the given id', async () => {
        await db('electric_vehicles').insert(Tesla_Model_3);
        let res = await request(server).get('/api/electric_vehicles/1');
        expect(res.body).toMatchObject(Tesla_Model_3);
    });
    it('responds with a 404 if id not in db', async () => {
        const response = await request(server).get('/api/electric_vehicles/1');
        expect(response.status).toBe(404);
    });
});

describe('[POST] /electric_vehicles', () => {
    it('resturns the newly created electric vehicle', async () => {
        const res = await request(server).post('/api/electric_vehicles').send(Porsche_Taycan);
        expect(res.body.id).toBe(1);
        expect(res.body.vehicles_name).toBe('Porsche Taycan');
    });
});