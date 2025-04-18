import express from 'express';
import { newComment, updateComment, deleteComment, getPublishedComments, getDraftComments, all} from '../controllers/Comments.js';

const CommentsRouter = express.Router();

CommentsRouter.post('/new', newComment);
CommentsRouter.put('/update/:id', updateComment);
CommentsRouter.delete('/delete/:id', deleteComment);
CommentsRouter.get('/published', getPublishedComments);
CommentsRouter.get('/draft', getDraftComments);
CommentsRouter.get('/all', all);

export default CommentsRouter;

