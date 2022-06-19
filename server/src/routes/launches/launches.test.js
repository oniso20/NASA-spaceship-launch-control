// rather that supertest as variable name we use - request 
const request = require('supertest');
const { response } = require('../../app');
const app = require('../../app')

describe('Test Get /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200)
    });
});

describe('Test POST /launch', () => {
    test('It should respond with 201 created', async () => {
        const response = await request(app)
            .post('/launches')
            .send({
                mission: 'Exploration X',
                rocket: 'IS1 50',
                target: 'kepler-442 b',
                launchDate: 'January 4, 2028',
            })
            .expect('Content-Type', /json/)
            .expect(201);   
            
            expect(response.body).toMatchObject({
                mission: 'Exploration X',
                rocket: 'IS1 50',
                target: 'kepler-442 b',
                launchDate: 'January 4, 2028',
            });
    });

    test('It should catch missing required properties', () => {});
    test('It should catch invalid dates', () => {});

})