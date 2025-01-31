import { Request, Response } from 'express';
import Post from '../models/posts.model';
import PostType from '../types/posts.types';

export async function createPost(req: Request, res: Response) {
    const newPost: PostType = req.body;

    try {
        const post = new Post(newPost);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: 'Error creating post', error });
    }
}

export async function getPosts(req: Request, res: Response) {
    const query: { [key: string]: any } = req.query;

    // Find document by title LIKE query.title.
    if (query.title) query.title = new RegExp(query.title as string, 'i'); // /title/i

    try {
        const posts = await Post.find(query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error getting posts', error });
    }
}

export async function getPostById(req: Request, res: Response) {
    const { params } = req;

    try {
        const post = await Post.findOne(params);

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return
        }
        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error getting post', error });
    }
}

export async function updatePost(req: Request, res: Response) {
    const { params } = req;

    try {
        const post = await Post.findOneAndUpdate(params, req.body, { new: true, runValidators: true });

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
}

export async function deletePost(req: Request, res: Response) {
    const { params } = req;

    try {
        const post = await Post.findOneAndDelete(params);

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return
        }

        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
}