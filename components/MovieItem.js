import { useState } from "react";
import {
  BsBookmarkHeartFill,
  BsBookmarkHeart,
  BsThreeDotsVertical,
  BsBookmarkFill,
  BsBookmark,
  BsArrowRight,
  BsBookmarkCheck,
  BsBookmarkCheckFill,
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
    <div className="mb-4">
      {edit ? (
        <UpdatedMovie
          movie={movie}
          updateMovie={(movie) => update(movie)}
          close={() => setEdit(false)}
        />
      ) : (
        <div className="bg-white shadow-md rounded px-6 lg:px-8 pt-5 lg:pt-6 pb-7 w-full">
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

          <div className="flex items-center gap-2 lg:gap-4 flex-wrap font-semibold">
            <p>Release Year: {movie.releaseYear}</p>
            <p>Genre: {movie.genre}</p>
            <p>Watched: {movie.watched ? "Yes" : "No"}</p>
          </div>

          <div className="flex items-center justify-between mt-4 mb-2">
            <Link href={"/movie/" + movie._id}>
              <div className="flex items-center gap-2 text-sm font-bold underline text-green-800">
                <span>View details</span>
                <BsArrowRight />
              </div>
            </Link>

            <button
              onClick={() => toggleWatchStatus(movie)}
              className=" font-bold rounded focus:outline-none focus:shadow-outline"
            >
              {movie.watched ? (
                <BsBookmarkCheckFill size={20} />
              ) : (
                <BsBookmark size={20} />
              )}
            </button>
          </div>

          {/* pending rating and review UI in future */}
        </div>
      )}
    </div>
  );
}
