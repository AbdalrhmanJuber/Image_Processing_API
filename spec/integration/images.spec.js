"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
describe('Image API Endpoints', () => {
    it('should return 200 for valid image resize request', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/api/images/resize')
            .query({
            filename: 'fjord.jpg',
            width: '200',
            height: '200'
        });
        expect(response.status).toBe(200);
    });
    it('should return 400 for missing parameters', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/api/images/resize')
            .query({
            filename: 'fjord.jpg'
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toContain('width is required');
    });
    it('should return 404 for non-existent image', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/api/images/resize')
            .query({
            filename: 'nonexistent.jpg',
            width: '200',
            height: '200'
        });
        expect(response.status).toBe(404);
    });
});
//# sourceMappingURL=images.spec.js.map