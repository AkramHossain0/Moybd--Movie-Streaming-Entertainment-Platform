import express from 'express';
import { Register, Login,logout, verify, forgotPassword, resetPassword } from '../controllers/Auth.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', Register);
AuthRouter.post('/verify', verify);
AuthRouter.post('/login', Login);
AuthRouter.post('/logout', logout);
AuthRouter.post('/forgot-password', forgotPassword);
AuthRouter.post('/reset-password', resetPassword);


export default AuthRouter;