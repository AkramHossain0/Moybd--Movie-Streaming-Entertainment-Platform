'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DeleteBtn from '@/app/component/Admin_Component/deleteBtn';
import UpdateBtn from '@/app/component/Admin_Component/UpdateBtn';

function Page() {
    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 12;

    // Fetch movies from the API
    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/draftmovies`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const result = await response.json();
                if (result.success) {
                    setMovies(result.data.reverse());
                } else {
                    setError('Error fetching movies');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    
    // Pagination
    const totalMovies = movies.length;
    const totalPages = Math.ceil(totalMovies / moviesPerPage);

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderPagination = () => {
        const pages = [];
        const pageRange = 2; 

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - pageRange && i <= currentPage + pageRange)
            ) {
                pages.push(
                    <li
                        key={i}
                        className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold px-[13px] h-9 rounded-md ${i === currentPage ? 'bg-blue-100 text-gray-800' : 'bg-gray-200 text-gray-600'
                            }`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </li>
                );
            } else if (
                (i === currentPage - pageRange - 1 && currentPage - pageRange > 1) ||
                (i === currentPage + pageRange + 1 && currentPage + pageRange < totalPages)
            ) {
                pages.push(
                    <li key={i} className="flex items-center justify-center text-gray-500 px-[13px]">
                        ...
                    </li>
                );
            }
        }

        return pages;
    };

    return (
        <>
            <div className="w-[60vw] mx-auto mt-3">
                <div className='flex justify-between mx-2'>
                    <h1 className="text-3xl font-semibold text-center text-black">| Draft Movie List</h1>
                    <Link href='/admin/addmovie'>
                        <button
                            type="button"
                            className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-transparent text-white hover:text-blue-700 transition-all duration-300"
                        >
                            Add
                        </button>
                    </Link>
                </div>

                {Array.isArray(currentMovies) && currentMovies.length > 0 ? (
                    currentMovies.map((movie, index) => (
                        <div
                            key={index}
                            className="flex flex-row gap-3 p-4 mt-2 border shadow-sm bg-slate-300 rounded-2xl"
                        >
                            <div>
                                <img
                                    src={movie.bgposter}
                                    alt={movie.title}
                                    className="w-[250px] h-auto rounded-xl"
                                />
                            </div>
                            <div className='flex flex-col py-1'>
                                <div>
                                    <h2 className="text-base font-bold">{movie.title}</h2>
                                    <p className="text-sm font-semibold">{movie.category}</p>
                                    {movie.youtubelink}
                                    <p className="flex items-center mt-2 gap-0.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            style={{ fill: 'rgba(0, 0, 0, 1)' }}
                                        >
                                            <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path>
                                        </svg>
                                        {movie.rating}
                                    </p>
                                </div>
                                <div className='flex gap-2'>
                                    <DeleteBtn movieId={movie._id} />
                                    <UpdateBtn movieId={movie._id} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No movies available.</p>
                )}
            </div>

            <div className='flex items-center justify-center my-4'>
                <ul className="flex justify-center space-x-4 ">
                    <li
                        className={`flex items-center justify-center bg-gray-200 rounded-md cursor-pointer shrink-0 w-9 h-9 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-700" viewBox="0 0 55.753 55.753">
                            <path
                                d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                                data-original="#000000" />
                        </svg>
                    </li>
                    {renderPagination()}
                    <li
                        className={`flex items-center justify-center bg-gray-200 rounded-md cursor-pointer shrink-0 w-9 h-9 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 rotate-180 fill-gray-700" viewBox="0 0 55.753 55.753">
                            <path
                                d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                                data-original="#000000" />
                        </svg>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Page;
