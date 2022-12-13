import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  votes: Number,
  genreIds: [],
  description: String,
});

export const Movie = mongoose.model('Movie', MovieSchema);