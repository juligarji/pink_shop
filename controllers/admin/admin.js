var express = require('express');
var router = express.Router();
var permitsRouter = require('../authentication/permitsRouter.js');
var routesProtect = require('../authentication/routesProtect.js');
var errorHandler = require('../error/errorHandler.js');


/* Middleware para las rutas */
var fragances = require('./fragances.js');
var images = require('./images.js');
var categories = require('./categories.js');

/*Rutas de Acceso */
    // protegiendo las rutas para el acceso no autorizado

      // fragancias
router.post('/createfragance',routesProtect.isAuth,routesProtect.onlyAdmin,fragances.createFragance);
router.post('/deletefragance',routesProtect.isAuth,routesProtect.onlyAdmin,fragances.deleteFragance);
router.post('/getfragances',routesProtect.isAuth,routesProtect.onlyAdmin,fragances.getFragances);

router.post('/getsinglefragance',routesProtect.isAuth,routesProtect.onlyAdmin,fragances.getSingleFragance);
router.post('/editsinglefragance',routesProtect.isAuth,routesProtect.onlyAdmin,fragances.editSingleFragance);
router.post('/editphotosfragance',routesProtect.isAuth,routesProtect.onlyAdmin,fragances.editPhotosFragance);
//router.post('/getfragances',fragances.getFragances);
      // imagenes
router.post('/newpicture',routesProtect.isAuth,routesProtect.onlyAdmin,images.upload,images.createPicture);
router.post('/deletepicture',routesProtect.isAuth,routesProtect.onlyAdmin,images.deletePicture);

// Direcciones de otras paginas de administrador
router.get('/categorias',routesProtect.isAuth,routesProtect.onlyAdmin,categories.renderCategories);
router.post('/createcategory',routesProtect.isAuth,routesProtect.onlyAdmin,categories.createCategory);
router.post('/deletecategory',routesProtect.isAuth,routesProtect.onlyAdmin,categories.deleteCategory);

module.exports = router;
