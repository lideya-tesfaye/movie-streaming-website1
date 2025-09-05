import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getProfile, getWatchlist, getLikes } from '../controllers/user.controller.js';

const router = Router();

router.get('/me', requireAuth, getProfile);
router.get('/me/watchlist', requireAuth, getWatchlist);
router.get('/me/likes', requireAuth, getLikes);

export default router;
