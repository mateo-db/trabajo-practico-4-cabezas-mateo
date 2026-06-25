import express from "express";

//implementamos funcion que trae todas las peliculas
export const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movie.findAll()
        res.status(200).json({
            message: "Se encontraron todas las peliculas con exito"
        })
    } catch (error) {
        res.status(400).json({
            message: "Error: no se pudo procesar la solicitud correctamente"
        })
    }
}

//funcion controladora asincrona que trae una pelicula por su id
export const getMovieById = async (req, res) => {
    //extraemos el id de la pelicula que viene en los params del request
    const idMovie = Number(req.params.id)
    
    //verificamos si el id es un numero válido
    if (Number.isNaN(idMovie)) {
        return res.status(400).json({
            message: "Error: ID inválido"
        })
    }
    
    //una vez hecha la validación buscamos la pelicula con el metodo "findByPk" en el cual dentro de sus parametros mandamos como argumento la variable previa que almacenó el id que vino en el params del request, insertamos un await antes de la petición para esperar que se resuelva la promesa, el resultado lo guardamos en una variable
    const gotMovieById = await Movie.findByPk(idMovie)

    //validamos con la pelicula a buscar con ese id exista en el catalogo, si NO existe mandamos un http status 400 (bad request) y mensaje de error, en caso contrario (la pelicula con ese id existe) mandamos un http status 200 (OK) con un mensaje de éxito
    if (!gotMovieById) {
        return res.status(404).json({
            message: "Error: no se encontró una pelicula con ese ID"
        })
    } else {
        res.status(200).json({
            message: "Se encontró la pelicula con exito",
            gotMovieById
        })
    }


}

export const saveNewMovie = async (req, res) => {
    //desestructuramos entre llaves los parametros del req.body que necesitamos
    const { title, genre, duration, year, synopsis} = req.body

    //evaluamos: si los parametros title, genre, duration y year ESTÁN VACÍOS, retornar http status 400 (bad request) y mensaje de error
    if (!title || !genre || !duration || !year) {
        return res.status(400).json({
            message: "Error: petición invalida, uno o más campos obligatorios vacíos"
        })
    }

    //evaluamos: si el parametro duration NO ES UN ENTERO, retornar http status 400 (bad request) y mensaje de error
    if (!Number.isInteger(duration) || !(duration>0)) {
        return res.status(400).json({
            message: "Error: duración de pelicula inválida (debe ser un numero entero)"
        })
    }

    //evaluamos: si el parametro year NO ES un numero entero, o NO ES mayor o igual que 1888 y menor o igual que 2026 o es CERO, retornar http status 400 (bad request) y mensaje de error
    //Number.isInteger() = te dice si un numero es entero, le agregamos ! para preguntar si NO es un numero entero
    // ! = indica si un valor es "falsy" o niega una condición (la transforma en NOT, como pasa con number.isinteger)
    if ((!Number.isInteger(year)) || !(year>=1888 && year<=2026)) {
        return res.status(400).json({
            message: "Error: año de pelicula inválido (debe ser un numero entero entre 1888 y 2026)"
        })
    }

    //evaluamos: si el tipo del parametro synopsis existe Y NO ES un STRING, retornar http status 400 (bad request) y mensaje de error
    if (synopsis && typeof synopsis !== "string") {
        return res.status(400).json({
            message: "Error: sinopsis inválida (debe ser texto y no numeros o caracteres especiales)"
        })
    }

    //buscaremos mediante el metodo findOne un modelo en nuestro catalogo que contenga en su titulo un texto igual que el que contiene el parametro title, debe ser asíncrona ya que esta acción depende de mysql y debemos esperar a que termine el proceso de buscar (await Movie.findOne)
    const alreadyExistingMovie = await Movie.findOne({ where: { title: req.body.title }})
    //acá mysql si encuentra un modelo con el mismo titulo que nuestro parametro entrante title, nos devolverá ese modelo (que es un objeto)
  
    //evaluamos: si esa pelicula con titulo igual al parametro title existe en nuestro catalogo, mandamos status 400 bad request y mensaje de error con el objeto en cuestión (el modelo que encontramos con titulo conteniendo texto igual al que contiene el parametro title que está entrando)
    if (alreadyExistingMovie) {
        return res.status(400).json({
                message: "Error: ya existe una pelicula en el catalogo con ese titulo:",
                alreadyExistingMovie
                
            })
            //sino, simplemente pasamos a la creación del objeto y mensajes de exito
    }

    //guardamos en variable la creación del objeto mediante "create", referenciamos el modelo y al metodo le pasamos como argumento los parametros de title, genre, duration, year y synopsis
    //a todo esto le insertamos un await antes, para esperar a que todo el proceso se termine de finalizar
    const newMovie = await Movie.create({ title, genre, duration, year, synopsis })

    //arrojamos mensaje de texto
    res.status(200).json({
    message: "Se añadió la pelicula al catalogo exitosamente",
    newMovie
    })
    
    

}
