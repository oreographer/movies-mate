import dbConnect from "@/lib/mongodb";
import Movie from "@/models/Movie";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const movies = req.body;
      if (!Array.isArray(movies)) {
        return res
          .status(400)
          .json({ success: false, message: "Expected an array of movies" });
      }

      const savedMovies = await Movie.insertMany(movies);
      res.status(201).json({ success: true, data: savedMovies });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
