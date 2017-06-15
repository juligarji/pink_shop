var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var routesProtect = require('../authentication/routesProtect.js');
/* Prueba de herencia perfumes */

var fragancesSchema = require('../../models/db/schemas/fragances/fragances.js');
var perfumes = require('../../models/models/frangances/fragancesModel.js');
var usersSchema = require('../../models/db/schemas/users.js');
var users = require('../../models/models/users.js');
var auth = require('../authentication/auth.js');

var herenciaPerfumesTest = function(req,res,next){// Pagina principal

    res.set('Content_type','text/html');
    res.send('<h1>' + perfumes.create() + '</h1>');
}


var rutaPrivada = function(req,res){

  if(!res.locals.authorized){
      res.send({message:'Acceso invalido'});
      return;
  }
  res.status(200).send({message: 'Tienes acceso'});

}
/* Puntos de acceso de las pruebas*/


/* Prueba llamadas a Perfumes */
router.get('/herenciaPerfumes',herenciaPerfumesTest);


/* Pruebas de la privacidad de las rutas */
router.get('/private',routesProtect.isAuth,rutaPrivada);
router.post('/signup',auth.signUp);
router.post('/signin',auth.signIn);

router.get('/users',function(req,res){
    usersSchema.find({},function(err,data){
          res.send(data);
    });
})

router.get('/fragancias',function(req,res){
    fragancesSchema.find({},'-_id',function(err,data){
          res.send(data);
    });
})

router.get('/delete-fragancias',function(req,res){
    fragancesSchema.remove(function(err){
        res.status(200).end();
    });
})

/*prueba de seleccion de password provado*/
router.post('/passwordget',function(req,res){
    users.getEnct('admin@test.com',function(pass){
        res.send(pass);
    });
})

router.get('/delete-users',function(req,res){
    usersSchema.remove(function(err){
        res.status(200).end();
    });
})

/* Pruebas de las fragancias */
var fragances = require('../admin/fragances.js');
//var images = require('./images.js');
router.post('/createfragance',fragances.createFragance);
router.post('/getfragances',fragances.getFragances);

module.exports = router;
