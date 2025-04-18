import express from 'express';
import { Action , Adventure , Comedy , Drama , Crime , Animation, Fantasy , Horror , Science_Fiction , Romance , Thriller } from '../controllers/Genre.js';

const GenreRouter = express.Router();

GenreRouter.get('/Action', Action);
GenreRouter.get('/Adventure', Adventure);
GenreRouter.get('/Comedy', Comedy);
GenreRouter.get('/Drama', Drama);
GenreRouter.get('/Crime', Crime);
GenreRouter.get('/Animation', Animation);
GenreRouter.get('/Fantasy', Fantasy);
GenreRouter.get('/Horror', Horror);
GenreRouter.get('/Science_Fiction', Science_Fiction);
GenreRouter.get('/Romance', Romance);
GenreRouter.get('/Thriller', Thriller);

export default GenreRouter;
