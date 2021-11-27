const express = require('express');
const controladorPeliculas = express.Router();
const servicioPeliculas = require('./service');
const rutaProtegida = require('../auth/jwt').validarToken;

/*
    GET -> OBTENER PELÍCULAS - OK
    GET -> OBTENER PELÍCULA POR ID - 
    GET -> BUSCAR PELÍCULA POR TÍTULO
    POST -> CREAR PELÍCULAS
    PUT -> ACTUALIZAR PELÍCULAS
    DELETE -> ELEMINAR PELÍCULAS


*/

/*
    BUSCAR TODAS LAS PELICULAS
*/
controladorPeliculas.get("/obtenerPeliculas", rutaProtegida, async function(req, res){
    let peliculas = await servicioPeliculas.obtenerPeliculas();
    res.send({
        "mensaje" : "Listado de películas",
        "data" : peliculas
    });
});

/*
    BUSCAR UNA PELICULA POR ID
*/

controladorPeliculas.get("/obtenerPelicula/:id", rutaProtegida, async function(req, res){
    let id =req.params.id;
    let pelicula = await servicioPeliculas.obtenerPelicula(id);
    res.send({
        "mensaje" : "Detalle película",
        "data" : pelicula
    });
})

/*
    BUSCAR PELICULAS POR TITULO
*/

controladorPeliculas.get("/buscarPeliculasTitulo/:titulo", async function(req, res){
    let titulo = req.params.titulo;
    let peliculas = await servicioPeliculas.buscarPeliculasTitulo(titulo);
    res.send({
        "mensaje" : "Resultado busqueda Titulos peliculas",
        "busqueda" : titulo,
        "data" : peliculas
    });
})

/*
    CREAR PELICULAS
*/

controladorPeliculas.post("/crearPelicula", rutaProtegida, async function(req, res){
    let peliculaNueva = req.body;
    let respuesta = await servicioPeliculas.crearPelicula(peliculaNueva);
    res.send(respuesta);    
});

/*
    ACTUALIZAR PELICULA
*/
controladorPeliculas.put("/actualizarPelicula/:id", rutaProtegida, async function(req, res){
    let id = req.params.id;
    let pelicula = req.body;
    let respuesta = await servicioPeliculas.actualizarPelicula(id, pelicula);
    res.send(respuesta);
});

/*
    ELIMINAR PELICULA
*/
controladorPeliculas.delete("/eliminarPelicula", rutaProtegida, async function(req,res){
    let id = req.query.id;
    let respuesta = await servicioPeliculas.eliminarPelicula(id);
    res.send(respuesta);
})

module.exports = controladorPeliculas;