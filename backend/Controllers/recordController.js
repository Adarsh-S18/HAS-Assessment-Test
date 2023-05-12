import movieModel from "../Models/MovieModel.js";

// ADD MOVIE

export const addMovie = async (req, res) => {
    try {
        const { title, genre, description, duration } = req.body;
        const errMessage = {
            title: "",
            genre: "",
            description: "",
            duration: ""
        }
        if (title == "" || genre == "" || description == "" || duration == "") {
            for (const key in req.body) {
                if (req.body[key] == "") {
                    errMessage[key] = "Please provide " + key
                } else {
                    delete errMessage[key]
                }
            }
            res.status(400).json({ ...errMessage })
        }else{
            const image = req.file.filename;
            const movie = new movieModel({ title, genre, description, duration, image });
            const response = await movie.save();
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

//GET ALL MOVIES

export const getAllMovie = async (req, res) => {
    try {
        const allMovies = await movieModel.find()
        res.status(200).json(allMovies)

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

// GET A SINGLE MOVIE

export const getAMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await movieModel.findById(id)
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

// DELETE MOVIE

export const deleteAMovie = async (req, res) => {
    try {
        const { id } = req.params
        const movie = await movieModel.findByIdAndDelete(id);
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

// UPDATE MOVIE

export const updateAMovie = async (req, res) => {
    try {
        console.log(req.body)
        const movieId = req.params.id;
        const { title, genre, description, duration } = req.body;
        const updatedMovie = await movieModel.findByIdAndUpdate(
            movieId,
            { title, genre, description, duration },
            { new: true }
        );
        console.log(updatedMovie)
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};