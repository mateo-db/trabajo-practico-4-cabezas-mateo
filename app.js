//configuramos nuestro servidor express en puerto 3000
import express from 'express';
//importamos la funcion de arranque de mi bd 
import { rundb } from './src/config/database.js';
import { Movie } from './src/models/movie.model.js'
import productRouter from './src/routes/movie.routes.js';

const app = express()

app.use(express.json())

const PORT = 3000

app.listen(PORT, async () => {
    await rundb()
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

import router from './src/routes/movie.routes.js';
app.use(router)
