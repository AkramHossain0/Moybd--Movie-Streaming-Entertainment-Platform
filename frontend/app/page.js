'use client';

import { useState, useEffect } from "react";
import Navbar from "./component/Navber";
import Footer from "./component/footer";
import Movie from "./component/movie";
import Genre from "./component/Genre";
import HeaderSlider from "./component/HeaderSlider";
import 'boxicons/css/boxicons.min.css';

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("Latest");
  const [latestMovies, setLatestMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    async function fetchLatestMovies() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/latestmovies`);
        if (!response.ok) throw new Error('Failed to fetch latest movies');
        const result = await response.json();
        if (result.success) {
          const publicmovies = result.data.slice(0, 12);
          setLatestMovies(publicmovies.reverse());
        } else {
          alert('Error fetching latestMovies');
        }
      } catch (err) {
        setError(err.message);
      }
    }
    fetchLatestMovies();
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/movie`);
        if (!response.ok) throw new Error('Failed to fetch movies');
        const result = await response.json();
        if (result.success) {
          const movie = result.data.sort(() => 0.11 - Math.random()).slice(0, 12);
          setMovies(movie);
        } else {
          alert('Error fetching Movies');
        }
      } catch (err) {
        setError(err.message);
      }
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/series`);
        if (!response.ok) throw new Error('Failed to fetch series');
        const result = await response.json();
        if (result.success) {
          const series = result.data.sort(() => 0.11 - Math.random()).slice(0, 12);
          setSeries(series);
        } else {
          alert('Error fetching Series');
        }
      } catch (err) {
        setError(err.message);
      }
    }
    fetchSeries();
  }, []);
  
  useEffect(() => {
    async function fetchAnime() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/anime`);
        if (!response.ok) throw new Error('Failed to fetch anime');
        const result = await response.json();
        if (result.success) {
          const anime = result.data.sort(() => 0.11 - Math.random()).slice(0, 12);
          setAnime(anime);
        } else {
          alert('Error fetching anime');
        }
      } catch (err) {
        setError(err.message);
      }
    }
    fetchAnime();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black">
      <Navbar />
      <HeaderSlider />
      <div className="mx-[3vw] mt-4 sm:mx-[5vw]">
        <div className="grid grid-cols-2 ml-9 sm:grid-cols-4">
          <button onClick={() => setSelectedSection("Latest")} className="font-semibold text-white text-[22px] flex items-center">
            <i className='bx bx-chevrons-up'></i>
            Latest
          </button>
          <button onClick={() => setSelectedSection("Movies")} className="font-semibold text-white text-[22px] flex items-center">
            <i className='bx bx-camera-movie' ></i>
            Movies
          </button>
          <button onClick={() => setSelectedSection("Series")} className="font-semibold text-white text-[22px] flex items-center">
            <i className='bx bxs-star'></i>
            Series
          </button>
          <button onClick={() => setSelectedSection("anime")} className="font-semibold text-white text-[22px] flex items-center">
          <i className='bx bx-movie'></i>
            Anime
          </button>
        </div>
        <hr className="mb-3 border-gray-700" />
        {selectedSection === "Latest" && (
          <div className="grid items-center grid-cols-2 gap-4 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.isArray(latestMovies) && latestMovies.length > 0 ? (
              latestMovies.map((movie) => (
                <Movie
                  key={movie._id}
                  slug={movie.slug}
                  title={movie.title}
                  smposter={movie.smposter}
                  rating={movie.rating}
                  year={movie.year}
                />
              ))
            ) : (
              <p className="text-center text-white">No Movies available.</p>
            )}
          </div>
        )}
        {selectedSection === "Movies" && (
          <div className="grid items-center grid-cols-2 gap-4 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.isArray(movies) && movies.length > 0 ? (
              movies.map((movie) => (
                <Movie
                  key={movie._id}
                  slug={movie.slug}
                  title={movie.title}
                  smposter={movie.smposter}
                  rating={movie.rating}
                  year={movie.year}
                />
              ))
            ) : (
              <p className="text-center text-white">No Movies available.</p>
            )}
          </div>
        )}
        {selectedSection === "Series" && (
          <div className="grid items-center grid-cols-2 gap-4 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.isArray(series) && series.length > 0 ? (
              series.map((movie) => (
                <Movie
                  key={movie._id}
                  slug={movie.slug}
                  title={movie.title}
                  smposter={movie.smposter}
                  rating={movie.rating}
                  year={movie.year}
                />
              ))
            ) : (
              <p className="text-center text-white">No Series available.</p>
            )}
          </div>
        )}
        {selectedSection === "anime" && (
          <div className="grid items-center grid-cols-2 gap-4 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.isArray(anime) && anime.length > 0 ? (
            anime.map((movie) => (
              <Movie
                key={movie._id}
                slug={movie.slug}
                title={movie.title}
                smposter={movie.smposter}
                rating={movie.rating}
                year={movie.year}
              />
            ))
          ) : (
            <p className="text-center text-white">No anime available.</p>
          )}
        </div>
        )}
      </div>
      <hr className="border-gray-700 w-[80vw] mx-auto mt-3" />
      <Genre />
      <Footer />
    </div>
  );
}
