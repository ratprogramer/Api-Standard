// Importamos express de express
const express = require('express');
// Importamos morgan
const morgan = require('morgan');
// Importamos config de config, donde tenemos el puerto
const config = require('./config');
// Importamos el molde de clientes
const clientes = require('./modules/clientes/rutas')
const error = require('./red/errors');
// Creamos una instancia de express
const app = express();

// Middleware
app.use(morgan('dev'));
// Asi express puede reconocer los metodos json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Accedemos al puerto desde config, luego al objeto exportado app, y su atributo port
app.set('port', config.app.port);

// Creamos las rutas

app.use('/api/clientes', clientes)
// Manejo de errores generales
app.use(error);


// Exportamos app, esto le da una capa extra de seguridad a la api
module.exports = app;