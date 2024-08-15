import { Request, Response, NextFunction } from 'express';

export function validatePriority(req: Request, res: Response, next: NextFunction) {
    const priority = parseInt(req.params.priority);
    if (isNaN(priority) || priority < 1 || priority > 4) {
        return res.status(400).json({ message: 'Invalid priority number' });
    }
    next();
}
