import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, me } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post(
  '/register',
  [body('name').isString().isLength({ min: 2 }), body('email').isEmail(), body('password').isLength({ min: 6 })],
  register
);

router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 6 })], login);
router.get('/me', requireAuth, me);

export default router;
