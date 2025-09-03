import { Router } from 'express';
import { resizeImage } from '../controllers/imageController';

const router = Router();

router.get('/resize', resizeImage);

export default router;
