import { Request, Response } from 'express';
import Post from '../models/posts.model';

import { generateSlug, generateUniqueSlug } from '../utils/slugGenerator';

export async function createPost(req: Request, res: Response) {
    const { title, content } = req.body;

    try {
        const slug = await generateUniqueSlug(title);

        if (!slug) {
            res.status(400).json({ message: 'Unable to generate a unique slug after multiple attempts' });
            return
        }

        const post = new Post({ slug, title, content });
        
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: 'Error creating post' });
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
    const { _id } = req.params;
    let { title, content, slug } = req.body;

    try {
        const post = await Post.findById(_id);

        if (post?.title !== title) slug = await generateUniqueSlug(title);

        if (slug === false) {
            res.status(400).json({ message: 'Unable to generate a unique slug after multiple attempts' });
            return
        }

        const updtPost = await Post.findByIdAndUpdate(_id, { slug, title, content }, { new: true, runValidators: true });

        if (!updtPost) {
            res.status(404).json({ message: 'Post not found' });
            return
        }

        res.status(200).json(updtPost);
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