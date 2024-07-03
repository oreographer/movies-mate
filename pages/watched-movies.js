import { useState, useEffect } from "react";
import dbConnect from "../lib/mongodb";
import Movie from "../models/Movie";
import AddMovie from "../components/AddMovie";
import MovieList from "../components/MovieList";
import MovieItem from "@/components/MovieItem";
import Link from "next/link";
import {
  BsArrow90DegLeft,
  BsArrowLeft,
  BsArrowRight,
  BsDash,
} from "react-icons/bs";
import Head from "next/head";
import { SITE_NAME } from "@/_data";

export default function Watchlists({ watchedMovies }) {
  const [watchedList, setWatchlist] = useState(watchedMovies);

  const updateMovie = async (updatedMovie) => {
    const response = await fetch("/api/movies/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie),
    });
    const data = await response.json();

    setWatchlist(
      watchedList.map((movie) =>
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
    setWatchlist(watchedList.filter((movie) => movie._id !== id));
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
  const title = `Watched Movies | ${SITE_NAME}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-12 lg:py-14">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-white to-violet-400 uppercase">
          Watched Movies
        </h1>

        <section className="flex w-full items-center justify-between mb-7 text-white">
          <div className="flex space-x-7 items-center">
            <Link href={"/"}>
              <div className="flex items-center gap-2">
                <BsArrowLeft />
                <span>Back to Home</span>
              </div>
            </Link>

            <Link href={"/all-movies"}>
              <div className="flex items-center gap-2">
                <span>All Movies</span>
                <BsArrowRight />
              </div>
            </Link>
          </div>

          <span>({watchedList?.length})</span>
        </section>

        {watchedList.length > 0 ? (
          <MovieList
            movies={watchedList}
            updateMovie={updateMovie}
            deleteMovie={deleteMovie}
            toggleWatchStatus={toggleWatchStatus}
            rateMovie={rateMovie}
            reviewMovie={reviewMovie}
          />
        ) : (
          <div className="w-full h-48 rounded bg-white flex items-center justify-center">
            <span>No list found</span>
          </div>
        )}

        <Link href={"/watched-movies"}>
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

  const watchedMovies = await Movie.find({ watched: true });

  return { props: JSON.parse(JSON.stringify({ watchedMovies })) };
}
