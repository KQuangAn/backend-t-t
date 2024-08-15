// src/queue.ts
import Bull from 'bull';

const jobQueue = new Bull('jobQueue', {
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
    }
});



export { jobQueue };
