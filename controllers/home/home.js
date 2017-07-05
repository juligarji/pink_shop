var express = require('express');
var router = express.Router();

var permitsRouter = require('../authentication/permitsRouter.js');
var routesProtect = require('../authentication/routesProtect.js');
var fragances = require('./fragances.js');
var cart = require('../cart/cart.js');


/* Puntos de acceso */
// protegiendo las rutas para el acceso no autorizado
router.post('/getfragances',fragances.getFragances);
router.post('/getsinglefragance',fragances.getSingleFragance);
router.post('/getfragancesprice',fragances.getPrice);

router.get('/',routesProtect.isAuth,permitsRouter.routeByPermits);
router.get('/perfumeria',routesProtect.isAuth,fragances.loadFragancesView);
router.get('/detalles/:name',fragances.viewDetails);
router.get('/carrito',cart.loadCartView);
/*router.get('/detalles',function(req,res){
    console.log('si llego');
    res.end();
});*/
module.exports = router;
