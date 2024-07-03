import dbConnect from "@/lib/mongodb";
import Movie from "@/models/Movie";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const movie = ({ movie }) => {
  return (
    <>
      <div className="mx-auto max-w-5xl px-5 lg:px-10 py-12 lg:py-14">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-white to-violet-400 uppercase">
          {movie.title}
        </h1>

        <section className="mb-7 flex space-x-7 items-center">
          <Link href={"/"}>
            <div className="text-white flex items-center gap-2">
              <BsArrowLeft />
              <span>Back to Home</span>
            </div>
          </Link>

          <Link href={"/all-movies"}>
            <div className="text-white flex items-center gap-2">
              <span>All Movies</span>
              <BsArrowRight />
            </div>
          </Link>
        </section>

        <div className="mx-auto p-6 bg-white rounded-lg shadow-xl">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <div className="w-full md:w-2/3">
              <span className="font-bold text-sm mb-4 block">
                Movie Id: {movie?._id}
              </span>

              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                {movie.description}
              </p>
              <div className="text-md text-gray-600 space-y-2">
                <p>
                  <span className="font-semibold">Release Year:</span>{" "}
                  {movie.releaseYear}
                </p>
                <p>
                  <span className="font-semibold">Genre:</span> {movie.genre}
                </p>
                <p>
                  <span className="font-semibold">Watched:</span>{" "}
                  {movie.watched ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default movie;

export async function getServerSideProps(context) {
  await dbConnect();

  const { mid } = context.params;
  const movie = await Movie.findById(mid).lean().exec();

  return { props: { movie: JSON.parse(JSON.stringify(movie)) } };
}
