
var users = require('../../db/schemas/users/users.js');
var CRUDaccess = require('../CRUDaccess.js');
var Interface = require('../../../controllers/serverResources/Interface.js');
var errorHandler = require('../../../controllers/error/errorHandler.js');
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
  getAll : function(callback){// quitar esta funcion, era solo para pruebas
    users.find({},function(err,data){
      callback(data);
    });

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
    },

    getPermits : function(email,callback){
        console.log('entro + ' + email);
        users.findOne({email:email}).select('permits').exec(function (err, user) {
          if(err){
            errorHandler.handle(err);
            return;
          }

          callback(user.permits);
        });
    },
    asignPermits : function(email,permits,callback,failback){

      users.findOneAndUpdate({email:email},{ $set:{permits:permits}}, { new: false }, function (err,prod) {
        if(err){
          failback(err);
          return;
        }
          callback();
      });
    },
    getIdByName : function(email,callback,failback){// cuidado con este dato
      users.findOne({email:email}).select('_id').exec(function(err,data){
        if(err){
          failback(err);
          return;
        }
        callback(data._id);
      })
    }

}
// Asegurarse de que el modelo cuenta con los metodos necesarios de CRUD
Interface.ensureImplements(fragancesModel,interfaceInstance);

module.exports = fragancesModel;
