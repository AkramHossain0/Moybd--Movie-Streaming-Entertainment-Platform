import express from 'express';
import { Register, Login, verify, forgotPassword } from '../controllers/Auth.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', Register);
AuthRouter.post('/verify', verify);
AuthRouter.post('/login', Login);
AuthRouter.post('/forgot-password', forgotPassword);


export default AuthRouter;