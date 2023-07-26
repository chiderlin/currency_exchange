const request = require('supertest');
const app = require('./app');
// error:thrown: "Exceeded timeout of 5000 ms for a test.
// -> solve: module.exports之前接錯，接到router

describe('GET /', () => {
    it('responds with json', async function () {
        const response = await request(app)
            .get('/')
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.body.status).toEqual('ok');
    });
});
