const request = require('supertest');
const app = require('./routes');
// error:thrown: "Exceeded timeout of 5000 ms for a test.

// afterEach(() => {
//     jest.useRealTimers();
// });
// jest.useRealTimers();

describe('GET /', () => {
    // it(
    //     'return json shows status ok',
    //     () =>
    //         request(app)
    //             .get('/')
    //             .set('Accept', 'application/json')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .then((response) => {
    //                 assert(response.body.status, 'ok');
    //             }),
    //     1000 * 10
    // );

    it('responds with json', async function () {
        const response = await request(app)
            .get('/')
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.body.status).toEqual('ok');
    });
});
