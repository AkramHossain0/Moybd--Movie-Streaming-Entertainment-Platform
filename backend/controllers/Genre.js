import Movie from '../models/Post.js';


const Action = async (req, res) => {
    try {
        const series = await Movie.find({status: 'Publish' , genre: 'Action' });

        if (!series) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({ success: true, data: series });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const Adventure = async (req, res) => {
    try {
        const series = await Movie.find({status: 'Publish' , genre: 'Adventure' });

        if (!series) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({ success: true, data: series });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const Comedy = async (req, res) => {
    try {
        const series = await Movie.find({status: 'Publish' , genre: 'Comedy' });

        if (!series) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({ success: true, data: series });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const Drama = async (req, res) => {
    try {
        const series = await Movie.find({status: 'Publish' , genre: 'Drama' });

        if (!series) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({ success: true, data: series });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const Crime = async (req, res) => {
    try {
        const series = await Movie.find({status: 'Publish' , genre: 'Crime' });

        if (!series) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({ success: true, data: series });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const Animation = async (req, res) => {
    try {
        const series = await Movie.find({status: 'Publish' , genre: 'Animation' });

        if (!series) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({ success: true, data: series });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const Fantasy = async (req, res) => {
    try {
        const series = await Movie.find({status: 'Publish' , genre: 'Fantasy' });

        if (!series) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({ success: true, data: series });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const Horror = async (req, res) => {
    try {
        const series = await Movie.find({status: 'Publish' , genre: 'Horror' });

        if (!series) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({ success: true, data: series });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const Science_Fiction = async (req, res) => {
    try {
        const series = await Movie.find({status: 'Publish' , genre: 'Science Fiction' });

        if (!series) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({ success: true, data: series });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const Romance = async (req, res) => {
    try {
        const series = await Movie.find({status: 'Publish' , genre: 'Romance' });

        if (!series) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({ success: true, data: series });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const Thriller = async (req, res) => {
    try {
        const series = await Movie.find({status: 'Publish' , genre: 'Thriller' });

        if (!series) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({ success: true, data: series });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}




export { Action , Adventure , Comedy , Drama , Crime , Animation, Fantasy , Horror , Science_Fiction , Romance , Thriller };