import express from 'express';
import { ContactController } from './contact.controller';

const router = express.Router();

router.post('/add-message',ContactController.addMessageData);
router.get('/', ContactController.getAllMessageData);
router.post('/send-message', ContactController.sendMessage);


export const contactRoutes = router;
