const basedatos = require('../../database/conection');
const ObjectId = require('mongodb').ObjectId;

function buscarTodo(){
    let conexion = basedatos.obtenerConexion();

    return conexion.collection("peliculas").find({}).toArray()
        .then(function(data){
            return data;
        })
        .catch(function(error){
            console.log(error);
        })
}

function buscarPorId(id){
    let conexion = basedatos.obtenerConexion();

    return conexion.collection("peliculas").findOne({"_id": ObjectId(id)})
        .then(function(data){
            return data;
        })
        .catch(function(error){
            console.log(error);
        });
}

function buscarPorTitulo(titulo){
    let conexion = basedatos.obtenerConexion();

    return conexion.collection("peliculas").find({"titulo": new RegExp(titulo, "i")}).toArray()
        .then(function(data){
            return data;
        })
        .catch(function(error){
            console.log(error);
        });

}

function crearUna(peliculaNueva){
    let conexion = basedatos.obtenerConexion();

    return conexion.collection("peliculas").insertOne(peliculaNueva)
        .then(function(resultado){
            return resultado;
        })
        .catch(function(error){
            console.log(error);
        })
}

function actualizarUna(id, pelicula){
    let conexion = basedatos.obtenerConexion();

    return conexion.collection("peliculas").updateOne(
        {"_id": ObjectId(id)},
        {"$set" : pelicula}
    )
    .then(function(resultado){
        return resultado;
    })
    .catch(function(error){
        console.log(error);
    })
}

function eliminarUna(id){
    let conexion = basedatos.obtenerConexion();

    return conexion.collection("peliculas").deleteOne({"_id": ObjectId(id)})
        .then(function(resultado){
            return resultado;
        })
        .catch(function(error){
            console.log(error);
        });
}

module.exports.buscarTodo = buscarTodo;
module.exports.buscarPorId = buscarPorId;
module.exports.buscarPorTitulo = buscarPorTitulo;
module.exports.crearUna = crearUna;
module.exports.actualizarUna = actualizarUna;
module.exports.eliminarUna = eliminarUna;