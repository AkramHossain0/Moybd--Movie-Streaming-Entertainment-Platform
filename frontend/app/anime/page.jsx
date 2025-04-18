'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navber';
import Footer from '../component/footer';
import Movie from '../component/movie';
import Loading from '../component/Loading';

function App() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const moviesPerPage = 24;

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/anime`);
            const data = await response.json();
            setMovies(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setLoading(false);
        }
    };

    // Pagination logic
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPaginationNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => paginate(i)}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === i
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-red-700'
                            }`}
                    >
                        {i}
                    </button>
                );
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pages.push(
                    <span key={i} className="px-2 text-gray-500">
                        ...
                    </span>
                );
            }
        }
        return pages;
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="min-h-screen text-white bg-black">
            <Navbar />
            {/* Movie Grid */}
            <main className="mx-[3vw] mt-4 sm:mx-[5vw] ">
                <h1 className="text-3xl font-semibold text-center text-white">
                    Explore Top Anime Series: Reviews, Ratings & Recommendations
                </h1>
                <p className='text-center text-gray-300 w-[70vw] mx-auto py-2'>
                    Dive into the vibrant world of anime! From action-packed adventures to heartwarming tales, explore in-depth reviews, ratings, and must-watch recommendations tailored for every otaku. Stay captivated with the best in Japanese storytelling and animation!
                </p>
                <hr className="mb-5 border-gray-600 w-[80vw] mx-auto" />
                <div className="grid items-center grid-cols-2 gap-4 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {currentMovies.map((movie) => (
                        <Movie
                            key={movie._id}
                            slug={movie.slug}
                            title={movie.title}
                            smposter={movie.smposter}
                            rating={movie.rating}
                            year={movie.year}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center mt-12">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-1 text-gray-300 bg-gray-800 rounded hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-gray-800"
                    >
                        Prev
                    </button>

                    {renderPaginationNumbers()}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-1 text-gray-300 bg-gray-800 rounded hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-gray-800"
                    >
                        Next
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;