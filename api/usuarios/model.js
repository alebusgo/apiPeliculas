const basedatos = require('../../database/conection');

async function crearUno(datosUsuario){
    let conexion = basedatos.obtenerConexion();
    return await conexion.collection("usuarios").insertOne(datosUsuario);
}

async function buscarPorUsuario(usuario){
    let conexion = basedatos.obtenerConexion();
    return await conexion.collection("usuarios").findOne({"usuario": usuario});
}

module.exports.crearUno = crearUno;
module.exports.buscarPorUsuario = buscarPorUsuario;