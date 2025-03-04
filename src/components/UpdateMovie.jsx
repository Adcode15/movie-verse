import React, { useState, useEffect } from "react"; // <-- Import useEffect
import swal from 'sweetalert';
import { TailSpin } from "react-loader-spinner";
import { updateDoc, doc, getDoc } from "firebase/firestore"; // <-- Import getDoc and other Firebase methods
import { moviesRef } from "./firebase/firebase"; // Import your moviesRef

const UpdateMovie = ({ movieId }) => {
  const [form, setForm] = useState({
    name: "",
    year: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch the movie data for editing
  useEffect(() => {
    const fetchData = async () => {
      const movieDoc = doc(moviesRef, movieId); // Get the document reference
      const movieSnapshot = await getDoc(movieDoc); // Fetch document data
      if (movieSnapshot.exists()) {
        const movieData = movieSnapshot.data(); // Extract data
        setForm({
          name: movieData.name,
          year: movieData.year,
          description: movieData.description,
          image: movieData.image,
        });
      }
    };
    fetchData();
  }, [movieId]); // Re-fetch data whenever movieId changes

  const updateMovie = async () => {
    setLoading(true);
    try {
      const movieDoc = doc(moviesRef, movieId); // Get the document reference for the movie
      await updateDoc(movieDoc, form); // Update the document with form data
      swal({
        title: "Movie Updated Successfully!",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      window.location.reload(); // Refresh page after successful update
    } catch (err) {
      swal({
        title: err.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-white">
              Update Movie
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="year" className="leading-7 text-sm text-gray-300 bg-black">
                    Year
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="image" className="leading-7 text-sm text-gray-300">
                    Image Link
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full bg-grey rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-black leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="description" className="leading-7 text-sm text-gray-300">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button 
                  onClick={updateMovie} 
                  className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                >
                  {loading ? <TailSpin height={25} color="white" /> : "Update Movie"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateMovie;
