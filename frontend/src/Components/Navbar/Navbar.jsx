import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './Navbar.css'
import { AppContext } from '../../Store'
import Singlecard from '../Singlecard/Singlecard'

function Navbar() {
  const { addMovies, state: { movies, searchQuery }, deleteMovies, setSearchQuery } = useContext(AppContext)
  const [showModal, setShowModal] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieData, setMovieData] = useState({
    title: '',
    genre: '',
    description: '',
    duration: '',
    image: null
  });

const [movieDataErr, setMovieDataErr] = useState({
    title: '',
    genre: '',
    description: '',
    duration: '',
    image: null
  });


  // Add Movie
  const handleAddMovie = () => {
    setShowModal(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', movieData.title);
    formData.append('genre', movieData.genre);
    formData.append('description', movieData.description);
    formData.append('duration', movieData.duration);
    formData.append('image', movieData.image);
    try {
      const response = await axios.post('http://localhost:5000/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      addMovies(response.data)
      setShowModal(false)
    } catch (error) {
      setMovieDataErr((prev) => {
        return {
          ...prev, ...error?.response?.data
        }
      })
      console.error(error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'image') {
      setMovieData({
        ...movieData,
        image: event.target.files[0]
      });
    } else {
      setMovieData({
        ...movieData,
        [name]: value
      });
    }
  };

  // Delete Movie
  const deleteAmovie = (id) => {
    deleteMovies(id)
  }

  // For search Handling
  const handleSearchItemClick = (movie) => {
    setShowModal(false);
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setShowModal(false)
  }
  return (
    <nav className="navbar">
      <div className="navbarleft">
        <h1>Movies</h1>
      </div>
      <div className="navbarcenter">
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        {filteredMovies.length > 0 && (
          <div className="searchResults">
            {filteredMovies.map(movie => (
              <div key={movie.id} onClick={() => handleSearchItemClick(movie)}>{movie.title}</div>
            ))}
          </div>
        )}
        {selectedMovie && (
          <Singlecard
            title={selectedMovie.title}
            description={selectedMovie.description}
            duration={selectedMovie.duration}
            img={selectedMovie.image}
            id={selectedMovie.id}
            deleteAmovie={deleteAmovie}
          />
        )}

      </div>

      <div className="navbarright">
        <button onClick={handleAddMovie}>Add movie</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <span className="close" onClick={handleClose}>&times;</span>
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Title:</label>
              {
                movieDataErr.title ? <span style={{ fontSize: "12px", color: "red" }}>* {movieDataErr.title}</span> : null
              }
              <input
                type="text"
                name="title"
                value={movieData.title}
                onChange={handleChange}
              />

              <label>
                Genre:</label>
              {
                movieDataErr.genre ? <span style={{ fontSize: "12px", color: "red" }}>* {movieDataErr.genre}</span> : null
              }
              <select
                name="genre"
                value={movieData.genre}
                onChange={handleChange}
              >
                <option value="">Select a genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
              </select>

              <label>
                Description:</label>
              {
                movieDataErr.description ? <span style={{ fontSize: "12px", color: "red" }}>* {movieDataErr.description}</span> : null
              }
              <textarea
                type="text"
                name="description"
                value={movieData.description}
                onChange={handleChange}
              />

              <label>
                Duration in minutes:</label>
              {
                movieDataErr.duration ? <span style={{ fontSize: "12px", color: "red" }}>* {movieDataErr.duration}</span> : null
              }
              <input
                type="number"
                name="duration"
                value={movieData.duration}
                onChange={handleChange}
              />

              <label>
                Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />

              <button type="submit">Add Movie</button>
            </form>
          </div>
        </div>
      )
      }
    </nav>
  )
}

export default Navbar
