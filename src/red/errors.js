const respuesta = require('./respuestas');

function error(err, req, res, next){
    console.log('[error]', err);

    const mensage = err.mensage || 'Error interno';
    const status = err.statusCode || '500';

    respuesta.error(req, res, mensage, status);
};

module.exports = error;