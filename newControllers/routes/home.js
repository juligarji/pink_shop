var express = require('express');
var router = express.Router();

var permitsRouter = require('../middleware/authentication/permitsRouter.js');
var routesProtect = require('../middleware/authentication/routesProtect.js');
//var fragances = require('./fragances.js');
var products = require('../logic/products/products.js');
var cart = require('../logic/products/cart.js');


/* Puntos de acceso */
// protegiendo las rutas para el acceso no autorizado

router.post('/getproduct',products.getProducts);
router.post('/getsingleproduct',products.getSingleProduct);
router.post('/getproductprice',products.getPrice);

router.get('/',routesProtect.isAuth,permitsRouter.routeByPermits);
// crear rutas segun los productos que desee mostrar */
router.get('/perfumeria',routesProtect.isAuth,products.loadProductsView);
router.get('/detalles/:name',products.viewDetails);
router.get('/carrito',cart.loadCartView);

/*router.get('/detalles',function(req,res){
    console.log('si llego');
    res.end();
});*/
module.exports = router;
