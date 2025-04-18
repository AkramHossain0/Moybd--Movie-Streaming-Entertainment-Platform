import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const MovieSlider = () => {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/publicmovies`);
        const data = await response.json();
        if (response.ok) {
          const shuffledMovies = data.data.sort(() => 0.5 - Math.random());
          const selectedMovies = shuffledMovies.slice(0, 4);
          setMovies(selectedMovies);
        } else {
          console.error('Failed to fetch movies');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [movies.length]);

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative h-[60vh] overflow-hidden">
      {movies.map((movie, index) => (
        <div
          key={movie._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <img
              src={movie.bgposter}
              alt={movie.title}
              className="object-cover w-full h-full"
            />
          </div>
          {/* Content */}
          <div className="absolute bottom-0 left-0 z-20 flex items-end gap-6 p-8">
            {/* Small Poster */}
            <div className="w-40 h-56 overflow-hidden rounded-lg shadow-2xl">
              <img
                src={movie.smposter}
                alt={`${movie.title} Poster`}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Movie Info */}
            <div className="space-y-3 text-white">
              <h2 className="text-4xl font-bold tracking-wide">{movie.title}</h2>
              <div className="space-y-2 text-lg">
                <p className="flex items-center gap-2">
                  <span className="text-gray-300">Duration:</span>
                  <span>{movie.duration}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-300">Rating:</span>
                  <span className="bg-yellow-500 text-black px-2 py-0.5 rounded">
                    {movie.rating}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-300">Genre:</span>
                  <span>{movie.genre.join(', ')}</span>
                </p>
                <button 
                  onClick={() => router.push(`/download/${movie.slug}`)}
                  className="flex items-center bg-red-600 text-white font-bold py-1 px-1 sm:py-2 sm:px-2 rounded hover:bg-red-700 hover:shadow-lg transition duration-300 text-base gap-1">
                  <i className='bx bxs-download'></i>
                  <div>
                  DOWNLOAD
                  <span className="bg-white text-black font-bold ml-1 px-0.5 py-0.5 rounded">FREE</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute z-30 flex gap-2 bottom-4 right-4">
            {movies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/75'
                  }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieSlider;