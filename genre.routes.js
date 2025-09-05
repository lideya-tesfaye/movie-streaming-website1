import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { listGenres, createGenre, deleteGenre } from '../controllers/genre.controller.js';

const router = Router();

router.get('/', listGenres);
router.post('/', requireAuth, requireAdmin, createGenre);
router.delete('/:id', requireAuth, requireAdmin, deleteGenre);

export default router;
