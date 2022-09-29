import supertest from 'supertest';
import app from '../index';

//create request
const request = supertest(app);

describe('Test endpoint responses', () => {
    it('should get /api valid', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });

    it('gets the api endpoint ', async () => {
        const response = await request.get(
            '/api/images?filename=palmtunnel&width=100&height=100&format=jpg'
        );
        expect(response.status).toBe(200);
    });
    it('should be error when query parameters is missing, Return 400', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(400);
    });
});
