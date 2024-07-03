import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  releaseYear: { type: Number },
  genre: { type: String },
  watched: { type: Boolean, default: false },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);