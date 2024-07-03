import dbConnect from "../../../lib/mongodb";
import Movie from "../../../models/Movie";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const movie = new Movie(req.body);
      await movie.save();
      res.status(201).json({ success: true, data: movie });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false });
  }
}
