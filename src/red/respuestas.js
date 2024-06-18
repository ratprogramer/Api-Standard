/*
req: El objeto de solicitud (request)
res: El objeto de respuesta (response)
mensaje: El mensaje que se enviará en la respuesta
status: El código de estado HTTP
*/ 


// Estandarizamos las respuestas exitosas del servidor 
exports.success = function (req, res, mensaje, status) {
    // Validacion por si no trae un status o mensaje por defecto
    const statusCode = status || 200; // Si no hay un estado, se utiliza 200 (éxito)
    const mensajeOk = mensaje || ''; // Si no hay un mensaje, se utiliza una cadena vacía
    
    // El formato en que enviaremos la respuesta exitosa
    res.status(statusCode).send({
        error: false, // Indica que no hay error
        status: statusCode, // Estado de la respuesta
        body: mensajeOk // Mensaje de la respuesta
    });
};

// Estandarizamos las respuestas de error
exports.error = function (req, res, mensaje, status) {
    const statusCode = status || 500; // Si no hay un estado, se utiliza 500 (Err interno)
    const mensajeError = mensaje || 'Error interno'; // Si no hay un mensaje, se utiliza la cadena
    
    // El formato en que enviaremos la respuesta de error
    res.status(statusCode).send({
        error: true, // Indica que hay un error
        status: statusCode, // Estado de la respuesta
        body: mensajeError // Mensaje de error de la respuesta
    });
};