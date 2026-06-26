//importamos router y controladores
import express from 'express'
import Router from 'express'
import { getAllMovies } from '../controllers/movie.controllers.js'
import { getMovieById } from '../controllers/movie.controllers.js'
import { saveNewMovie } from '../controllers/movie.controllers.js'
import { updateMovie } from '../controllers/movie.controllers.js'
import { deleteMovie } from '../controllers/movie.controllers.js'

//guardamos activacion de router
const productRouter = express.Router()

//armamos las rutas con sus metodos http
productRouter.get('/api/movies', getAllMovies)
productRouter.get('/api/movies/:id', getMovieById)
productRouter.post('/api/movies', saveNewMovie)
productRouter.put('/api/movies/:id', updateMovie)
productRouter.delete('/api/movies/:id', deleteMovie)

export default productRouter