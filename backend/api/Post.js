import express from 'express';
import {NewPost, GetPost, UpdatePost, deletePost } from '../controllers/Post.js';

const MovieRouter = express.Router();

MovieRouter.post('/post', NewPost);
MovieRouter.get('/:id', GetPost);
MovieRouter.put('/:id', UpdatePost);
MovieRouter.delete('/:id', deletePost);

export default MovieRouter;