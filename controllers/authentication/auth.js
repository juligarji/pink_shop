
var users = require('../../models/models/users.js');//modelo del usuario
var services = require('../serverResources/services.js');
var bcrypt = require('bcrypt-nodejs');
var errorHandler = require('../error/errorHandler.js');

function signUp(req,res){ //REgistrarse

    var user = {
      email:req.body.email,
      displayName:req.body.displayName,
      password:req.body.password,
      permits:parseInt(req.body.permits)
    }

    users.create(user,function(newUser){
        return res.status(200).send({token:services.createToken(newUser)});
    });
}

function signIn(req,res,next){//loggearse

  users.getByName(req.body.email,function(data){
      if(data==null){
          res.locals.authorized = false;
          //res.status(404).send('Usuario no existe');
          res.status(404).send('Usuario no Existe');
          res.end();
          return;
      }

      //if(!checkPassword(req.body.email,req.body.password)){
      //  res.status(403).send({message:'Contraseña incorrecta'});
      checkPassword(req.body.email,req.body.password,function(response){
            if(!response){
                res.locals.authorized = false;
                res.status(403).send('Contraseña Incorrecta');
                res.end();
                return;
            }

            res.locals.authorized = true;
            res.locals.user = data;
            res.locals.token = services.createToken(data);
            next();
      });
  });
}

function signOut(req,res,next){

    res.clearCookie('token');
    res.status(200);
    next();
}

function checkPassword(email,pass,callback){//verificar si las contraseñas concuerdan

    users.getEnct(email,function(data){

                bcrypt.compare(pass,data,function(err,response){
                  if(err){
                    errorHandler.handle(err,'Error al comparar contraseña');
                    return;
                  }
                  callback(response);
                });
    });
  }



module.exports = {
    signIn,
    signUp,
    signOut
}
