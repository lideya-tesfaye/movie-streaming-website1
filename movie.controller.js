import { validationResult } from 'express-validator';
import Movie from '../models/Movie.js';
import User from '../models/user.js';


export async function listMovies(req, res) {
  const { q, genre, featured, type } = req.query;
  const filter = {};
  if (q) filter.title = { $regex: q, $options: 'i' };
  if (genre) filter.genres = genre;
  if (featured) filter.isFeatured = true;
  if (type) {
   
    filter.category = type;
  }
  const movies = await Movie.find(filter).populate('genres').sort({ createdAt: -1 }).limit(100);
  return res.json({ movies });
}

export async function getMovie(req, res) {
  const movie = await Movie.findById(req.params.id).populate('genres');
  if (!movie) return res.status(404).json({ message: 'Not found' });
  return res.json({ movie });
}

export async function createMovie(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const movie = await Movie.create(req.body);
  return res.status(201).json({ movie });
}

export async function updateMovie(req, res) {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!movie) return res.status(404).json({ message: 'Not found' });
  return res.json({ movie });
}

export async function deleteMovie(req, res) {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Not found' });
  return res.json({ success: true });
}

export async function likeMovie(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const movieId = req.params.id;
  const already = user.likes.some((m) => m.toString() === movieId);
  if (already) {
    user.likes = user.likes.filter((m) => m.toString() !== movieId);
  } else {
    user.likes.push(movieId);
  }
  await user.save();
  return res.json({ likes: user.likes });
}

export async function toggleWatchlist(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const movieId = req.params.id;
  const already = user.watchlist.some((m) => m.toString() === movieId);
  if (already) {
    user.watchlist = user.watchlist.filter((m) => m.toString() !== movieId);
  } else {
    user.watchlist.push(movieId);
  }
  await user.save();
  return res.json({ watchlist: user.watchlist });
}
