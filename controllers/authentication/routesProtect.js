


// Proteger rutas privadas a usuarios no autenticados
var services = require('../serverResources/services.js');//importar funcionalidades de encode y decode token
//var cookieParser = require('cookie-parser');


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

module.exports = {
  isAuth};
