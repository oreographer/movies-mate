import { useState } from "react";
import {
  BsBookmarkHeartFill,
  BsBookmarkHeart,
  BsThreeDotsVertical,
} from "react-icons/bs";
import UpdatedMovie from "./UpdateMovie";
import Link from "next/link";

export default function MovieItem({
  movie,
  updateMovie,
  deleteMovie,
  toggleWatchStatus,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [edit, setEdit] = useState(false);

  const update = (movie) => {
    updateMovie(movie);
    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <UpdatedMovie
          movie={movie}
          updateMovie={(movie) => update(movie)}
          close={() => setEdit(false)}
        />
      ) : (
        <div className="bg-white shadow-md rounded px-6 lg:px-8 pt-5 lg:pt-6 pb-7 w-full h-fit ">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-2">{movie.title}</h2>

            <div className="relative w-fit">
              <button
                onClick={() => setShowMenu(!showMenu)}
                onMouseEnter={() => setShowMenu(!showMenu)}
                type="button"
              >
                <BsThreeDotsVertical />
              </button>

              {showMenu && (
                <div
                  onMouseLeave={() => setShowMenu(false)}
                  className="absolute top-0 -left-[9em] p-4 bg-gray-100 w-36 rounded-lg"
                >
                  <button
                    onClick={() => setEdit(true)}
                    className=" font-bold py-1 w-full focus:outline-none focus:shadow-outline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMovie(movie._id)}
                    className="text-red-500 font-bold py-1 w-full focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-700 text-base mb-2">
            {movie.description.slice(0, 180)}
            {movie.description.length > 180 && "..."}
          </p>
          <p className="text-sm">Release Year: {movie.releaseYear}</p>
          <p className="text-sm">Genre: {movie.genre}</p>
          <p className="text-sm">Watched: {movie.watched ? "Yes" : "No"}</p>
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => toggleWatchStatus(movie)}
              className="border-black border font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {movie.watched ? (
                <BsBookmarkHeartFill size={18} />
              ) : (
                <BsBookmarkHeart size={18} />
              )}
            </button>

            <Link
              href={"/movie/" + movie._id}
              className="border-black border text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              View details
            </Link>
          </div>

          {/* pending rating and review UI in future */}
        </div>
      )}
    </>
  );
}
