var express = require('express');
var router = express.Router();

var permitsRouter = require('../middleware/authentication/permitsRouter.js');
var routesProtect = require('../middleware/authentication/routesProtect.js');

var payments = require('../logic/sales/payments.js');



// modificar para proteger las rutas

/* manejador de metodos de pago*/
router.post('/payproducts',payments.payProducts);
router.post('/recievebypayu',payments.getCurrentMethods()['payU'].handleResponse,payments.handleStateResponse);
router.get('/recievebypayu',function(req,res,next){
      console.log('SE HIZO UN GET A RECIEVE PAYU !!');
      res.send('hola chavales');
      res.end();
});
module.exports = router;
