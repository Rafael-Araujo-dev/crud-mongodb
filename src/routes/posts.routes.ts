import { Router } from 'express';

import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} from '../controllers/posts.controller';

import {
    creationValidation,
    updateValidation,
} from '../middlewares/posts.middleware';

const router = Router();

router.get('/', getPosts);
router.get('/:_id', getPostById);
router.post('/', creationValidation, createPost);
router.put('/:_id', updateValidation, updatePost);
router.delete('/:_id', deletePost);

export default router;