import Genre from '../models/Genre.js';

export async function listGenres(req, res) {
  const genres = await Genre.find({}).sort({ name: 1 });
  return res.json({ genres });
}

export async function createGenre(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const existing = await Genre.findOne({ name });
  if (existing) return res.status(409).json({ message: 'Genre exists' });
  const genre = await Genre.create({ name });
  return res.status(201).json({ genre });
}

export async function deleteGenre(req, res) {
  await Genre.findByIdAndDelete(req.params.id);
  return res.json({ success: true });
}
