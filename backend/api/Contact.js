import express from 'express';
import { NewContact } from '../controllers/Contact.js';

const ContactRouter = express.Router();

ContactRouter.post('/', NewContact);

export default ContactRouter;