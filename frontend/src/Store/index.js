import react, { createContext, useEffect, useState } from 'react'
import axios from 'axios';


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        try {
            axios.get('http://localhost:5000/movies').then((response) => {
                setMovies(response.data);
            })
        } catch (error) {
            console.error(error);
        }

    }, []);

    const state = { movies, searchQuery }

    // Add Movie
    const addMovies = (movie) => {
        setMovies([...movies, movie])
        console.log(movie)
    }

    //Delete Movie
    const deleteMovies = async (id) => {
        setMovies(prev => {
            return prev.filter(movie => movie._id != id)
        })
    }

    return <AppContext.Provider value={{ addMovies, deleteMovies, state, setSearchQuery }}>
        {children}
    </AppContext.Provider>
}