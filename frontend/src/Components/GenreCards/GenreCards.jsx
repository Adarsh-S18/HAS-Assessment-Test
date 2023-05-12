import React, { useContext, useEffect, useState } from 'react';
import './GenreCards.css';
import Singlecard from '../Singlecard/Singlecard';
import { AppContext } from '../../Store';

function GenreCards({ genre, Allmovies }) {
    const { deleteMovies, state: { searchQuery } } = useContext(AppContext)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        setMovies(() => {
            return Allmovies.filter((movie) => {
                if (searchQuery != "") {
                    if (movie.title.startsWith(searchQuery)) {
                        return movie.genre === genre
                    }
                } else {
                    return movie.genre === genre
                }
            })
        })
    }, [searchQuery,Allmovies])

    const deleteAmovie = (id) => {
        deleteMovies(id)
    }

    return (
        <div className="genre-cards">
            {
                movies?.length>0 ? <h2>{genre}</h2> : ""
            }
            <div className="cards">
                {movies.map((movie) => {
                    return (
                        <Singlecard
                            key={movie._id}
                            deleteAmovie={deleteAmovie}
                            id={movie._id}
                            genre ={movie.genre} 
                            title={movie.title}
                            description={movie.description}
                            duration={movie.duration}
                            img={movie.image}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default GenreCards;
