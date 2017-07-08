
// Proteger rutas privadas a usuarios no autenticados
var services = require('../serverResources/services.js');//importar funcionalidades de encode y decode token
//var cookieParser = require('cookie-parser');
var usersModel = require('../../../models/models/users/users.js');

function isAuth(req,res,next){// verifi si esta autenticado


  if(req.cookies=={} || req.cookies==undefined){
    res.locals.authorized = false;
    res.status(403);
    next();
    return;
  }

    var token = req.cookies.token;
    //var token = req.headers.authorization.split(" ")[1];// Lectura de token atravez del header
  //  var token = req.get('Cookie');

    services.decodeToken(token)
      .then(response =>{

        req.user = response
        res.locals.authorized = true;
        next()
      })

      .catch(response =>{
        //console.log(response);
          res.locals.authorized = false;
          res.status(response.status);
          next()
      })
}

function onlyAdmin(req,res,next){

  if(!res.locals.authorized){// Esta autorizado para ingresar con permisos
      //res.send({message:'No autorizado'});
      res.send({message:'No autorizado'});
      return;
  }

  usersModel.getByName(req.user,function(data){
    var permits = data.permits;
    switch(permits){

        case 4:
          next();
            break;

        default:
          res.send({message:'No autorizado'});

            return;
    }
  });
}

function onlyRegistered(req,res,next){
  if(!res.locals.authorized){// Esta autorizado para ingresar con permisos
      res.send({message:'No autorizado'});
      return;
  }

  usersModel.getByName(req.user,function(data){
    var permits = data.permits;

    switch(permits){

        case 4:
          next();
            break;

        case 2:
          next();
            break;

        default:
          res.send({message:'No autorizado'});
            return;
    }
  });
}


module.exports = {
  isAuth,
  onlyRegistered,
  onlyAdmin
};
