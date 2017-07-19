var express = require('express');
var usersModel = require('../../../models/models/users/users.js');
/*  PROVISIONAL DIRECCIONES DE RUTAS, CAMBIAR POR ALGO MAS SEGURO  */
var hashAddress = {};

hashAddress['EtW0fe6n4D'] = '/home';
hashAddress['P0jRhHMWYS'] = '/admin/';
hashAddress['BkEprEaiVV'] = '/venta/checkout';


function routeByPermits(req,res,next){
    /*var permits = res.locals.user.permits;
    console.log(permits);*/

    if(!res.locals.authorized){// Esta autorizado para ingresar con permisos
      console.log('No autorizado');
        //res.status(401).render('home/index');
        res.status(200).redirect('/home');
        return;
    }

    usersModel.getPermits(res.locals.user,function(permits){

      /*
      switch(permits){
          ESTA ES LA BUENA MANERA DE HACERLO, CORREGGIR PARA ROUTEAR CLIENTE DESDE UNA LLAMADA POST
          case 4:

            res.redirect('/admin/');
              break;
          case 2:
          console.log('permisos 2');
            res.redirect('/admin/');
              break;

          default:
            res.redirect('/home');
              return;
      }
      next();
    });*/

    switch(permits){
        case 4:

          res.status(200).send({message:'Ingreso exitoso Super',data:'/admin/'});
            break;
        case 2:
        console.log('permisos 2');
          res.status(200).send({message:'Ingreso exitoso Admin',data:'/admin/'});
            break;

        default:
          res.status(200).send({message:'Ingreso exitoso Cliente',data:'/admin/'});
            return;
    }
    next();
  });


}

function logInRouting(req,res,next){
    /*var permits = res.locals.user.permits;
    console.log(permits);*/

    if(!res.locals.authorized){// Esta autorizado para ingresar con permisos
      console.log('No autorizado');
        //res.status(401).render('home/index');
        res.status(200).redirect('/registro');
        return;
    }

    usersModel.getPermits(res.locals.user,function(permits){

      switch(permits){

          case 4:
            res.redirect('/admin/');
              break;
          case 2:
          console.log('permisos 2');
            res.redirect('/admin/');
              break;

          case 1:
            res.redirect('/usuario');
              break;

          default:// implementar el caso uno de los usuarios
            res.redirect('/registro');
              return;
      }
      next();
    });
}





module.exports = {
    routeByPermits,
    logInRouting
}
