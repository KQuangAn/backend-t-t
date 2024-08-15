import request from 'supertest';
import axios from 'axios';
import { Server } from 'http';
import { app } from '../src/app';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GET /urls/reachable', () => {
    let server: Server;

    beforeAll((done) => {
        server = app.listen(3000, done);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should return reachable URLs ordered by priority', async () => {
        mockedAxios.get.mockResolvedValue({ status: 200 });

        const response = await request(app).get('/api/urls/reachable');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].priority).toBe(1);
    });

    it('should return reachable URLs by priority number', async () => {
        mockedAxios.get.mockResolvedValue({ status: 200 });

        const response = await request(app).get('/api/urls/reachable/4');

        expect(response.status).toBe(200);
        expect(response.body.every((url: { priority: number }) => url.priority === 4)).toBe(true);
    });

    it('should return 400 for invalid priority', async () => {
        const response = await request(app).get('/api/urls/reachable/5');

        expect(response.status).toBe(400);
    });
});
