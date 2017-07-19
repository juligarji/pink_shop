var routesProtect = require('../middleware/authentication/routesProtect.js');
var permitsRouter = require('../middleware/authentication/permitsRouter.js');
var auth = require('../middleware/authentication/auth.js');

var express = require('express');
var router = express.Router();

var signUpView = function(req,res,next){
    res.status(200).render('home/signUp');
}

var signIn = function(req,res,next){// Pagina principal
    res.status(200).cookie('shop',res.locals.token);
    console.log('usuario aqui +' + req.user);
    /*res.status(200).send({message:'Logueado con exito'});*/
    next();
}

var signOut = function(req,res){
    res.end();
}

/* Puntos de acceso */
router.get('/registrarse',signUpView);
router.post('/signin',auth.signIn,signIn,permitsRouter.routeByPermits);
router.get('/signout',auth.signOut,signOut);

module.exports = router;
