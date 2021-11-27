const modeloPeliculas = require('./model');


async function obtenerPeliculas(){
    let peliculas = await modeloPeliculas.buscarTodo();
    return peliculas;
}

async function obtenerPelicula(id){
    let pelicula = await modeloPeliculas.buscarPorId(id);
    /*
        OPERACIONES ADICIONALES....
    */
    return pelicula;
}

async function buscarPeliculasTitulo(titulo){
    let peliculas = await modeloPeliculas.buscarPorTitulo(titulo);
    return peliculas;
}

async function crearPelicula(peliculaNueva){
    // PELICULA NUEVA !== NULL, UNDEFINED, VACIA
    let resultado = {}
    if (peliculaNueva && Object.keys(peliculaNueva).length > 0){
        if(peliculaNueva.titulo && peliculaNueva.titulo !== ""){
            let resultadoPelicula = await modeloPeliculas.crearUna(peliculaNueva);
            if(resultadoPelicula && resultadoPelicula.acknowledged){
                resultado.mensaje = "Pelicula insertada correctamente";
                resultado.datos = resultadoPelicula;
            }
            else{
                resultado.mensaje = "Error al crear pelicula";
                resultado.datos = peliculaNueva;
            }
            
        }
        else{
            resultado.mensaje = "El título de existir y no debe ser vacío";
            resultado.datos = peliculaNueva;
        }
    }
    else{
        resultado.mensaje = "No hay datos";
    }
    return resultado;    
}

async function actualizarPelicula(id, pelicula){
    let resultado = {}
    if (id.length == 24 && /^[0-9a-f]+$/i){
        let resultadoPelicula = await modeloPeliculas.actualizarUna(id, pelicula);
        if (resultadoPelicula && resultadoPelicula.acknowledged){
            resultado.mensaje = "Película Actualizada";
            resultado.datos = resultadoPelicula;
        }
        else{
            resultado.mensaje = "Se presentó un error al actualizar la película";
            resultado.datos = {"id": id, "pelicula" : pelicula}
        }
    }
    else{
        resultado.mensaje = "id invalido";
        resultado.datos = id;
    }
    return resultado;
    /*
        1. SU LONGITUD ES DE 24.
        2. 0-9 A-F    
    */
}

async function eliminarPelicula(id){

    /*
        MANIPULAR OBJETO
        -> Objeto.clave -> Si existe la modifica su valor, sino existe la crea.
    */
    let resultado = {}
    if (id.length == 24 && /^[0-9a-f]+$/i.test(id)){
        let resultadoEliminar = await modeloPeliculas.eliminarUna(id);
        if (resultadoEliminar && resultadoEliminar.acknowledged){
            resultado.mensaje = "Pelicula eliminada";
            resultado.datos = resultadoEliminar;
        }
        else{
            resultado.mensaje = "Error al eliminar la película";
            resultado.datos = id;
        }
    }
    else{
        resultado.mensaje = "ID inválido";
        resultado.datos = id;

    }
    return resultado;
}

module.exports.obtenerPeliculas = obtenerPeliculas;
module.exports.obtenerPelicula = obtenerPelicula;
module.exports.buscarPeliculasTitulo = buscarPeliculasTitulo;
module.exports.crearPelicula = crearPelicula;
module.exports.actualizarPelicula = actualizarPelicula;
module.exports.eliminarPelicula = eliminarPelicula;