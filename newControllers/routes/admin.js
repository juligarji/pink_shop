var express = require('express');
var router = express.Router();
var permitsRouter = require('../middleware/authentication/permitsRouter.js');
var routesProtect = require('../middleware/authentication/routesProtect.js');
var errorHandler = require('../middleware/error/errorHandler.js');


/* Middleware para las rutas */
var products = require('../logic/products/products.js');
var products = products.admin;
var kinds = require('../logic/products/kinds.js');
var attributes = require('../logic/products/attributes/attributes.js');
var components = require('../logic/products/attributes/components.js');
var images = require('../middleware/images/images.js');
var taxes = require('../logic/products/taxes.js');
var brands = require('../logic/products/brands.js');
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
var adminIndex = function(req,res,next){
    console.log('PUUUUUNNN');
    res.status(200).render('admin/index');
}


router.get('/',routesProtect.isAuth,routesProtect.onlyAdmin,adminIndex);
router.get('/categorias',routesProtect.isAuth,routesProtect.onlyAdmin,kinds.renderKinds);
router.get('/atributos',routesProtect.isAuth,routesProtect.onlyAdmin,attributes.renderAttributes);
router.get('/impuestos-marcas',routesProtect.isAuth,routesProtect.onlyAdmin,taxes.renderTaxesAndBrands);
router.get('/productos',routesProtect.isAuth,routesProtect.onlyAdmin,products.renderProducts);


router.post('/createkind',routesProtect.isAuth,routesProtect.onlyAdmin,kinds.createKind);
router.post('/deletekind',routesProtect.isAuth,routesProtect.onlyAdmin,kinds.deleteKind);

router.post('/createcomponent',routesProtect.isAuth,routesProtect.onlyAdmin,components.createComponent);
router.post('/deletecomponent',routesProtect.isAuth,routesProtect.onlyAdmin,components.deleteComponent);

router.post('/createattribute',routesProtect.isAuth,routesProtect.onlyAdmin,attributes.createAttribute);
router.post('/deleteattribute',routesProtect.isAuth,routesProtect.onlyAdmin,attributes.deleteAttribute);

router.post('/createtax',routesProtect.isAuth,routesProtect.onlyAdmin,taxes.createTax);
router.post('/deletetax',routesProtect.isAuth,routesProtect.onlyAdmin,taxes.deleteTax);

router.post('/createbrand',routesProtect.isAuth,routesProtect.onlyAdmin,brands.createBrand);
router.post('/deletebrand',routesProtect.isAuth,routesProtect.onlyAdmin,brands.deleteBrand);

router.post('/products-getattributes',routesProtect.isAuth,routesProtect.onlyAdmin,products.getAttributes);
router.post('/createproduct',routesProtect.isAuth,routesProtect.onlyAdmin,products.createProduct);
router.post('/getEditProduct',routesProtect.isAuth,routesProtect.onlyAdmin,products.getEditProduct);
router.post('/deleteproduct',routesProtect.isAuth,routesProtect.onlyAdmin,products.deleteProduct);
router.post('/deletemultipleproducts',routesProtect.isAuth,routesProtect.onlyAdmin,products.deleteMultipleProducts);
router.post('/products-editphotos',routesProtect.isAuth,routesProtect.onlyAdmin,products.editPhotosProduct);
router.post('/products-editsingle',routesProtect.isAuth,routesProtect.onlyAdmin,products.editProduct);
router.post('/products-query',routesProtect.isAuth,routesProtect.onlyAdmin,products.queryAdmin);



// IMAGES

router.post('/newpicture',routesProtect.isAuth,routesProtect.onlyAdmin,images.upload,images.createPicture);
router.post('/deletepicture',routesProtect.isAuth,routesProtect.onlyAdmin,images.deletePicture);
/*
router.post('/createcategory',routesProtect.isAuth,routesProtect.onlyAdmin,kinds.createKinds);
router.post('/deletecategory',routesProtect.isAuth,routesProtect.onlyAdmin,kinds.deleteKinds);
*/
module.exports = router;
