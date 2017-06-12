var express = require('express');
var router = express.Router();
var permitsRouter = require('../authentication/permitsRouter.js');
var routesProtect = require('../authentication/routesProtect.js');


var getFragances = function(req,res){

  if(!res.locals.authorized){// cambiar por rutas privadas de autenticas

      res.status(200).render('home/fragances');
      return;
  }

    res.status(200).render('home/fragances');

}


/* Puntos de acceso */
// protegiendo las rutas para el acceso no autorizado
router.get('/',routesProtect.isAuth,permitsRouter.routeByPermits);
router.get('/perfumeria',routesProtect.isAuth,getFragances);
module.exports = router;
