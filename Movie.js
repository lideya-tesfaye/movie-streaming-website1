import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String },
    releaseYear: { type: Number },
    durationMinutes: { type: Number },
    rating: { type: Number, min: 0, max: 10, default: 0 },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    posterUrl: { type: String },
    trailerUrl: { type: String },
    videoUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
   
    category: { type: String, enum: ['movie', 'series', 'short', 'trailer'], default: 'movie' }
  },
  { timestamps: true }
);

export default mongoose.model('Movie', movieSchema);
