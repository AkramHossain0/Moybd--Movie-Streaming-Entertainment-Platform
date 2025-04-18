'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Movie from './movie';
import 'boxicons/css/boxicons.min.css';

function Genre() {
    const [selectedGenre, setSelectedGenre] = useState('Action'); 
    const [movies, setMovies] = useState([]); 
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const router = useRouter();

    const genreAPIs = {
        Adventure: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Adventure`,
        Comedy: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Comedy`,
        Action: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Action`,
        Drama: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Drama`,
        Crime: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Crime`,
        Animation: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Animation`,
        Fantasy: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Fantasy`,
        Horror: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Horror`,
        Science_Fiction: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Science_Fiction`,
        Romance: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Romance`,
        Thriller: `${process.env.NEXT_PUBLIC_API_URL}/api/genre/Thriller`,
    };

    useEffect(() => {
        if (!selectedGenre) return;

        const fetchMovies = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(genreAPIs[selectedGenre]);
                if (!response.ok) throw new Error('Failed to fetch movies');
                const data = await response.json();
                setMovies(data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [selectedGenre]);

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
    };

    const navigateToGenrePage = () => {
        if (selectedGenre) {
            router.push(`/${selectedGenre}`);
        }
    };

    return (
        <>
            <div className='w-[80vw] mx-auto space-y-4'>
                <h1 className='text-3xl font-semibold text-center text-white'>All Genres</h1>
                <div className='flex flex-wrap justify-center gap-4'>
                    {Object.keys(genreAPIs).map((genre) => (
                        <button
                            key={genre}
                            type='button'
                            onClick={() => handleGenreClick(genre)}
                            className={`px-4 py-2 rounded-lg text-sm tracking-wider font-medium border border-current outline-none bg-gray-900 hover:bg-transparent text-white hover:bg-red-600 transition-all duration-300 ${selectedGenre === genre ? 'bg-red-600' : ''
                                }`}
                        >
                            {genre.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>
            {/* Movies */}
            <div className='mx-[3vw] mt-4 sm:mx-[5vw]'>
                {isLoading ? (
                    <p className='text-center text-white'>Loading...</p>
                ) : error ? (
                    <p className='text-center text-red-500'>Error: {error}</p>
                ) : movies.length > 0 ? (
                    <>
                        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {movies.slice(0, 12).map((movie) => (
                                <div key={movie.slug} className='flex flex-col items-center p-2 rounded-lg'>
                                    <Movie
                                        key={movie.slug}
                                        slug={movie.slug}
                                        title={movie.title}
                                        smposter={movie.smposter}
                                        rating={movie.rating}
                                        year={movie.year}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Navigate Button */}
                        <div className='mt-4 text-center'>

                            <button
                                onClick={navigateToGenrePage}
                                className="bg-white text-center w-44 rounded-2xl h-14 relative text-black text-xl font-semibold border-4 border-white group"
                            >
                                <div
                                    className="bg-[#f02828] rounded-xl h-12 w-1/4 grid place-items-center absolute right-0 top-0 group-hover:w-full z-10 duration-500"
                                >
                                    <i className='bx bx-right-arrow-alt'></i>
                                </div>
                                <p className="-translate-x-4">Next Page</p>
                            </button>

                        </div>
                    </>
                ) : (
                    <p className='text-center text-white'>No movies found.</p>
                )}
            </div>
        </>
    );
}

export default Genre;
