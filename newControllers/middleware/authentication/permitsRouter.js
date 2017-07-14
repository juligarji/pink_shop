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

    usersModel.getPermits(req.user,function(permits){


      switch(permits){

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
    });
}





module.exports = {
    routeByPermits
}
