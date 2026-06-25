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

