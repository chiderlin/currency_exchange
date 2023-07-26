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

describe('GET /api/exchange', () => {
    it('responds with json', async function () {
        const response = await request(app)
            .get('/api/exchange?source=usd&target=jpy&amount=$1,525')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body.msg).toEqual('success');
        expect(response.body.amount).toEqual('$170,496.53');
    });

    it('return error message:"source required" ', async function () {
        const response = await request(app)
            .get('/api/exchange')
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        expect(response.body.msg).toEqual('error');
        expect(response.body.data).toEqual('source required.');
    });

    it('return error message:"target required." ', async function () {
        const response = await request(app)
            .get('/api/exchange?source=aaa')
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('error');
        expect(response.body.data).toBe('target required.');
    });

    it('return error message: "target required" ', async function () {
        const response = await request(app)
            .get('/api/exchange?source=usd')
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        expect(response.body.msg).toEqual('error');
        expect(response.body.data).toEqual('target required.');
    });

    it('return error message: "amount required"', async function () {
        const response = await request(app)
            .get('/api/exchange?source=usd&target=jpy')
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        expect(response.body.msg).toEqual('error');
        expect(response.body.data).toEqual('amount required.');
    });

    it('return error message: "source currency does not exist."', async function () {
        const response = await request(app)
            .get('/api/exchange?source=aaa&target=jpy&amount=$1,525')
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        expect(response.body.msg).toEqual('error');
        expect(response.body.data).toEqual('source currency does not exist.');
    });

    it('return error message: "target currency does not exist."', async function () {
        const response = await request(app)
            .get('/api/exchange?source=usd&target=aaa&amount=$1,525')
            .set('Accept', 'application/json');
        expect(response.status).toBe(400);
        expect(response.body.msg).toEqual('error');
        expect(response.body.data).toEqual('target currency does not exist.');
    });
});
