import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      genre: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        required: true
      },
      image: {
        type: String
      }
})

const movieModel = mongoose.model("Movies", MovieSchema)
export default movieModel