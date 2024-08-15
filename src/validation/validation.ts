import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const urlSchema = Joi.array().items(
    Joi.object({
        url: Joi.string().uri().required(),
        priority: Joi.number().integer().min(1).max(5).required(),
    })
).required();

const prioritySchema = Joi.number().integer().min(1).max(5).required();

export const validateUrls = (req: Request, res: Response, next: NextFunction) => {
    const { error } = urlSchema.validate(req.body.urls);
    if (error) {
        return res.status(400).json({ message: 'Invalid input', details: error.details });
    }
    next();
};

export const validatePriorityParam = (req: Request, res: Response, next: NextFunction) => {
    const { error } = prioritySchema.validate(req.params.priority);
    if (error) {
        return res.status(400).json({ message: 'Invalid priority parameter', details: error.details });
    }
    next();
};
