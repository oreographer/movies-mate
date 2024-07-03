import dbConnect from "../../../lib/mongodb";
import Movie from "../../../models/Movie";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "DELETE") {
    try {
      const movie = await Movie.findByIdAndDelete(req.body._id);
      if (!movie) {
        return res.status(404).json({ success: false });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false });
  }
}
