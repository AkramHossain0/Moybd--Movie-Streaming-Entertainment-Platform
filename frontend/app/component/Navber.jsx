"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/movies`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Filter movies based on the search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const results = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(results);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, movies]);

  // Navigate to the movie details page
  const movieDetails = (slug) => {
    router.push(`/download/${slug}`);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const storedLoginStatus =
        Cookies.get("isLoggedIn") ||
        sessionStorage.getItem("isLoggedIn") ||
        localStorage.getItem("isLoggedIn");
      if (storedLoginStatus === "true") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isLoggedIn");
    Cookies.remove("token");
    Cookies.remove("isLoggedIn");
    setIsLoggedIn(false);
    setShowModal(false);
    router.push("/");
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between py-3 px-[2.5%]">
        {/* Logo and Search */}
        <div className="flex items-center">
          <div className="flex items-center lg:justify-center">
            <a href="/" className="flex items-center space-x-2 text-white">
              <span
                className="text-2xl sm:text-4xl font-semibold animate-gradient-text"
                style={{
                  background: "linear-gradient(90deg, red, blue)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradientAnimation 3s infinite",
                }}
              >
                MOYBD
              </span>
            </a>
            <style jsx>{`
              @keyframes gradientAnimation {
                0% {
                  background-position: 0%;
                }
                100% {
                  background-position: 100%;
                }
              }
              .animate-gradient-text {
                background-size: 200% 200%;
              }
            `}</style>
          </div>
          <div className="relative ml-4 md:block">
            <input
              type="text"
              placeholder="Search"
              className="w-[55vw] sm:w-[40vw] md:w-[35vw] lg:w[60vw] py-2 pl-8 pr-4 border border-red-500 focus:outline-none focus:shadow-[0_0_9px_rgba(254,0,0,0.8)] rounded-xl bg-transparent text-white text-sm"
              aria-label="Search bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
              </svg>
            </span>
            {/* Search Results */}
            {searchQuery && (
              <div className="absolute z-50 w-full mt-2 bg-[#dcdcdc] rounded-xl p-4 shadow-lg top-full overflow-auto h-[60vh]">
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">Error: {error}</p>
                ) : filteredMovies.length ? (
                  filteredMovies.map((movie) => (
                    <div key={movie._id}>
                      <div
                        onClick={() => movieDetails(movie.slug)}
                        role="button"
                        className="flex items-center gap-4 mb-2 cursor-pointer"
                      >
                        <img
                          src={movie.smposter}
                          alt={movie.title}
                          className="w-12 h-16 rounded-md"
                        />
                        <div className="flex flex-col text-black">
                          <p className="text-sm font-bold sm:text-base md:text-lg">
                            Title: {movie.title}
                          </p>
                          <div className="flex flex-col sm:gap-2 sm:flex-row">
                            <p className="text-xs font-semibold md:text-sm">
                              Rating: {movie.rating}
                            </p>
                            <p className="text-xs font-semibold md:text-sm">
                              Year: {movie.year}
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr className="pb-3 border-gray-900" />
                    </div>
                  ))
                ) : (
                  <p className="text-black">No results found</p>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Desktop Menu */}
        <div className="items-center hidden space-x-2 md:flex lg:space-x-4">
          <a href="/" className="font-semibold text-white hover:text-red-500">
            Home
          </a>
          <a
            href="/movies"
            className="font-semibold text-white hover:text-red-500"
          >
            Movies
          </a>
          <a
            href="/series"
            className="font-semibold text-white hover:text-red-500"
          >
            Series
          </a>
          <div className="relative group">
            <button
              className="flex items-center font-semibold text-white hover:text-red-500"
              onClick={toggleDropdown}
            >
              Categories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                className="ml-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"></path>
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="absolute mt-2 text-white bg-gray-800 rounded-md shadow-lg w-[200px] z-50">
                <li className="px-4 py-2 hover:bg-gray-700">
                  <a href="/Hollywood">Hollywood</a>
                </li>
                <hr className="border-t-gray-400 w-[90%] mx-auto" />
                <li className="px-4 py-2 hover:bg-gray-700">
                  <a href="/Bollywood">Bollywood</a>
                </li>
                <hr className="border-t-gray-400 w-[90%] mx-auto" />
                <li className="px-4 py-2 hover:bg-gray-700">
                  <a href="/South"> South</a>
                </li>
                <hr className="border-t-gray-400 w-[90%] mx-auto" />
                <li className="px-4 py-2 hover:bg-gray-700">
                  <a href="/Marvel_Studio"> Marvel Studio</a>
                </li>
                <hr className="border-t-gray-400 w-[90%] mx-auto" />
                <li className="px-4 py-2 hover:bg-gray-700">
                  <a href="/Gujarati"> Gujarati</a>
                </li>
                <hr className="border-t-gray-400 w-[90%] mx-auto" />
                <li className="px-4 py-2 hover:bg-gray-700">
                  <a href="/TV_Shows"> TV Shows</a>
                </li>
                <hr className="border-t-gray-400 w-[90%] mx-auto" />
                <li className="px-4 py-2 hover:bg-gray-700">
                  <a href="/Web_Series"> Web Series</a>
                </li>
                <hr className="border-t-gray-400 w-[90%] mx-auto" />
                <li className="px-4 py-2 hover:bg-gray-700">
                  <a href="/anime">Anime</a>
                </li>
              </ul>
            )}
          </div>
          <a
            href="/contact"
            className="font-semibold text-white hover:text-red-500"
          >
            Contact
          </a>
          {!isLoggedIn ? (
            <>
              <a
                href="/login"
                className="px-3 py-1 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700"
              >
                Sign In
              </a>
            </>
          ) : (
            <button
              onClick={handleLogoutClick}
              className="relative flex items-center justify-start overflow-hidden transition-all duration-200 bg-red-600 rounded-full shadow-lg cursor-pointer group w-11 h-11 hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
            >
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className="absolute text-lg font-semibold text-white transition-all duration-300 transform translate-x-full opacity-0 right-5 group-hover:translate-x-0 group-hover:opacity-100">
                Logout
              </div>
            </button>
          )}
        </div>
        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="text-white md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 bg-gray-900 w-[60vw] h-full top-16 md:hidden rounded-2xl">
          <div className="relative left-[10%] flex flex-col py-4 space-y-4 mt-3">
            <ul>
              <li className="py-2 border-b">
                <a
                  href="/"
                  className="block font-semibold text-white hover:text-red-500"
                >
                  Home
                </a>
              </li>
              <li className="py-2 border-b">
                <a
                  href="/movies"
                  className="block font-semibold text-white hover:text-red-500"
                >
                  Movies
                </a>
              </li>
              <li className="py-2 border-b">
                <a
                  href="/series"
                  className="block font-semibold text-white hover:text-red-500"
                >
                  Series
                </a>
              </li>
              <div className="relative py-2 border-b">
                <button
                  onClick={toggleDropdown}
                  className="hover:text-red-500 text-white font-semibold hover:fill-[red] block fill-[white]"
                >
                  Category
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    className="inline-block ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                      data-name="16"
                      data-original="#000000"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <ul className="py-2 space-y-1 bg-gray-900 ">
                    <li className="py-1">
                      <a
                        href="/Hollywood"
                        className="block text-sm font-bold text-white hover:text-red-500"
                      >
                        Hollywood
                      </a>
                    </li>
                    <li className="py-1">
                      <a
                        href="/Bollywood"
                        className="block text-sm font-bold text-white hover:text-red-500"
                      >
                        Bollywood
                      </a>
                    </li>
                    <li className="py-1">
                      <a
                        href="/South"
                        className="block text-sm font-bold text-white hover:text-red-500"
                      >
                        South
                      </a>
                    </li>
                    <li className="py-1">
                      <a
                        href="/Marvel_Studio"
                        className="block text-sm font-bold text-white hover:text-red-500"
                      >
                        Marvel Studio
                      </a>
                    </li>
                    <li className="py-1">
                      <a
                        href="/Gujarati"
                        className="block text-sm font-bold text-white hover:text-red-500"
                      >
                        Gujarati
                      </a>
                    </li>
                    <li className="py-1">
                      <a
                        href="/TV_Shows"
                        className="block text-sm font-bold text-white hover:text-red-500"
                      >
                        TV Shows
                      </a>
                    </li>
                    <li className="py-1">
                      <a
                        href="/Web_Series"
                        className="block text-sm font-bold text-white hover:text-red-500"
                      >
                        Web Series
                      </a>
                    </li>
                    <li className="py-1">
                      <a
                        href="/anime"
                        className="block text-sm font-bold text-white hover:text-red-500"
                      >
                        Anime
                      </a>
                    </li>
                  </ul>
                )}
              </div>

              <li className="py-2 border-b">
                <a
                  href="/contact"
                  className="block font-semibold text-white hover:text-red-500"
                >
                  Contact
                </a>
              </li>
              {!isLoggedIn ? (
                <>
                  <li className="py-2 border-b">
                    <a
                      href="/login"
                      className="px-3 py-1 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700"
                    >
                      Sign In
                    </a>
                  </li>
                </>
              ) : (
                <li className="py-2 border-b">
                  <button
                    onClick={handleLogoutClick}
                    className="block font-semibold text-red-500 "
                  >
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="relative w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleCancelLogout}
              className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>

            <div className="my-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline w-14 fill-red-500"
                viewBox="0 0 286.054 286.054"
              >
                <path
                  fill="#e2574c"
                  d="M143.027 0C64.04 0 0 64.04 0 143.027c0 78.996 64.04 143.027 143.027 143.027 78.996 0 143.027-64.022 143.027-143.027C286.054 64.04 222.022 0 143.027 0zm0 259.236c-64.183 0-116.209-52.026-116.209-116.209S78.844 26.818 143.027 26.818s116.209 52.026 116.209 116.209-52.026 116.209-116.209 116.209zm.009-196.51c-10.244 0-17.995 5.346-17.995 13.981v79.201c0 8.644 7.75 13.972 17.995 13.972 9.994 0 17.995-5.551 17.995-13.972V76.707c-.001-8.43-8.001-13.981-17.995-13.981zm0 124.997c-9.842 0-17.852 8.01-17.852 17.86 0 9.833 8.01 17.843 17.852 17.843s17.843-8.01 17.843-17.843c-.001-9.851-8.001-17.86-17.843-17.86z"
                  data-original="#e2574c"
                />
              </svg>

              <h4 className="mt-6 text-lg font-semibold text-gray-800">
                Are you sure you want to logout?
              </h4>
            </div>

            <div className="flex gap-4 max-sm:flex-col">
              <button
                type="button"
                onClick={handleCancelLogout}
                className="px-5 py-2.5 rounded-lg w-full tracking-wide text-gray-800 text-sm border-none outline-none bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-lg w-full tracking-wide text-white text-sm border-none outline-none bg-red-500 hover:bg-red-600"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
