import Movie from "../models/Post.js";


const NewPost = async (req, res) => {
    try {
        const { title, slug, bgposter, smposter, titlecategory, description, rating, duration, year, genre, language, subtitle, size, quality, youtubelink, category, watchonline, downloadlink, status } = req.body;

        const newMovie = new Movie({
            title: title,
            slug: slug,
            bgposter: bgposter,
            smposter: smposter,
            titlecategory: titlecategory,
            description: description,
            rating: rating,
            duration: duration,
            year: year,
            genre: genre,
            language: language,
            subtitle: subtitle,
            size: size,
            quality: quality,
            youtubelink: youtubelink,
            category: category,
            watchonline: watchonline,
            downloadlink: downloadlink,
            status: status
        });

        await newMovie.save();

        res.status(200).json({ success: true, message: 'Movie posted successfully', movie: newMovie });

    } catch (error) {
        console.error('Error during post movie', error);
        res.status(500).json({ error: 'Error during post movie' });
    }

};

const GetPost = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({ success: true, movie: movie });
    }
    catch(error){
        console.error('Error during get movie', error);
        res.status(500).json({ error: 'Error during get movie' });
    }
};

const UpdatePost = async (req, res) => {
    try {
        const { title, slug, bgposter, smposter, titlecategory, description, rating, duration, year, genre, language, subtitle, size, quality, youtubelink, category, watchonline, downloadlink, status } = req.body;

        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        Object.assign(movie, {
            title,
            slug,
            bgposter,
            smposter,
            titlecategory,
            description,
            rating,
            duration,
            year,
            genre,
            language,
            subtitle,
            size,
            quality,
            youtubelink,
            category,
            watchonline,
            downloadlink,
            status
        });

        await movie.save();

        res.status(200).json({ success: true, message: 'Movie updated successfully', movie });
    } catch (error) {
        console.error('Error during update movie', error);
        res.status(500).json({ success: false, message: 'Server error during movie update' });
    }
};

const deletePost = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);

        if(!movie){
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        await Movie.deleteOne({ _id: req.params.id });

        res.status(200).json({ success: true, message: 'Movie deleted successfully' });
    }
    catch(error){
        console.error('Error during delete movie', error);
        res.status(500).json({ error: 'Error during delete movie' });

};
};

export { NewPost, GetPost, UpdatePost, deletePost };