// src/middleware/rateLimiter.ts
import rateLimit from 'express-rate-limit';
import RateLimitRedisStore from 'rate-limit-redis';
import { redisClient } from '../config/redis/redisClient';


// Rate limiter middleware using Redis
export const rateLimiter = rateLimit({
    store: new RateLimitRedisStore({
        sendCommand: async (...args: string[]) => redisClient.sendCommand(args),
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
    statusCode: 429, // status to return when rate limit is exceeded
    keyGenerator: (req) => req.ip || 'unknown_ip', // Ensure it returns a string
});
