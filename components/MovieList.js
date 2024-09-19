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
    <section className="columns-xs">
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
    </section>
  );
}
