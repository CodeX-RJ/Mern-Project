import express from 'express';
import { getPosts, createPost, deletePost, updatePost, getPostById } from '../controllers/postControllers.js';

const router = express.Router();


router.get('/', getPosts);

router.get('/:id', getPostById);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;