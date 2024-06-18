// Importamos nuevamente express
const express = require('express');

// Importamos el molde de respuestas que creamos en red/respuestas
const respuesta = require('../../red/respuestas');

// Igual que importamos las respuestas, importamos el controlador 
const controlador = require('./controlador');

// Accedemos al enrutador de express para definir las rutas del modulo clientes
const router = express.Router();

// Ruta para todos los items
router.get('/', todos);
// Ruta para un item
router.get('/:id', uno);
// Ruta para crear un item
router.post('/', agregar)
// Ruta para eliminar un item
router.put('/', eliminar)
// Ruta para actualizar un item


async function todos(req,res,next){
    try{
        // Le damos a una variable el contenido de la funcion todos, definida en mysql
        const items = await controlador.todos();
        // Rellenamos la respuesta.success con los parametros que le dimos en red
        respuesta.success(req,res, items, 200);
    }catch(err){
        // Next en caso de error salta a la next funcion, y ejecute app.use(error); en app.js
        next(err);
    }
}

async function uno(req,res,next){
    try{
        // Le damos a una variable el contenido de la funcion uno, definida en mysql
        const items = await controlador.uno(req.params.id);
        // Rellenamos la respuesta.success con los parametros que le dimos en red
        respuesta.success(req,res, items, 200);
    }catch(err){
        // Next en caso de error salta a la next funcion, y ejecute app.use(error); en app.js
        next(err);
    }
}

async function agregar(req,res,next){
    try{
        // Le damos a una variable el contenido de la funcion uno, definida en mysql
        const items = await controlador.agregar(req.body);
        if(req.body.id == 0){
            mensaje = 'Item creado con exito';
        }
        else{
            mensaje = 'Item actualizado con exito';
        }
        // Rellenamos la respuesta.success con los parametros que le dimos en red
        respuesta.success(req,res, mensaje , 201);
    }catch(err){
        // Next en caso de error salta a la next funcion, y ejecute app.use(error); en app.js
        next(err);
    }
}

async function eliminar(req,res,next){
    try{
        // Le damos a una variable el contenido de la funcion uno, definida en mysql
        const items = await controlador.eliminar(req.body);
        // Rellenamos la respuesta.success con los parametros que le dimos en red
        respuesta.success(req,res, 'Item eliminado con exito' , 200);
    }catch(err){
        // Next en caso de error salta a la next funcion, y ejecute app.use(error); en app.js
        next(err);
    }
}


// Exportamos las rutas para luego ser importadas como 'clientes' en app.js
module.exports = router;