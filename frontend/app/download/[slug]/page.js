"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/app/component/Navber";
import Footer from "@/app/component/footer";
import Movie from "@/app/component/movie";
import Comments from "@/app/component/comments";
import Loading from "@/app/component/Loading";
import Captcha from "@/app/component/captcha";
import "boxicons/css/boxicons.min.css";

export default function MovieDetails() {
  const params = useParams();
  const slug = params.slug;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomMovies, setRandomMovies] = useState([]);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/publicmovies`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const movieData = data.data.find((movie) => movie.slug === slug);
            if (movieData) {
              setMovie(movieData);
            } else {
              setError("Movie not found");
            }
          } else {
            setError("Failed to fetch movie details");
          }
        })
        .catch((err) => setError(`Error: ${err.message}`))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/publicmovies`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const randomMovies = data.data
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
          setRandomMovies(randomMovies);
        } else {
          setError("Failed to fetch random movies");
        }
      })
      .catch((err) => setError(`Error: ${err.message}`));
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <>
      <div className="bg-black">
        <Navbar />
        <Captcha />
        <div className="min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Hero Section */}
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
              <img
                src={movie.bgposter}
                alt={movie.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h1 className="mb-4 text-4xl font-bold">{movie.title}</h1>
                <div className="flex items-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-white">
                      {" "}
                      <i className="text-yellow-500 bx bxs-star"></i>
                      {movie.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      <i className="bx bx-time"></i> {movie.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      <i className="bx bx-calendar"></i> {movie.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="space-y-8 lg:col-span-2">
                {/* Description */}
                <div className="p-6 shadow-sm rounded-xl bg-[#030303]">
                  <h2 className="mb-4 text-2xl font-bold text-white ">
                    Sunopsis / Story Line:
                  </h2>
                  <p className="leading-relaxed text-white">
                    {movie.description}
                  </p>
                </div>

                {/* Download Section */}
                <div className="p-6 shadow-sm rounded-xl bg-[#030303]">
                  <h2 className="mb-6 text-2xl font-bold text-white">
                    Download Links
                  </h2>
                  <div className="grid grid-cols-1 gap-4 text-white">
                    <div className="flex items-center gap-4">
                      <button
                        className="w-full px-6 py-3 text-white transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl"
                        onClick={() => {
                          window.location.href = `http://127.0.0.1:6969/get_movies?watchonline=${movie.watchonline}`;
                        }}
                      >
                        Download Link
                      </button>
                    </div>
                  </div>
                </div>

                {/* Watch Online */}
                <div className="p-6 shadow-sm rounded-xl bg-[#030303]">
                  <h2 className="mb-6 text-2xl font-bold text-white">
                    Watch Online
                  </h2>
                  <div className="relative">
                    <iframe
                      className="w-full h-[400px] rounded-lg shadow-lg"
                      src={movie.youtubelink}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Movie Info Card */}
                <div className="p-6 shadow-sm rounded-xl bg-[#030303]">
                  <h2 className="mb-6 text-2xl font-bold text-white ">
                    Movie Information
                  </h2>
                  <div className="space-y-4">
                    <p className="flex items-center text-white gap-0.5">
                      {" "}
                      <strong>Genre:</strong> {movie.genre.join(", ")}
                    </p>
                    <p className="flex items-center text-white gap-0.5">
                      {" "}
                      <strong>Language:</strong> {movie.language}
                    </p>
                    <p className="flex items-center text-white gap-0.5">
                      {" "}
                      <i className="bx bx-captions text-white"></i>{" "}
                      <strong>Subtitles:</strong> {movie.subtitle}
                    </p>
                    <p className="flex items-center text-white gap-0.5">
                      {" "}
                      <i className="bx bx-hdd text-white"></i>{" "}
                      <strong>Size:</strong> {movie.size}
                    </p>
                    <p className="flex items-center text-white gap-0.5">
                      {" "}
                      <i className="bx bx-shield text-white"></i>
                      <strong>Quality:</strong> {movie.quality}
                    </p>
                  </div>
                </div>

                {/* Poster */}
                <img
                  src={movie.smposter}
                  alt={`${movie.title} Poster`}
                  className="w-full shadow-sm rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-[3vw] mt-4 sm:mx-[5vw]">
          <hr className="border-t border-gray-600" />
          <h2 className="flex items-center justify-center text-3xl font-semibold text-white">
            <i className="bx bx-camera-movie"></i> More Movies
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {randomMovies.map((movie) => (
              <div
                key={movie.slug}
                className="flex flex-col items-center p-2 rounded-lg"
              >
                <Movie
                  key={movie._id}
                  slug={movie.slug}
                  title={movie.title}
                  smposter={movie.smposter}
                  rating={movie.rating}
                  year={movie.year}
                />
              </div>
            ))}
          </div>
        </div>
        <hr className="border-t border-gray-600 w-[70vw] mx-auto" />
        <Comments
          postId={movie._id}
          commentId={movie.comments}
          title={movie.title}
        />
        <Footer />
      </div>
    </>
  );
}
