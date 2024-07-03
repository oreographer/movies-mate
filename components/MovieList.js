import MovieItem from "./MovieItem";

export default function MovieList({
  movies,
  updateMovie,
  deleteMovie,
  toggleWatchStatus,
  rateMovie,
  reviewMovie,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {movies.map((movie) => (
        <MovieItem
          key={movie._id}
          movie={movie}
          updateMovie={updateMovie}
          deleteMovie={deleteMovie}
          toggleWatchStatus={toggleWatchStatus}
          rateMovie={rateMovie}
          reviewMovie={reviewMovie}
        />
      ))}
    </div>
  );
}
