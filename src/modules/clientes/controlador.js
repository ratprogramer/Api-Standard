// Importamos las funciones exportadas desde DB/mysql
const db = require('../../DB/mysql');

// Creamos una variable con el nombre de la tabla al que deseamos acceder
const TABLA = 'clientes';


function todos(){
    return db.todos(TABLA);
}

// Debe tener el id como parametro
function uno(id){
    return db.uno(TABLA, id);
}

function agregar(body){
    return db.agregar(TABLA, body);
}

function eliminar(body){
    return db.eliminar(TABLA, body);
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar
};