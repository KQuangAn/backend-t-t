import { checkUrls } from "../services/urlService";
import { logger } from "../utils/logger";
import { jobQueue } from "../config/bull/queue";
import { Job } from "bull";
import { IUrl, IUrlReachable } from "../types/urlTypes";



jobQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed. Result:`, result);
});

jobQueue.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed. Error:`, err);
});

jobQueue.on('stalled', (job) => {
    console.log(`Job ${job.id} stalled and will be retried`);
});

jobQueue.on('progress', (job, progress) => {
    console.log(`Job ${job.id} progress:`, progress);
});


export const checkUrlsProcessor = async (job: Job<{ urls: IUrl[] }>): Promise<IUrlReachable[]> => {
    const urls = job.data.urls;
    const results = await checkUrls(urls);
    return results;
};