'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DeleteBtn from './deleteBtn';
import UpdateBtn from './UpdateBtn';

function Dashboard() {
    const [data, setData] = useState({ MovieCount: 0, commentCount: 0, userCount: 0, publicMovieCount: 0, draftMovieCount: 0 });
    const [movies, setMovies] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`);
                if (!response.ok) throw new Error('Failed to fetch dashboard data');
                const result = await response.json();
                if (result.success) {
                    setData(result.data);
                } else {
                    setError('Error fetching dashboard data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingData(false);
            }
        }

        fetchDashboardData();
    }, []);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/publicmovies`);
                if (!response.ok) throw new Error('Failed to fetch movies');
                const result = await response.json();
                if (result.success) {
                    setMovies(result.data.reverse());
                } else {
                    setError('Error fetching movies');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingMovies(false);
            }
        }

        fetchMovies();
    }, []);

    if (loadingData || loadingMovies) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-[80vw] ml-auto">
            {/* Dashboard Header */}
            <div className="grid md:grid-cols-3 gap-6 min-h-[164px] py-8 p-16 bg-gradient-to-r from-blue-500 to-black font-sans overflow-hidden rounded-2xl mt-3">
                <div className="md:col-span-2">
                    <h1 className="text-3xl font-bold text-white">Explore all types of movies here</h1>
                    <p className="mt-4 text-base text-gray-200">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore natus reiciendis quidem architecto distinctio illum maxime, pariatur debitis saepe! Error!
                    </p>
                    <button
                        type="button"
                        className="px-6 py-3 mt-8 text-sm font-semibold text-blue-600 bg-white rounded-md hover:bg-slate-100"
                    >
                        Exclusive On Makmovies
                    </button>
                </div>
                <div className="relative max-md:hidden">
                    <img
                        src="https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2016/01/horrormovieposterscollage.jpg?fit=1744%2C1117&ssl=1"
                        alt="Banner Image"
                        className="w-full right-4 top-[-13px] md:absolute skew-x-[-16deg] rotate-2 object-cover"
                    />
                </div>
            </div>

            {/* Dashboard Stats */}
            <div className="flex gap-2 pl-2">
                <div className="w-[190px] bg-slate-300 mt-4 p-2 rounded-2xl">
                    <div className="flex items-center justify-around">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)' }}>
                            <path d="M20 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-6 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM19 15H9v-.25C9 12.901 11.254 11 14 11s5 1.901 5 3.75V15z"></path><path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z"></path></svg>
                        <h2 className="text-lg font-semibold">Total Users</h2>
                    </div>
                    <div className="flex items-center justify-center mt-auto">
                        <h2 className="p-3 text-2xl font-semibold rounded-2xl">{data.userCount}</h2>
                    </div>
                </div>

                <div className="w-[200px] bg-slate-300 mt-4 p-2 rounded-2xl">
                    <div className="flex justify-around">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)' }}><path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"></path><path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path></svg>
                        <h2 className="text-lg font-semibold">Total Comments</h2>
                    </div>
                    <div className="flex items-center justify-center mt-auto">
                        <h2 className="p-3 text-2xl font-semibold rounded-2xl">{data.commentCount}</h2>
                    </div>
                </div>

                <div className="w-[190px] bg-slate-300 mt-4 p-2 rounded-2xl">
                    <div className="flex justify-around">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)' }}>
                            <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 6h-3.465l-2.667-4H20v4zm-9.536 0-2.667-4H8.869l2.667 4h-.072zm5 0L13.767 5h2.596l2.667 4h-2.596zM4 5h2.465l2.667 4H4V5zm0 14v-8h16v8H4z"></path>
                            <path d="m10 18 5.5-3-5.5-3z"></path>
                        </svg>
                        <h2 className="text-lg font-semibold">Total Movies</h2>
                    </div>
                    <div className="flex items-center justify-center mt-auto">
                        <h2 className="p-3 text-2xl font-semibold rounded-2xl">{data.MovieCount}</h2>
                    </div>
                </div>

                <div className="w-[220px] bg-slate-300 mt-4 p-2 rounded-2xl">
                    <div className="flex justify-around">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)' }}>
                            <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 6h-3.465l-2.667-4H20v4zm-9.536 0-2.667-4H8.869l2.667 4h-.072zm5 0L13.767 5h2.596l2.667 4h-2.596zM4 5h2.465l2.667 4H4V5zm0 14v-8h16v8H4z"></path>
                            <path d="m10 18 5.5-3-5.5-3z"></path>
                        </svg>
                        <h2 className="text-lg font-semibold">Total Public Movies</h2>
                    </div>
                    <div className="flex items-center justify-center mt-auto">
                        <h2 className="p-3 text-2xl font-semibold rounded-2xl">{data.publicMovieCount}</h2>
                    </div>
                </div>

                <div className="w-[220px]  bg-slate-300 mt-4 p-2 rounded-2xl">
                    <div className="flex justify-around">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 0, 0, 1)' }}>
                            <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 6h-3.465l-2.667-4H20v4zm-9.536 0-2.667-4H8.869l2.667 4h-.072zm5 0L13.767 5h2.596l2.667 4h-2.596zM4 5h2.465l2.667 4H4V5zm0 14v-8h16v8H4z"></path>
                            <path d="m10 18 5.5-3-5.5-3z"></path>
                        </svg>
                        <h2 className="text-lg font-semibold">Total Draft Movies</h2>
                    </div>
                    <div className="flex items-center justify-center mt-auto">
                        <h2 className="p-3 text-2xl font-semibold rounded-2xl">{data.draftMovieCount}</h2>
                    </div>
                </div>
            </div>

            {/* Latest Movies */}
            <div className='w-[60vw] ml-6'>
                <div className="mt-3">
                    <div className="flex justify-between mx-2">
                        <h1 className="text-3xl font-semibold text-center text-black">| List Of Latest Movies</h1>
                        <Link href="/admin/addmovie">
                            <button
                                type="button"
                                className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-transparent text-white hover:text-blue-700 transition-all duration-300 "
                            >
                                Add
                            </button>
                        </Link>
                    </div>
                    {Array.isArray(movies) && movies.length > 0 ? (
                        movies.slice(0, 5).map((movie, index) => (
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
                                            <span>{movie.rating}</span>
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

                <Link href='/admin/movie'>
                    <div className="flex items-center justify-center mt-3">
                        <div className="relative group">
                            <button
                                className="relative inline-block p-px font-semibold leading-6 text-white transition-transform duration-300 ease-in-out bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 hover:scale-105 active:scale-95"

                            >
                                <span
                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                ></span>

                                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                                    <div className="relative z-10 flex items-center space-x-2">
                                        <span className="transition-all duration-500 group-hover:translate-x-1">
                                            Load more
                                        </span>
                                        <svg
                                            className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                            data-slot="icon"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </span>
                            </button>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;
