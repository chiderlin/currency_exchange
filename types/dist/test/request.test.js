"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
// error:thrown: "Exceeded timeout of 5000 ms for a test.
// -> solve: module.exports之前接錯，接到router
describe('GET /', () => {
    it('responds with json', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/')
                .set('Accept', 'application/json');
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('ok');
        });
    });
});
describe('GET /api/exchange', () => {
    it('responds with json', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/api/exchange?source=usd&target=jpy&amount=$1,525')
                .set('Accept', 'application/json');
            expect(response.status).toBe(200);
            expect(response.body.msg).toBe('success');
            expect(response.body.amount).toBe('$170,496.53');
        });
    });
    it('return error message:"source required" ', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/api/exchange')
                .set('Accept', 'application/json');
            expect(response.status).toBe(400);
            expect(response.body.msg).toBe('error');
            expect(response.body.data).toBe('source required.');
        });
    });
    it('return error message:"target required." ', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/api/exchange?source=aaa')
                .set('Accept', 'application/json');
            expect(response.status).toBe(400);
            expect(response.body.msg).toBe('error');
            expect(response.body.data).toBe('target required.');
        });
    });
    it('return error message: "target required" ', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/api/exchange?source=usd')
                .set('Accept', 'application/json');
            expect(response.status).toBe(400);
            expect(response.body.msg).toBe('error');
            expect(response.body.data).toBe('target required.');
        });
    });
    it('return error message: "amount required"', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/api/exchange?source=usd&target=jpy')
                .set('Accept', 'application/json');
            expect(response.status).toBe(400);
            expect(response.body.msg).toBe('error');
            expect(response.body.data).toBe('amount required.');
        });
    });
    it('return error message: "source currency does not exist."', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/api/exchange?source=aaa&target=jpy&amount=$1,525')
                .set('Accept', 'application/json');
            expect(response.status).toBe(400);
            expect(response.body.msg).toBe('error');
            expect(response.body.data).toBe('source currency does not exist.');
        });
    });
    it('return error message: "target currency does not exist."', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/api/exchange?source=usd&target=aaa&amount=$1,525')
                .set('Accept', 'application/json');
            expect(response.status).toBe(400);
            expect(response.body.msg).toBe('error');
            expect(response.body.data).toBe('target currency does not exist.');
        });
    });
});
