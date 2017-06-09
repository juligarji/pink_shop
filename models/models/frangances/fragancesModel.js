
var fragances = require('../../db/schemas/fragances/fragances.js');
var CRUDaccess = require('../CRUDaccess.js');
var Interface = require('../../../controllers/serverResources/Interface.js');
var errorHandler = require('../../../controllers/error/errorHandler.js');

var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));

var fragancesModel = {

  /* Interface methods */
  create : function(objectData,callback){

      var newFragance = new fragances(objectData);

      newFragance.save(function(err){

          if (err){
                errorHandler.handle(err);
                return;
          }

              callback(newFragance);
      });
  },
  remove : function(objectId,callback){

    fragances.findOneAndRemove({_id:prodId},function(err){
                if(err){
                  errorHandler.handle(err);
                  return;
                }
                callback();
    });
  },
  update : function(oldObject,newObject,callback){

  },
  delete : function(callback){
      fragances.remove(function(err){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback();
      });
  },
  getByName : function(objectName,callback){
    fragances.findOne({name:objectName},function(err,fragan){
        if(err){
          errorHandler.handle(err);
          return;
        }
        callback(fragan);
    });

  },
  getAll : function(callback){
    fragances.find({},function(err,function(err,fragan){

      if(err){
        errorHandler.handle(err);
        return;
      }
      callback(fragan);
    }));
  }

    /* Self methods */
}
// Asegurarse de que el modelo cuenta con los metodos necesarios de CRUD
Interface.ensureImplements(fragancesModel,interfaceInstance);

module.exports = fragancesModel;
