import User from '../models/user.js';

export async function getProfile(req, res) {
  const user = await User.findById(req.user.id)
    .select('-passwordHash')
    .populate('watchlist')
    .populate('likes');
  return res.json({ user });
}

export async function getWatchlist(req, res) {
  const user = await User.findById(req.user.id).populate('watchlist');
  return res.json({ watchlist: user?.watchlist || [] });
}

export async function getLikes(req, res) {
  const user = await User.findById(req.user.id).populate('likes');
  return res.json({ likes: user?.likes || [] });
}
