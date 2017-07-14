var express = require('express');
var router = express.Router();

var permitsRouter = require('../middleware/authentication/permitsRouter.js');
var routesProtect = require('../middleware/authentication/routesProtect.js');
//var fragances = require('./fragances.js');
var products = require('../logic/products/products.js');
var products = products.client;
var cart = require('../logic/products/cart.js');


/* Puntos de acceso */
// protegiendo las rutas para el acceso no autorizado

var mainPage = function(req,res,next){
    res.status(200).render('home/index');
    return;
}


router.post('/getproductsqueried',products.getProductsQueried);
router.post('/getsingleproduct',products.getSingleProduct);
router.post('/getproductprice',products.getPrice);
router.post('/productinstock',products.isInStock);



router.get('/',routesProtect.isAuth,permitsRouter.routeByPermits);
router.get('/home',mainPage);
// crear rutas segun los productos que desee mostrar */
router.get('/productos/:type',routesProtect.isAuth,products.loadProductsView);
router.get('/detalles/:idProd',products.viewDetails);

router.get('/carrito',cart.loadCartView);

router.post('/totalizatecart',cart.totalizateCart);


/*router.get('/detalles',function(req,res){
    console.log('si llego');
    res.end();
});*/
module.exports = router;
