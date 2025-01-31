import { Request, Response, NextFunction } from 'express';

import PostType from '../types/posts.types';

export function creationValidation(req: Request, res: Response, next: NextFunction) {
    const post = req.body as PostType;

    if (!post.title || !post.content) {
        res.status(400).json({ message: 'Title and content are required' });
        return;
    }

    if (!post.title || typeof post.title !== 'string' || post.title.trim().length === 0) {
        res.status(400).json({ message: 'Title is required and must be a non-empty string' });
        return;
    }

    if (!post.content || typeof post.content !== 'string' || post.content.trim().length === 0) {
        res.status(400).json({ message: 'Content is required and must be a non-empty string' });
        return;
    }

    next();
};

export function updateValidation(req: Request, res: Response, next: NextFunction) {
    const post = req.body as PostType;

    if (!post.title && !post.content) {
        res.status(400).json({ message: 'Title or content are required' });
        return;
    }

    if (post.title !== undefined && (typeof post.title !== 'string' || post.title.trim().length === 0)) {    
        res.status(400).json({ message: 'Title must be a non-empty string if provided' });
        return;
    }

    if (post.content !== undefined && (typeof post.content !== 'string' || post.content.trim().length === 0)) {
        res.status(400).json({ message: 'Content must be a non-empty string if provided' });
        return;
    }

    next();
}
