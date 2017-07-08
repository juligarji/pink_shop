var express = require('express');
var users = require('../../models/models/users/users.js');



function routeByPermits(req,res,next){
    /*var permits = res.locals.user.permits;
    console.log(permits);*/

    if(!res.locals.authorized){// Esta autorizado para ingresar con permisos
      console.log('No autorizado');
        res.render('home/index');
        return;
    }

    users.getByName(req.user,function(data){
      var permits = data.permits;


      console.log('Si esta autorizado');
      switch(permits){

          case 4:

            res.render('admin/index');
              break;

          default:
              return;
      }
      next();

    });


}

module.exports = {
    routeByPermits
}
