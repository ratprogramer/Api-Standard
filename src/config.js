// Importamos el metodo de dotenv para acceder a las variables de entorno
require('dotenv').config();
// Exportamos el objeto app que contiene el acceso a lasvariables de entorno
module.exports ={
    app: {
        // Le pedimos que busque el puerto en env, y si no lo reconoce, asigne el 4000
        port: process.env.PORT || 4000,
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'NoEncontreLaBD',
    }
};