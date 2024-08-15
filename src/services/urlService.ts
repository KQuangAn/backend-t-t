import { createClient } from 'redis';
import { IUrl, IUrlReachable } from '../types/urlTypes';
import axios from 'axios';

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await redisClient.connect();
})();

export const checkUrls = async (urls: IUrl[]): Promise<IUrlReachable[]> => {
    const results = await Promise.all(
        urls.map(async (urlObj) => {
            const cachedResult = await redisClient.get(urlObj.url);
            if (cachedResult) {
                return JSON.parse(cachedResult) as IUrlReachable;
            }

            try {
                const response = await axios.get(urlObj.url, { timeout: 5000 });
                const result: IUrlReachable = {
                    ...urlObj,
                    reachable: response.status >= 200 && response.status < 300,
                };

                await redisClient.set(urlObj.url, JSON.stringify(result), {
                    EX: 60 * 5,
                });

                return result;
            } catch (error) {
                const result: IUrlReachable = { ...urlObj, reachable: false };
                await redisClient.set(urlObj.url, JSON.stringify(result), {
                    EX: 60 * 5,
                });

                return result;
            }
        })
    );

    return results.filter((url): url is IUrlReachable => url !== undefined && url.reachable)
                  .sort((a, b) => a.priority - b.priority);
};
