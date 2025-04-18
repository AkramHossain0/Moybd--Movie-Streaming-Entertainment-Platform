'use client'
import { React, useState } from 'react';
import axios from 'axios';

function Page() {
    const [activeButtons, setActiveButtons] = useState([]);

    const handleButtonClick = (resolution) => {
        setActiveButtons(prevState =>
            prevState.includes(resolution)
                ? prevState.filter(item => item !== resolution)
                : [...prevState, resolution]
        );
    };

    const [formData, setFormData] = useState({
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
        status: '',
    });
    const initialFormData = {
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
        status: '',
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.status) {
            alert('Please select a status (Draft or Publish) before submitting.');
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/movie/post`, formData);
            alert('Data saved successfully');
            setFormData(initialFormData);
            
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };


    return (
        <>
            <div className='pb-5'>
                <h2 className='mt-3 text-3xl font-semibold text-center text-black'>Add Movie</h2>
                <form onSubmit={handleSubmit}>
                    <div className='p-6 bg-slate-300 md:gap-7 rounded-xl md:mx-[10vw] justify-center flex flex-col md:flex-row mr-2 pl-20'>
                        <div>
                            <div className='flex flex-col'>
                                <label className='py-1 text-sm font-bold' htmlFor="bgposter">Background Poster</label>
                                <input
                                    className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                    type="text"
                                    name="bgposter"
                                    id="bgposter"
                                    value={formData.bgposter}
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
                                    value={formData.title}
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
                                    value={formData.description}
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
                                    value={formData.duration}
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
                                    value={formData.rating}
                                    onChange={handleChange}
                                    placeholder='Rating' />
                            </div>
                            <div className='flex flex-col pt-5'>
                                <label className='py-1 text-sm font-bold' htmlFor="duration">Watch online link</label>
                                <input
                                    className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                    type="text"
                                    name="watchonline"
                                    id="watchonline"
                                    value={formData.watchonline}
                                    onChange={handleChange}
                                    placeholder='Watch online link' />
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
                                        value={formData.downloadlink[resolution]}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            downloadlink: {
                                                ...formData.downloadlink,
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
                                        checked={formData.status === 'Draft'}
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
                                        checked={formData.status === 'Publish'}
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
                                    value={formData.smposter}
                                    onChange={handleChange}
                                    placeholder='Main Poster Link' />
                            </div>

                            <div className='flex flex-col pt-5'>
                                <label className='py-1 text-sm font-bold' htmlFor="slug">Slug (URL)</label>
                                <input
                                    className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
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
                                    value={formData.year}
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
                                    value={formData.youtubelink}
                                    onChange={handleChange}
                                    placeholder='Youtube embed link' />
                            </div>

                            <div className='flex flex-col pt-5'>
                                <label className='py-1 text-sm font-bold' htmlFor="language">Select language</label>
                                <select
                                    className='p-2 rounded-xl md:w-[27vw] w-[200px] border-2 border-black focus:border-blue-500 focus:outline-none focus:border-[3px]'
                                    name="language"
                                    value={formData.language}
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
                                    value={formData.quality}
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
                                    value={formData.subtitle}
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
                                    value={formData.size}
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
                                                checked={formData.titlecategory === 'Movies'}
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
                                                checked={formData.titlecategory === 'Series'}
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
                                                checked={formData.titlecategory === 'Shows'}
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
                                                checked={formData.category === 'Bollywood'}
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
                                                checked={formData.category === 'Hollywood'}
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
                                                checked={formData.category === 'South'}
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
                                                checked={formData.category === 'Marvel Studio'}
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
                                                checked={formData.category === 'Gujarati'}
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
                                                checked={formData.category === 'TV Shows'}
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
                                                checked={formData.category === 'Web Series'}
                                                onChange={handleChange}
                                                name="category" />
                                            <label htmlFor="Web Series" className="ml-2">Web Series</label>
                                        </div>
                                        <div>
                                            <input
                                                className='accent-black'
                                                type="radio"
                                                id="Web Series"
                                                value="Web Series"
                                                checked={formData.category === 'Web Series'}
                                                onChange={handleChange}
                                                name="category" />
                                            <label htmlFor="Web Series" className="ml-2">Anime</label>
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
                                            checked={formData.genre === 'Action'}
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
                                            checked={formData.genre === 'Adventure'}
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
                                            checked={formData.genre === 'Animation'}
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
                                            checked={formData.genre === 'Comedy'}
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
                                            checked={formData.genre === 'Drama'}
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
                                            checked={formData.genre === 'Crime'}
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
                                            checked={formData.genre === 'Fantasy'}
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
                                            checked={formData.genre === 'Horror'}
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
                                            checked={formData.genre === 'Science Fiction'}
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
                                            checked={formData.genre === 'Romance'}
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
                                            checked={formData.genre === 'Thriller'}
                                            onChange={handleChange}
                                            name="genre" />
                                        <label htmlFor="Thriller" className="ml-2">Thriller</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex items-center justify-center my-3">
                        <div className="relative group">
                            <button
                                type='submit'
                                value={formData}
                                onClick={handleSubmit}
                                className="relative inline-block p-px font-semibold leading-6 text-white transition-transform duration-300 ease-in-out bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 hover:scale-105 active:scale-95"
                            >
                                <span
                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                ></span>

                                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                                    <div className="relative z-10 flex items-center space-x-2">
                                        <span className="transition-all duration-500 group-hover:translate-x-1">
                                            Save data
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
                </form>
            </div>
        </>
    )
}

export default Page;
