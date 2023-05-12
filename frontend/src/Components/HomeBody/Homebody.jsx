import React, { useContext, useEffect, useState } from 'react'
import './Homebody.css'
import GenreCards from '../GenreCards/GenreCards';
import { AppContext } from '../../Store';


function Homebody() {
  const { state: { movies } } = useContext(AppContext)
  let genres = [...new Set(movies.map((movie) => movie.genre))];

  return (
    <div className="App">
      {genres.map((genre) => (
        <GenreCards key={genre} genre={genre} Allmovies={movies} />
      ))}
    </div>
  );
}

export default Homebody
