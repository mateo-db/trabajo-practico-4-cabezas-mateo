//configuramos nuestro servidor express en puerto 3000
import express from 'express';

const app = express()

app.use(express.json())

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
