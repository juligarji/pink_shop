var express = require('express');
var router = express.Router();
var permitsRouter = require('../middleware/authentication/permitsRouter.js');
var routesProtect = require('../middleware/authentication/routesProtect.js');
var errorHandler = require('../middleware/error/errorHandler.js');


/* Middleware para las rutas */
var products = require('../logic/products/products.js');
var kinds = require('../logic/products/kinds.js');
var attributes = require('../logic/products/attributes/attributes.js');
var components = require('../logic/products/attributes/components.js');
var images = require('../middleware/images/images.js');

/*Rutas de Acceso */
    // protegiendo las rutas para el acceso no autorizado

      // fragancias
/*
router.post('/createProduct',routesProtect.isAuth,routesProtect.onlyAdmin,products.createProduct);
router.post('/deleteProduct',routesProtect.isAuth,routesProtect.onlyAdmin,products.deleteProduct);
router.post('/getProducts',routesProtect.isAuth,routesProtect.onlyAdmin,products.getProducts);
*/
/*
router.post('/getsingleproduct',routesProtect.isAuth,routesProtect.onlyAdmin,products.getSingleProduct);
router.post('/editsingleproduct',routesProtect.isAuth,routesProtect.onlyAdmin,products.editSingleProduct);
router.post('/editphotosproduct',routesProtect.isAuth,routesProtect.onlyAdmin,products.editPhotosProduct);
//router.post('/getproducts',products.getProducts);
      // imagenes
      */
      /*
router.post('/newpicture',routesProtect.isAuth,routesProtect.onlyAdmin,images.upload,images.createPicture);
router.post('/deletepicture',routesProtect.isAuth,routesProtect.onlyAdmin,images.deletePicture);
*/
// Direcciones de otras paginas de administrador

router.get('/categorias',routesProtect.isAuth,routesProtect.onlyAdmin,kinds.renderKinds);
router.get('/atributos',routesProtect.isAuth,routesProtect.onlyAdmin,attributes.renderAttributes);

router.post('/createkind',routesProtect.isAuth,routesProtect.onlyAdmin,kinds.createKind);
router.post('/deletekind',routesProtect.isAuth,routesProtect.onlyAdmin,kinds.deleteKind);

router.post('/createcomponent',routesProtect.isAuth,routesProtect.onlyAdmin,components.createComponent);
router.post('/deletecomponent',routesProtect.isAuth,routesProtect.onlyAdmin,components.deleteComponent);

router.post('/createattribute',routesProtect.isAuth,routesProtect.onlyAdmin,attributes.createAttribute);
router.post('/deleteattribute',routesProtect.isAuth,routesProtect.onlyAdmin,attributes.deleteAttribute);
/*
router.post('/createcategory',routesProtect.isAuth,routesProtect.onlyAdmin,kinds.createKinds);
router.post('/deletecategory',routesProtect.isAuth,routesProtect.onlyAdmin,kinds.deleteKinds);
*/
module.exports = router;
