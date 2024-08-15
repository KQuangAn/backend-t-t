import express, { Request, Response } from 'express';
import { checkUrls } from './service';
import { validatePriority } from './middleware';

export const app = express();
app.use(express.json());

const urls = [
    { url: 'https://does-not-work.perfume.new', priority: 1 },
    { url: 'https://gitlab.com', priority: 4 },
    { url: 'https://github.com', priority: 4 },
    { url: 'https://doesnt-work.github.com', priority: 4 },
    { url: 'http://app.scnt.me', priority: 3 },
    { url: 'https://offline.scentronix.com', priority: 2 },
];

// GET /urls/reachable - Returns reachable URLs ordered by priority (1 is highest)
app.get('/urls/reachable', async (req: Request, res: Response) => {
    try {
        const reachableUrls = await checkUrls(urls);
        res.json(reachableUrls);
    } catch (error) {
        res.status(500).json({ message: 'Error checking URLs' });
    }
});

// GET /urls/reachable/:priority - Returns reachable URLs by priority number
app.get('/urls/reachable/:priority', validatePriority, async (req: Request, res: Response) => {
    const priority = parseInt(req.params.priority);
    try {
        const reachableUrls = await checkUrls(urls.filter(url => url.priority === priority));
        res.json(reachableUrls);
    } catch (error) {
        res.status(500).json({ message: 'Error checking URLs' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
