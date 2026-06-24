//configuramos nuestro servidor express en puerto 3000
import express from 'express';
//importamos la funcion de arranque de mi bd 
import { rundb } from './src/config/database.js';

const app = express()

app.use(express.json())

const PORT = 3000

//invocamos la funcion que activa nuestra bd
rundb()

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

