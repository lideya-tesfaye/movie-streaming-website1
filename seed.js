import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Genre from '../src/models/Genre.js';
import Movie from '../src/models/Movie.js';
import User from '../src/models/user.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/movie_streaming';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  await Promise.all([Genre.deleteMany({}), Movie.deleteMany({}), User.deleteMany({})]);

  
  const genreDocs = await Genre.insertMany([
    { name: 'Action' },
    { name: 'Drama' },
    { name: 'Comedy' },
    { name: 'Sci-Fi' },
    { name: 'Thriller' }
  ]);

  const [action, drama] = genreDocs;

  
  await Movie.insertMany([
    {
      title: 'Edge of Tomorrow',
      description: 'A soldier relives the same day over and over, fighting aliens.',
      releaseYear: 2014,
      durationMinutes: 113,
      rating: 8.1,
      genres: [action._id],
      posterUrl: 'https://image.tmdb.org/t/p/w342/uUHvlkLavotfGsNtosDy8ShsIYF.jpg',
      trailerUrl: 'https://www.youtube.com/embed/vw61gCe2oqI',
      videoUrl: '',
      category: 'movie'
    },
    {
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years.',
      releaseYear: 1994,
      durationMinutes: 142,
      rating: 9.3,
      genres: [drama._id],
      posterUrl: 'https://image.tmdb.org/t/p/w342/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      trailerUrl: 'https://www.youtube.com/embed/NmzuHjWmXOc',
      videoUrl: '',
      category: 'movie'
    },
    {
      title: 'Sample Series: House of David',
      description: 'An epic family drama (sample series).',
      releaseYear: 2021,
      durationMinutes: 45,
      rating: 8.0,
      genres: [drama._id],
      posterUrl: 'https://via.placeholder.com/300x180?text=House+of+David',
      trailerUrl: 'https://www.youtube.com/embed/example_series',
      videoUrl: '',
      category: 'series'
    },
    {
      title: 'Short: Fear Not',
      description: 'A short inspirational film.',
      releaseYear: 2020,
      durationMinutes: 12,
      rating: 7.2,
      genres: [drama._id],
      posterUrl: 'https://via.placeholder.com/300x180?text=Fear+Not',
      trailerUrl: 'https://www.youtube.com/embed/example_short',
      videoUrl: '',
      category: 'short'
    },
    {
      title: 'Trailer Sample',
      description: 'Trailer collection item.',
      releaseYear: 2022,
      durationMinutes: 2,
      rating: 6.5,
      genres: [action._id],
      posterUrl: 'https://via.placeholder.com/300x180?text=Trailer',
      trailerUrl: 'https://www.youtube.com/embed/example_trailer',
      videoUrl: '',
      category: 'trailer'
    }
  ]);

  const adminPassword = 'admin123';
  const adminHash = await User.hashPassword(adminPassword);
  await User.create({ name: 'Admin', email: 'admin@example.com', passwordHash: adminHash, role: 'admin' });

  console.log('Seed complete. Admin user: admin@example.com / admin123');
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
