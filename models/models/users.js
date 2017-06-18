
var users = require('../db/schemas/users.js');
var CRUDaccess = require('./CRUDaccess.js');
var Interface = require('../../controllers/serverResources/Interface.js');
var errorHandler = require('../../controllers/error/errorHandler.js');
var bcrypt = require('bcrypt-nodejs');

var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));

var fragancesModel = {

  /* Interface methods */
  create : function(objectData,callback){

      var newUser = new users(objectData);

      newUser.save(function(err){

          if (err){
                errorHandler.handle(err);
                return;
          }

              callback(newUser);
      });
  },
  remove : function(objectId,callback){


  },
  updateByName : function(oldObject,newObject,callback){

  },
  delete : function(callback){

  },
  getByName : function(objectName,callback){// email
    users.findOne({email:objectName},function(err,usr){
        if(err){
          errorHandler.handle(err);
          return;
        }
        callback(usr);
    });

  },
  getAll : function(callback){

  },
  getPartial : function(recent,ammount,index,callback){},
  getByParameters : function(recent,ammount,index,parameters,callback){},

    /* Self methods */
    getEnct : function(email,callback){

        users.findOne({email:email}).select('password').exec(function (err, user) {
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback(user.password);
        });

    }

}
// Asegurarse de que el modelo cuenta con los metodos necesarios de CRUD
Interface.ensureImplements(fragancesModel,interfaceInstance);

module.exports = fragancesModel;
