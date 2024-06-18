// Importamos el objeto de mysql
const mysql = require('mysql');
// Importamos config para traer las variables de entorno que estan en .env pero primero pasan por config
const config = require('../config');



// Creamos un objeto con las variables de entorno
const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;
function conexionSQL(){
    // Usamos la instancia que importamos de mysql para crear la conexion, y le damos las variables de entorno
    conexion = mysql.createConnection(dbConfig);


    conexion.connect((err) => {
        if(err){
            // Si hay un error lo imprime en consola
            console.log('[db err]', err);
            // Y tras un tiempo vuelve a ejecutar la funcion
            setTimeout(conexionSQL,200);
        }
        else{
            console.log('Base de datos conectada');
        }
    });
    conexion.on('error', err =>{
        console.log('[db err]', err);
        // Si se pierde  la conexion se vuelva a conectar automaticamente
        if(err.code === 'PROTOCOL_CONECTION_LOST'){
            conexionSQL();
        }else{
            // Si es otro error, lo lanzamos a consola
            throw err;
        }
    })
};

conexionSQL();

// Funcion para traer todos los elementos de una tabla
function todos(tabla){
    return new Promise( (resolve,reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (err, result) => {
            return  err ? reject(err) : resolve(result);   
        });
    })
}

// Funcion para traer un elementos de una tabla
function uno(tabla,id){
    return new Promise( (resolve,reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (err, result) => {
            return  err ? reject(err) : resolve(result);   
        })
    })
};

// funcion para insertar
function insertar(tabla, data){
    return new Promise( (resolve,reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (err, result) => {
            return  err ? reject(err) : resolve(result);   
        });
    })
}

// funcion para actualizar 
function actualizar(tabla, data){
    return new Promise( (resolve,reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id =?`, [data, data.id], (err, result) => {
            return  err ? reject(err) : resolve(result);   
        });
    })
}




// Funcion para agregar o actualizar un elementos a una tabla
function agregar(tabla,data){
    if(data && data.id == 0){
        return insertar(tabla, data);
    }
    else{
        return actualizar(tabla, data);
    }
}

// Funcion para eliminar un elementos de una tabla
function eliminar(tabla, data){
    return new Promise( (resolve,reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id= ?`, data.id, (err, result) => {
            return  err ? reject(err) : resolve(result);   
        });
    })
}


// Los exportamos
module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}