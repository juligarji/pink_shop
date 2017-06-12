var express = require('express');
var router = express.Router();
var permitsRouter = require('../authentication/permitsRouter.js');
var routesProtect = require('../authentication/routesProtect.js');


/* Puntos de acceso */
// protegiendo las rutas para el acceso no autorizado
var createFragance = function(req,res,next){

  if(!res.locals.authorized){// Esta autorizado para ingresar con permisos
      res.send({message:'No autorizado'});
      return;
  }

  res.end();
}

/*Rutas de Acceso */
router.post('/createfragance',routesProtect.isAuth,createFragance);

module.exports = router;
