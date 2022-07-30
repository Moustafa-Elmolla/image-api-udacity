import supertest from "supertest";
import app from '../index';

//create request 
const request = supertest(app);

describe('Test endpoint response', () => {

    it('gets the api endpoint ', async ():Promise<void> => {
        const response: supertest.Response = await request.get(
            '/api/images?filename=palmtunnel.jpg&width=100&height=100'
        );
        expect(response.status).toBe(200);
    });
    it('should be error, Return 404', async ():Promise<void> => {
        const response: supertest.Response = await request.get(
            '/api/images?filename=palmtunnel.jpg&width=100&height=100'
        );
        expect(response.status).toBe(404);
    });
});