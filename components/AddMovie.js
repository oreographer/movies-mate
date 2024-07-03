import { useRef, useState } from "react";

export default function AddMovie({ addMovie, close }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");

  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMovie = { title, description, releaseYear, genre, watched: false };

    const response = await fetch("/api/movies/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    });

    const data = await response.json();

    if (data.success) {
      addMovie(data.data);
      formRef.current.reset();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-5 lg:px-8 py-5 lg:py-7 space-y-2 lg:space-y-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl lg:text-2xl font-bold ">Add new movie</h2>
        <button
          onClick={() => close()}
          type="button"
          className=" font-bold rounded focus:outline-none focus:shadow-outline"
        >
          Close
        </button>
      </div>

      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="releaseYear"
        >
          Release Year
        </label>
        <input
          type="number"
          id="releaseYear"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="genre"
        >
          Genre
        </label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="pt-3">
        <button
          type="submit"
          className="bg-black text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
        >
          Add
        </button>
      </div>
    </form>
  );
}
