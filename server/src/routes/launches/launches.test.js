// rather that supertest as variable name we use - request 
const request = require('supertest');
const { response } = require('../../app');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Test Get /launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type', /json/)
            .expect(200)
        });
    });
    
    describe('Test POST /launch', () => {
        const completeLaunchData = {
            mission: 'Exploration X',
            rocket: 'IS1 50',
            target: 'Kepler-62 f',
            launchDate: 'January 4, 2028',
        };
    
        const launchDataWithoutDate = {
            mission: 'Exploration X',
            rocket: 'IS1 50',
            target: 'Kepler-62 f',
        }
    
        const launchDataWithInvalidDate = {
            mission: 'Exploration X',
            rocket: 'IS1 50',
            target: 'Kepler-62 f',
            launchDate: 'zoom',
        }
    
    
        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);
                
                const requestDate = new Date(completeLaunchData.launchDate).valueOf();
                const responseDate = new Date(response.body.launchDate).valueOf();
                expect(responseDate).toBe(requestDate);
    
                expect(response.body).toMatchObject(launchDataWithoutDate);
        });
    
        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Missing key launch property', 
             });
        });
    
    
        test('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Invalid launch date', 
             });
        });
    
    })
});

