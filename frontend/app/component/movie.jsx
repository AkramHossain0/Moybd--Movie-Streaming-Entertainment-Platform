import React from 'react';
import { useRouter } from 'next/navigation';
import 'boxicons/css/boxicons.min.css';

function Movie({ slug, title, smposter, rating, year }) {
    const router = useRouter();

    const movieDetails = () => {
        router.push(`/download/${slug}`);
    };

    return (
        <div
            onClick={movieDetails}
            className="flex flex-col text-white rounded-xl w-[155px] cursor-pointer h-[310px]"
            role="button"
        >
            <img
                src={smposter}
                alt={`${title} Poster`}
                className="object-cover rounded-xl w-[150px] h-[240px]"            />
            <h2 className="pl-2 text-sm font-bold">{title}</h2>
            <div className="flex justify-between px-3 py-1 text-xs font-semibold">
                <p>{year}</p>
                <p className="flex items-center gap-1">
                    <i className='text-yellow-500 bx bxs-star'></i>
                    {rating}
                </p>
            </div>
        </div>
    );
}

export default Movie;
