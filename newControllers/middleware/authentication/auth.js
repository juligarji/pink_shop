
var users = require('../../../models/models/users/users.js');//modelo del usuario
var services = require('../serverResources/services.js');
var encryptor = require('../serverResources/encryptor');
var errorHandler = require('../error/errorHandler.js');
var serverCodes = require('../../../serverCodes.js');


function signUp(req,res){ //REgistrarse
      var data = req.body;

    var user = {
      email:data.email,
      displayName:data.displayName,
      password:data.password
    }

    users.create(user,function(newUser){// aregrlal autorizacion

      encryptor.compare(user.idPermits,serverCodes.SUPER_KEY,function(cond){

        if(cond){// es un super usuario
            users.asignPermits(newUser.email,4,function(){

              res.status(200).send({token:services.createToken(newUser)});

            },function(err){
                errorHandler.mongoose(err,res);
            });
            return;
        }

        encryptor.compare(user.idPermits,serverCodes.ADMIN_KEY,function(variable){
            if(variable){
              users.asignPermits(newUser.email,2,function(){

                res.status(200).send({token:services.createToken(newUser)});

              },function(err){
                  errorHandler.mongoose(err,res);
              });
              return;
            }

            users.asignPermits(newUser.email,1,function(){
              // es un usuario cualquiera



              res.status(200).send({token:services.createToken(newUser)});

            },function(err){
                errorHandler.mongoose(err,res);
            });

        });
      });

    },function(err){
        errorHandler.mongoose(err,res);
        return;
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
            console.log('autorizado');
            res.locals.authorized = true;
            res.locals.user = data;
            res.locals.token = services.createToken(data);
            next();
      });
  });
}

function signOut(req,res,next){

    res.clearCookie('shop');
    res.status(200);
    next();
}

function checkPassword(email,pass,callback){//verificar si las contraseñas concuerdan

    users.getEnct(email,function(data){
          encryptor.compare(pass,data,function(state){
              callback(state);
          });
    });
  }

module.exports = {
    signIn,
    signUp,
    signOut
}
