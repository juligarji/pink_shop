var express = require('express');
var router = express.Router();
var permitsRouter = require('../authentication/permitsRouter.js');
var routesProtect = require('../authentication/routesProtect.js');
var errorHandler = require('../error/errorHandler.js');


/* Middleware para las rutas */
var fragances = require('./fragances.js');
var images = require('./images.js');




/*Rutas de Acceso */
    // protegiendo las rutas para el acceso no autorizado

      // fragancias
router.post('/createfragance',routesProtect.isAuth,routesProtect.onlyAdmin,fragances.createFragance);
router.post('/getfragances',routesProtect.isAuth,routesProtect.onlyAdmin,fragances.getFragances);
//router.post('/getfragances',fragances.getFragances);
      // imagenes
router.post('/newpicture',routesProtect.isAuth,routesProtect.onlyAdmin,images.upload,images.createPicture);
router.post('/deletepicture',routesProtect.isAuth,routesProtect.onlyAdmin,images.deletePicture);

module.exports = router;
