import { Router } from 'express';

import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} from '../controllers/post.controller';

import {
    creationValidation,
    updateValidation,
} from '../middlewares/post.middleware';

const router = Router();

router.get('/', getPosts);
router.get('/:_id', getPostById);
router.post('/', creationValidation, createPost);
router.put('/:_id', updateValidation, updatePost);
router.delete('/:_id', deletePost);

export default router;