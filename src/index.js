// Importamos desde index app de config.js
const app = require('./app');

// Accedemos al puerto de app, y creamos una funcion flexha para confirmar la conexion
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto ', app.get('port'));
})