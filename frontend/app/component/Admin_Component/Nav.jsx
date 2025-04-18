'use client';

import React, { useEffect, useState } from 'react';
import DeleteBtn from './deleteBtn';
import UpdateBtn from './UpdateBtn';

function Nav() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch movies from API
    useEffect(() => {
        async function fetchMovies() {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/movies`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                setMovies(data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMovies();
    }, []);

    // Filter movies based on search query
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const results = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredMovies(results);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, movies]);

    return (
        <>
            <div className='flex items-center w-[70vw] ml-auto justify-around pt-2 '>
                <h1 className='mb-4 text-3xl font-bold text-black'>Admin Panel</h1>

                <div>
                    <div className="flex px-4 py-3 border-2 border-blue-500 rounded-md w-[300px]">
                        <input
                            type="text"
                            placeholder="Search Something..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full text-sm text-gray-600 bg-transparent outline-none"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 192.904 192.904"
                            width="16px"
                            className="fill-gray-600"
                        >
                            <path d="M190.707 180.101L143.629 133.024c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
                        </svg>
                    </div>

                    <div>
                        {isLoading && <p className="mt-2 text-sm text-blue-500">Loading movies...</p>}
                        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                        {!isLoading && !error && searchQuery && (
                            <div className="absolute z-10 flex flex-col w-[300px] gap-0.5 p-2 rounded-xl bg-[#dcdcdc] h-[50vh] overflow-auto ">
                                {filteredMovies.length > 0 ? (
                                    filteredMovies.map(movie => (
                                        <React.Fragment key={movie._id}>
                                            <div className="flex items-center gap-4 shadow-lg">
                                                <img
                                                    src={movie.smposter}
                                                    alt={movie.title}
                                                    className="w-12 h-12 rounded-md"
                                                />
                                                <div className='flex flex-col'>
                                                    <span className="mt-1 text-sm font-semibold">
                                                        {movie.title}
                                                    </span>
                                                    <div className='flex gap-2 mb-1'>
                                                        <button className="text-xs ">
                                                            <UpdateBtn movieId={movie._id} />
                                                        </button>
                                                        <button className="text-xs ">
                                                            <DeleteBtn movieId={movie._id} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="border-gray-900 " />
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <p className="text-sm text-center text-black">No data available</p>
                                )}

                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
}

export default Nav;
