import express from 'express';
import captcha from '../controllers/captcha.js';

const captchaRouter = express.Router();

captchaRouter.post('/', captcha);

export default captchaRouter;