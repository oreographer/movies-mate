import { useState } from "react";
import dbConnect from "../lib/mongodb";
import Movie from "../models/Movie";
import AddMovie from "../components/AddMovie";
import MovieItem from "@/components/MovieItem";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight, BsPlus } from "react-icons/bs";
import Head from "next/head";

export default function Home({ movies }) {
  const [moviesList, setMoviesList] = useState(movies);

  const [add, setAdd] = useState(false);

  const addMovie = (movie) => {
    setMoviesList([...moviesList, movie]);
    setAdd(false);
  };

  const updateMovie = async (updatedMovie) => {
    const response = await fetch("/api/movies/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie),
    });
    const data = await response.json();

    setMoviesList(
      moviesList.map((movie) =>
        movie._id === data.data._id ? data.data : movie
      )
    );
  };

  const deleteMovie = async (id) => {
    await fetch("/api/movies/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });
    setMoviesList(moviesList.filter((movie) => movie._id !== id));
  };

  const toggleWatchStatus = async (movie) => {
    movie.watched = !movie.watched;
    updateMovie(movie);
  };

  const rateMovie = async (movie, rating) => {
    movie.rating = rating;
    updateMovie(movie);
  };

  const reviewMovie = async (movie, review) => {
    movie.review = review;
    updateMovie(movie);
  };

  return (
    <>
      <Head>
        <title>Popcorn Planet | A movie watchlist tool</title>t
      </Head>

      <div className="mx-auto px-5 lg:px-10 py-12 lg:py-14 ">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-white to-violet-400 uppercase">
          Popcorn Planet
        </h1>

        <div className="grid grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-7">
          <div className="col-span-2 lg:col-span-1">
            <Link href={"/movies"}>
              <div className="bg-white/90 text-black flex items-center justify-center gap-2 font-bold py-2 px-4 rounded text-center">
                <BsArrowLeft />
                <span>All Movies</span>
              </div>
            </Link>
          </div>

          <div className=" lg:col-start-2 col-span-2 row-start-2 lg:row-start-1">
            <button
              onClick={() => setAdd(!add)}
              className="bg-white/90 text-black flex items-center justify-center gap-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <span>{add ? "Close" : "Add Movie"}</span>

              <div
                className={`transform transition-transform duration-300 ${
                  add ? "rotate-45" : ""
                }`}
                onClick={() => setAdd(!add)}
              >
                <BsPlus size={22} />
              </div>
            </button>
          </div>

          <div className="col-start-3 lg:col-start-5 col-span-2 row-start-1">
            <Link href={"/watchlists"}>
              <div className="bg-white/90 text-black flex items-center justify-center gap-2 font-bold py-2 px-4 rounded text-center">
                <span>Watchlists</span>
                <BsArrowRight />
              </div>
            </Link>
          </div>

          <section className="row-start-3 lg:row-start-2 col-span-4">
            {add ? (
              <AddMovie addMovie={addMovie} close={() => setAdd()} />
            ) : (
              <div>
                {moviesList.length > 0 ? (
                  <div className="grid gap-5">
                    {moviesList.map((movie) => (
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
                ) : (
                  <div className="w-full h-48 rounded bg-white flex items-center justify-center">
                    <span>No list found</span>
                  </div>
                )}
              </div>
            )}
          </section>

          <section className="lg:col-start-5 col-span-full row-start-4 lg:row-start-2">
            {moviesList.filter((movie) => movie.watched === true).length > 0 ? (
              <div className=" grid gap-5">
                {moviesList
                  .filter((movie) => movie.watched === true)
                  .map((movie) => (
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
            ) : (
              <div className="w-full h-48 rounded bg-white flex items-center justify-center">
                <span>No list found</span>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const movies = await Movie.find({}).limit(3);
  const watchedMovies = await Movie.find({ watched: true });

  console.log(movies);

  return { props: JSON.parse(JSON.stringify({ movies, watchedMovies })) };
}
