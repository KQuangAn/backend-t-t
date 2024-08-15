import { Request, Response } from 'express';
import { checkUrls } from '../services/urlService';
import { urls } from '../data/url';
import { jobQueue } from '../config/bull/queue';

export const getReachableUrls = async (req: Request, res: Response)=> {
    const urls = req.body.urls;

    if (!Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const job = await jobQueue.add('checkUrls', { urls });

    res.status(202).json({ message: 'Job added', jobId: job.id });

    try {
        const reachableUrls = await checkUrls(urls);
        res.json(reachableUrls);
    } catch (error) {
        res.status(500).json({ message: 'Error checking URLs' });
    }
};

export const getReachableUrlsByPriority = async (req: Request, res: Response): Promise<void> => {
    const priority = parseInt(req.params.priority);
    try {
        const reachableUrls = await checkUrls(urls.filter(url => url.priority === priority));
        res.json(reachableUrls);
    } catch (error) {
        res.status(500).json({ message: 'Error checking URLs' });
    }
};
