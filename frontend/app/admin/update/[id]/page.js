'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function UpdateMovie() {
    const params = useParams(); 
    const router = useRouter();
    const id = params.id; 
    const [movieToUpdate, setMovieToUpdate] = useState(null);
    const [activeButtons, setActiveButtons] = useState([]);
    const [updatedData, setUpdatedData] = useState({
        title: '',
        slug: '',
        bgposter: '',
        smposter: '',
        titlecategory: '',
        description: '',
        rating: '',
        duration: '',
        year: '',
        genre: '',
        language: '',
        subtitle: '',
        size: '',
        quality: '',
        youtubelink: '',
        category: '',
        watchonline: '',
        downloadlink: {
            "360p": '',
            "480p": '',
            "720p": '',
            "1080p": '',
            "4k": ''
        },
        status: ''
    });

    useEffect(() => {
        if (id) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setMovieToUpdate(data.movie);
                        setUpdatedData(data.movie);
                    } else {
                        console.error('Failed to fetch movie data');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching movie data:', error);
                });
        }
    }, [id]);

    if (!id || !movieToUpdate) return <p>Loading...</p>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Movie updated successfully!');
                    router.push('/admin');
                } else {
                    alert(`Failed to update movie: ${data.message || 'Unknown error'}`); 
                }
            })
            .catch((error) => {
                alert(`Error updating movie: ${error.message || 'Unknown error'}`);
            });
    };
    
    const handleCancel = () => {
        router.push('/admin'); 
    };

    const handleButtonClick = (resolution) => {
        setActiveButtons((prevButtons) => {
            if (prevButtons.includes(resolution)) {
                return prevButtons.filter((button) => button !== resolution);
            } else {
                return [...prevButtons, resolution];
            }
        });
    };
    
    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
            <div className='pb-5'>
                <h2 className='mt-3 text-3xl font-semibold text-center text-black'>Update Movie</h2>
                <div className='p-6 bg-slate-300 md:gap-7 rounded-xl md:mx-[10vw] justify-center flex flex-col md:flex-row mr-2 pl-20'>
                    <div>
                        <div className='flex flex-col'>
                            <label className='py-1 text-sm font-bold' htmlFor="bgposter">Background Poster</label>
                            <input
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                type="text"
                                name="bgposter"
                                id="bgposter"
                                value={updatedData.bgposter}
                                onChange={handleChange}
                                placeholder='Background poster link' />
                        </div>
                        <div className='flex flex-col pt-5'>
                            <label className='py-1 text-sm font-bold' htmlFor="title">Title</label>
                            <input
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                type="text"
                                name="title"
                                id="title"
                                value={updatedData.title}
                                onChange={handleChange}
                                placeholder='Enter small title' />
                        </div>
                        <div className='flex flex-col pt-5'>
                            <label className='py-1 text-sm font-bold' htmlFor="description">Description</label>
                            <textarea
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px] h-[200px] resize-none'
                                type="text"
                                name="description"
                                id="description"
                                value={updatedData.description}
                                onChange={handleChange}
                                placeholder='Enter small description' />
                        </div>
                        <div className='flex flex-col pt-5'>
                            <label className='py-1 text-sm font-bold' htmlFor="duration">Duration</label>
                            <input
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                type="text"
                                name="duration"
                                id="duration"
                                value={updatedData.duration}
                                onChange={handleChange}
                                placeholder='Duration' />
                        </div>
                        <div className='flex flex-col pt-5'>
                            <label className='py-1 text-sm font-bold' htmlFor="duration">Rating</label>
                            <input
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                type="text"
                                name="rating"
                                id="rating"
                                value={updatedData.rating}
                                onChange={handleChange}
                                placeholder='Duration' />
                        </div>
                        <div className='flex flex-col pt-5'>
                            <label className='py-1 text-sm font-bold' htmlFor="duration">Watch online link</label>
                            <input
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                type="text"
                                name="watchonline"
                                id="watchonline"
                                value={updatedData.watchonline}
                                onChange={handleChange}
                                placeholder='Duration' />
                        </div>

                        <div className='flex flex-col pt-5'>
                            <h2 className="mb-2 font-bold">Download link</h2>
                            <div className='flex flex-col gap-1 md:flex-row'>
                                <div className="flex mb-2 space-x-2">
                                    {['360p', '480p'].map(resolution => (
                                        <div
                                            key={resolution}
                                            className={`px-4 py-2 rounded ${activeButtons.includes(resolution) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                                            onClick={() => handleButtonClick(resolution)}
                                        >
                                            {activeButtons.includes(resolution) ? `Hide ${resolution}` : `Show ${resolution}`}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex mb-2 space-x-2">
                                    {['720p', '1080p', '4k'].map(resolution => (
                                        <div
                                            key={resolution}
                                            className={`px-4 py-2 rounded ${activeButtons.includes(resolution) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                                            onClick={() => handleButtonClick(resolution)}
                                        >
                                            {activeButtons.includes(resolution) ? `Hide ${resolution}` : `Show ${resolution}`}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {activeButtons.map(resolution => (
                                <input
                                    key={resolution}
                                    type="text"
                                    value={updatedData.downloadlink[resolution]}
                                    onChange={(e) => setUpdatedData({
                                        ...updatedData,
                                        downloadlink: {
                                            ...updatedData.downloadlink,
                                            [resolution]: e.target.value
                                        }
                                    })}
                                    className="w-full p-2 mb-2 border rounded"
                                    placeholder={`${resolution} download link`}
                                />
                            ))}
                        </div>

                        <div className='flex flex-col pt-5'>
                            <h2 className="mb-2 font-bold">Status</h2>
                            <div>
                                <input
                                    className='accent-black'
                                    type="radio"
                                    id="Draft"
                                    value="Draft"
                                    checked={updatedData.status === 'Draft'}
                                    onChange={handleChange}
                                    name="status" />
                                <label htmlFor="Draft" className="ml-2">Draft</label>
                            </div>
                            <div>
                                <input
                                    className='accent-black '
                                    type="radio"
                                    id="Publish"
                                    value="Publish"
                                    checked={updatedData.status === 'Publish'}
                                    onChange={handleChange}
                                    name="status" />
                                <label htmlFor="Publish" className="ml-2">Publish</label>
                            </div>
                        </div>

                    </div>

                    <div>
                        <div className='flex flex-col'>
                            <label className='py-1 text-sm font-bold' htmlFor="smposter">Main Poster Link</label>
                            <input
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                type="text"
                                name="smposter"
                                id="smposter"
                                value={updatedData.smposter}
                                onChange={handleChange}
                                placeholder='Main Poster Link' />
                        </div>

                        <div className='flex flex-col pt-5'>
                            <label className='py-1 text-sm font-bold' htmlFor="slug">Slug (URL)</label>
                            <input
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                type="text"
                                name="slug"
                                value={updatedData.slug}
                                onChange={handleChange}
                                id="slug"
                                placeholder='Enter Slug title' />
                        </div>

                        <div className='flex flex-col pt-5'>
                            <label className='py-1 text-sm font-bold' htmlFor="year">Year</label>
                            <input
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                type="text"
                                name="year"
                                id="year"
                                value={updatedData.year}
                                onChange={handleChange}
                                placeholder='Release year' />
                        </div>

                        <div className='flex flex-col pt-5'>
                            <label className='py-1 text-sm font-bold' htmlFor="youtubelink">Youtube link</label>
                            <input
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                type="text"
                                name="youtubelink"
                                id="youtubelink"
                                value={updatedData.youtubelink}
                                onChange={handleChange}
                                placeholder='Youtube embed link' />
                        </div>

                        <div className='flex flex-col pt-5'>
                            <label className='py-1 text-sm font-bold' htmlFor="language">Select language</label>
                            <select
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                name="language"
                                value={updatedData.language}
                                onChange={handleChange}
                                id="language">
                                <option value="">Select language</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Tamil">Tamil</option>
                                <option value="Telugu">Telugu</option>
                                <option value="Bangla">Bangla</option>
                            </select>
                        </div>

                        <div className='flex flex-col pt-5'>
                            <label className='py-1 text-sm font-bold' htmlFor="quality">Select quality</label>
                            <select
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                name="quality"
                                value={updatedData.quality}
                                onChange={handleChange}
                                id="quality">
                                <option value="">Select quality</option>
                                <option value="480p-720p-1080p-WEB_DL">480p || 720p || 1080p-WEB_DL</option>
                                <option value="480p-720p-1080p-2160p-4k-WEB_DL">480p || 720p || 1080p || 2160p 4k-WEB_DL</option>
                                <option value="480p-720p-1080p-HDTS">480p || 720p || 1080p-HDTS</option>
                            </select>
                        </div>
                        <div className='flex flex-col pt-5'>
                            <label className='py-1 text-sm font-bold' htmlFor="subtitle">Select subtitle</label>
                            <select
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                name="subtitle"
                                value={updatedData.subtitle}
                                onChange={handleChange}
                                id="quality">
                                <option value="">Select subtitle</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Bangla">Bangla</option>

                            </select>
                        </div>

                        <div className='flex flex-col pt-5'>
                            <label className='py-1 text-sm font-bold' htmlFor="size">Select size</label>
                            <input
                                className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                type="text"
                                name="size"
                                id="size"
                                value={updatedData.size}
                                onChange={handleChange}
                                placeholder='350MB || 1GB || 2GB || 4GB -Each Quality' />
                        </div>

                        <div className='flex flex-col gap-6 pt-5 md:flex-row'>
                            <div className='flex gap-4'>
                                <div>
                                    <h2 className="mb-2 font-bold">Title Category :</h2>
                                    <div>
                                        <input
                                            className='accent-black'
                                            type="radio"
                                            id="Movies"
                                            name="titlecategory"
                                            value="Movies"
                                            checked={updatedData.titlecategory === 'Movies'}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="Movies" className="ml-2">Movies</label>
                                    </div>
                                    <div>
                                        <input
                                            className='accent-black'
                                            type="radio"
                                            id="Series"
                                            name="titlecategory"
                                            value="Series"
                                            checked={updatedData.titlecategory === 'Series'}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="Series" className="ml-2">Series</label>
                                    </div>
                                    <div>
                                        <input
                                            className='accent-black'
                                            type="radio"
                                            id="Shows"
                                            name="titlecategory"
                                            value="Shows"
                                            checked={updatedData.titlecategory === 'Shows'}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="Shows" className="ml-2">Shows</label>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="mb-2 font-bold">Category :</h2>
                                    <div>
                                        <input
                                            className='accent-black'
                                            type="radio"
                                            id="Bollywood"
                                            value="Bollywood"
                                            checked={updatedData.category === 'Bollywood'}
                                            onChange={handleChange}
                                            name="category" />
                                        <label htmlFor="Bollywood" className="ml-2">Bollywood</label>
                                    </div>
                                    <div>
                                        <input
                                            className='accent-black'
                                            type="radio"
                                            id="Hollywood"
                                            value="Hollywood"
                                            checked={updatedData.category === 'Hollywood'}
                                            onChange={handleChange}
                                            name="category" />
                                        <label htmlFor="Hollywood" className="ml-2">Hollywood</label>
                                    </div>
                                    <div>
                                        <input
                                            className='accent-black'
                                            type="radio"
                                            id="South"
                                            value="South"
                                            checked={updatedData.category === 'South'}
                                            onChange={handleChange}
                                            name="category" />
                                        <label htmlFor="South" className="ml-2">South</label>
                                    </div>
                                    <div>
                                        <input
                                            className='accent-black'
                                            type="radio"
                                            id="Marvel Studio"
                                            value="Marvel Studio"
                                            checked={updatedData.category === 'Marvel Studio'}
                                            onChange={handleChange}
                                            name="category" />
                                        <label htmlFor="Marvel Studio" className="ml-2">Marvel Studio</label>
                                    </div>
                                    <div>
                                        <input
                                            className='accent-black'
                                            type="radio"
                                            id="Gujarati"
                                            value="Gujarati"
                                            checked={updatedData.category === 'Gujarati'}
                                            onChange={handleChange}
                                            name="category" />
                                        <label htmlFor="Gujarati" className="ml-2">Gujarati</label>
                                    </div>
                                    <div>
                                        <input
                                            className='accent-black'
                                            type="radio"
                                            id="TV Shows"
                                            value="TV Shows"
                                            checked={updatedData.category === 'TV Shows'}
                                            onChange={handleChange}
                                            name="category" />
                                        <label htmlFor="TV Shows" className="ml-2">TV Shows</label>
                                    </div>
                                    <div>
                                        <input
                                            className='accent-black'
                                            type="radio"
                                            id="Web Series"
                                            value="Web Series"
                                            checked={updatedData.category === 'Web Series'}
                                            onChange={handleChange}
                                            name="category" />
                                        <label htmlFor="Web Series" className="ml-2">Web Series</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <h2 className="mb-2 font-bold">Genre:</h2>
                                <div>
                                    <input
                                        className='accent-black'
                                        type="checkbox"
                                        id="action"
                                        value="Action"
                                        checked={updatedData.genre === 'Action'}
                                        onChange={handleChange}
                                        name="genre" />
                                    <label htmlFor="action" className="ml-2">Action</label>
                                </div>
                                <div>
                                    <input
                                        className='accent-black'
                                        type="checkbox"
                                        id="Adventure"
                                        value="Adventure"
                                        checked={updatedData.genre === 'Adventure'}
                                        onChange={handleChange}
                                        name="genre" />
                                    <label htmlFor="Adventure" className="ml-2">Adventure</label>
                                </div>
                                <div>
                                    <input
                                        className='accent-black'
                                        type="checkbox"
                                        id="Animation"
                                        value="Animation"
                                        checked={updatedData.genre === 'Animation'}
                                        onChange={handleChange}
                                        name="genre" />
                                    <label htmlFor="Animation" className="ml-2">Animation</label>
                                </div>
                                <div>
                                    <input
                                        className='accent-black'
                                        type="checkbox"
                                        id="Comedy"
                                        value="Comedy"
                                        checked={updatedData.genre === 'Comedy'}
                                        onChange={handleChange}
                                        name="genre" />
                                    <label htmlFor="Comedy" className="ml-2">Comedy</label>
                                </div>
                                <div>
                                    <input
                                        className='accent-black'
                                        type="checkbox"
                                        id="Drama"
                                        value="Drama"
                                        checked={updatedData.genre === 'Drama'}
                                        onChange={handleChange}
                                        name="genre" />
                                    <label htmlFor="Drama" className="ml-2">Drama</label>
                                </div>
                                <div>
                                    <input
                                        className='accent-black'
                                        type="checkbox"
                                        id="Crime"
                                        value="Crime"
                                        checked={updatedData.genre === 'Crime'}
                                        onChange={handleChange}
                                        name="genre" />
                                    <label htmlFor="Crime" className="ml-2">Crime</label>
                                </div>
                                <div>
                                    <input
                                        className='accent-black'
                                        type="checkbox"
                                        id="Fantasy"
                                        value="Fantasy"
                                        checked={updatedData.genre === 'Fantasy'}
                                        onChange={handleChange}
                                        name="genre" />
                                    <label htmlFor="Fantasy" className="ml-2">Fantasy</label>
                                </div>
                                <div>
                                    <input
                                        className='accent-black'
                                        type="checkbox"
                                        id="Horror"
                                        value="Horror"
                                        checked={updatedData.genre === 'Horror'}
                                        onChange={handleChange}
                                        name="genre" />
                                    <label htmlFor="Horror" className="ml-2">Horror</label>
                                </div>
                                <div>
                                    <input
                                        className='accent-black'
                                        type="checkbox"
                                        id="Science Fiction"
                                        value="Science Fiction"
                                        checked={updatedData.genre === 'Science Fiction'}
                                        onChange={handleChange}
                                        name="genre" />
                                    <label htmlFor="Science Fiction" className="ml-2">Science Fiction</label>
                                </div>
                                <div>
                                    <input
                                        className='accent-black'
                                        type="checkbox"
                                        id="Romance"
                                        value="Romance"
                                        checked={updatedData.genre === 'Romance'}
                                        onChange={handleChange}
                                        name="genre" />
                                    <label htmlFor="Romance" className="ml-2">Romance</label>
                                </div>
                                <div>
                                    <input
                                        className='accent-black'
                                        type="checkbox"
                                        id="Thriller"
                                        value="Thriller"
                                        checked={updatedData.genre === 'Thriller'}
                                        onChange={handleChange}
                                        name="genre" />
                                    <label htmlFor="Thriller" className="ml-2">Thriller</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex justify-center gap-4 mt-6">

                    <button
                        onClick={handleCancel}
                        type='button'
                        className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Update
                    </button>
                </div>
            </div>
        </form>
    );
}
