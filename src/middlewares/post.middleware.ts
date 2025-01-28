import { Request, Response, NextFunction } from 'express';

import PostType from '../types/post.types';

export function creationValidation(req: Request, res: Response, next: NextFunction) {
    const post = req.body as PostType;

    if (!post.title || !post.body) {
        res.status(400).json({ message: 'Title and body are required' });
        return;
    }

    if (!post.title || typeof post.title !== 'string' || post.title.trim().length === 0) {
        res.status(400).json({ message: 'Title is required and must be a non-empty string' });
        return;
    }

    if (!post.body || typeof post.body !== 'string' || post.body.trim().length === 0) {
        res.status(400).json({ message: 'Body is required and must be a non-empty string' });
        return;
    }

    next();
};

export function updateValidation(req: Request, res: Response, next: NextFunction) {
    const post = req.body as PostType;

    if (!post.title && !post.body) {
        res.status(400).json({ message: 'Title or body are required' });
        return;
    }

    if (post.title !== undefined && (typeof post.title !== 'string' || post.title.trim().length === 0)) {    
        res.status(400).json({ message: 'Title must be a non-empty string if provided' });
        return;
    }

    if (post.body !== undefined && (typeof post.body !== 'string' || post.body.trim().length === 0)) {
        res.status(400).json({ message: 'Body must be a non-empty string if provided' });
        return;
    }

    next();
}
