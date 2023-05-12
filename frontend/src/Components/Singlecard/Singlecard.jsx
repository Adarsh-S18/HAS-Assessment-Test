import React, { useState } from 'react';
import './Singlecard.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Singlecard = ({ title, description, duration, genre, img, id, deleteAmovie }) => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [editedMovie, setEditedMovie] = useState({
        title: title,
        description: description,
        genre:genre,
        duration: duration,
        img: img,
    });


    // Function to handle EDIT operation 

    const handleEdit = (e) => {
        setShowModal(false);
        setShowEditModal(true);
    };

    const handleEditInputChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            console.log("sss")
            setEditedMovie({
                ...editedMovie,
                [name]: event.target.files[0]
            });
        } else {
            setEditedMovie({
                ...editedMovie,
                [name]: value
            });
        }
    };

    const handleEditSubmit = async () => {
        try {
            const response = await axios.put(
                `http://localhost:5000/movies/${id}`,
                editedMovie
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        setShowEditModal(false);
    };

    // Handle click on Card 

    const handleCardClick = (e) => {
        if (showEditModal) {
            e.stopPropagation();
        } else {
            setShowModal(true);
        }
    };

    // Function to handle Delte 

    const handleDelete = async () => {
        try {
            deleteAmovie(id);
            const response = await axios.delete(`http://localhost:5000/movies/${id}`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className="card" onClick={handleCardClick}>
                <img src={`http://localhost:5000/images/${img}`} alt={title} />
                <div className="card-content">
                    <h3>{title}</h3>
                    <p>{description.length > 20 ? description.substring(0, 20) + "..." : description}</p>
                    <p>Duration: {duration} min </p>
                    <div className="card-hover">
                        <button className="editbutton" onClick={handleEdit}>
                            <EditIcon />
                        </button>
                        {showEditModal && (
                            <div className="modal">
                                <div className="modal-content1">
                                    <span className="close" onClick={() => setShowEditModal(false)}>
                                        &times;
                                    </span>
                                    <h3>Edit movie</h3>
                                    <form onSubmit={handleEditSubmit}>
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={editedMovie.title}
                                            onChange={handleEditInputChange}
                                        />
                                        <label>Genre:</label>

                                        <select
                                            name="genre"
                                            value={editedMovie.genre}
                                            onChange={handleEditInputChange}
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

                                        <label htmlFor="description">Description:</label>
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            value={editedMovie.description}
                                            onChange={handleEditInputChange}
                                        />

                                        <label htmlFor="duration">Duration :</label>
                                        <input
                                            type="text"
                                            id="duration"
                                            name="duration"
                                            value={editedMovie.duration}
                                            onChange={handleEditInputChange}
                                        />
                                        <button type="submit">Save</button>
                                    </form>
                                </div>
                            </div>
                        )}

                        <button className="deletebutton" onClick={handleDelete}>
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            </div>
            {showModal && !showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <img src={`http://localhost:5000/images/${img}`} alt={title} />

                        <h3>Title : {title}</h3>
                        <p>Description : {description}</p>
                        <p>Genre: {genre}</p>
                        <p>Duration: {duration} min</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Singlecard;
