var routesProtect = require('../middleware/authentication/routesProtect.js');

var auth = require('../middleware/authentication/auth.js');

var express = require('express');
var router = express.Router();

var signIn = function(req,res,next){// Pagina principal
    res.status(200).send({message:'Logueado con exito',token:res.locals.token});
}

var signOut = function(req,res){
    res.end();
}

/* Puntos de acceso */
router.post('/signin',auth.signIn,signIn);
router.get('/signout',auth.signOut,signOut);


module.exports = router;
