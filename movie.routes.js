import { Router } from 'express';
import { body } from 'express-validator';
import {
  listMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  likeMovie,
  toggleWatchlist
} from '../controllers/movie.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listMovies);
router.get('/series', (req, res) => { req.query.type = 'series'; return listMovies(req, res); });
router.get('/short-movies', (req, res) => { req.query.type = 'short'; return listMovies(req, res); });
router.get('/trailers', (req, res) => { req.query.type = 'trailer'; return listMovies(req, res); });

router.get('/:id', getMovie);

router.post('/', requireAuth, requireAdmin, [body('title').isString().isLength({ min: 1 })], createMovie);
router.put('/:id', requireAuth, requireAdmin, updateMovie);
router.delete('/:id', requireAuth, requireAdmin, deleteMovie);

router.post('/:id/like', requireAuth, likeMovie);
router.post('/:id/watchlist', requireAuth, toggleWatchlist);

export default router;
