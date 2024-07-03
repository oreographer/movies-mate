import { useState, useEffect } from "react";
import dbConnect from "../lib/mongodb";
import Movie from "../models/Movie";
import AddMovie from "../components/AddMovie";
import MovieList from "../components/MovieList";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight, BsDash } from "react-icons/bs";
import Head from "next/head";

export default function Movies({ movies }) {
  const [moviesList, setMoviesList] = useState(movies);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch("/api/movies");
      const data = await response.json();
      setWatchlist(data.data);
    }

    fetchMovies();
  }, []);

  const addMovie = (movie) => {
    setMoviesList([...moviesList, movie]);
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
        <title>All Movies | Popcorn planet</title>
      </Head>

      <div className="mx-auto px-5 lg:px-10 py-12 lg:py-14">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-white to-violet-400 uppercase">
          All Movies
        </h1>

        <section className="mb-7 flex space-x-7 items-center">
          <Link href={"/"}>
            <div className="text-white flex items-center gap-2">
              <BsArrowLeft />
              <span>Back to Home</span>
            </div>
          </Link>

          <Link href={"/watchlists"}>
            <div className="text-white flex items-center gap-2">
              <span>Watchlists</span>
              <BsArrowRight />
            </div>
          </Link>
        </section>

        {moviesList.length > 0 ? (
          <MovieList
            movies={moviesList}
            updateMovie={updateMovie}
            deleteMovie={deleteMovie}
            toggleWatchStatus={toggleWatchStatus}
            rateMovie={rateMovie}
            reviewMovie={reviewMovie}
          />
        ) : (
          <AddMovie addMovie={addMovie} />
        )}

        <Link href={"/Movies"}>
          <div className="text-white flex items-center justify-center gap-2 mt-7">
            <BsDash />
            <span>Back to Top</span>
          </div>
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const movies = await Movie.find({});

  return { props: JSON.parse(JSON.stringify({ movies })) };
}