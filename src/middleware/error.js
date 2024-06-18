
// asi hacemos mas legibles los errores
function error(mensage, code){
    // Guardamos el mensaje del error en e
    let e = new Error(mensage);
    
    // Y si tiene un codigo lo agregamos a e
    if(code){
        e.statusCode = code;
    }
}

module.exports = error;
