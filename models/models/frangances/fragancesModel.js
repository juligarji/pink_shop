
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
  remove : function(objectName,callback){

    fragances.findOneAndRemove({name:objectName},function(err){
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
    fragances.find({},function(err,fragan){

      if(err){
        errorHandler.handle(err);
        return;
      }
      callback(fragan);
    });
  },
  getPartial : function(recent,ammount,index,callback){

        var skipVal = index*ammount;
        var limitVal = ammount;
        var order;

        if(recent){
            order = 'desc'
        }else{
            order = 'asc';
        }

        fragances.find({},'',
        {// parametros de la busqueda
          skip:skipVal,
          limit:limitVal,
          sort:{
              created_at : order
          }
        },function(err,fragan){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback(fragan);
        });
  },
  getByParameters : function(recent,ammount,index,parameters,callback){
    var skipVal = index*ammount;
    var limitVal = ammount;
    var order;

    if(recent){
        order = 'desc'
    }else{
        order = 'asc';
    }

    fragances.find({},'',
    {// parametros de la busqueda
      skip:skipVal,
      limit:limitVal,
      sort:{
          created_at : order
      }
    },function(err,fragan){
      if(err){
        errorHandler.handle(err);
        return;
      }
      callback(fragan);
    });
  }

    /* Self methods */
}
// Asegurarse de que el modelo cuenta con los metodos necesarios de CRUD
Interface.ensureImplements(fragancesModel,interfaceInstance);

module.exports = fragancesModel;
