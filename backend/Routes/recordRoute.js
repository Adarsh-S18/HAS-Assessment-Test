import express, { Router } from "express";
import { addMovie, deleteAMovie, getAMovie, getAllMovie, updateAMovie } from "../Controllers/recordController.js";
import multer from 'multer';
import path from 'path';

// Setup for MULTER file Upload

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
    
});

const upload = multer({ storage });

const router = express.Router()

router.post('/', upload.single('image'), addMovie)  //add a movie

router.get('/', getAllMovie) // get All the movies

router.get('/:id', getAMovie) // get a movie

router.put('/:id',upload.single('image'), updateAMovie) // update a movie

router.delete('/:id', deleteAMovie) // delete a movie


export default router