
var kinds = require('../../models/db/schemas/kinds.js');
var CRUDaccess = require('./CRUDaccess.js');
var Interface = require('../../controllers/serverResources/Interface.js');
var errorHandler = require('../../controllers/error/errorHandler.js');

var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));

var kindsModel = {

  /* Interface methods */
  create : function(objectData,callback){

      var newFragance = new kinds(objectData);

      newFragance.save(function(err){

          if (err){
                errorHandler.handle(err);
                return;
          }

              callback(newFragance);
      });
  },
  remove : function(objectName,callback){

    kinds.findOneAndRemove({name:objectName},function(err){
                if(err){
                  errorHandler.handle(err);
                  return;
                }
                callback();
    });
  },
  updateByName : function(name,newObject,callback){

    kinds.findOneAndUpdate({name:name},{ $set:newObject}, { new: true }, function (err,kin) {
      if(err){
        errorHandler.handle(err);
        return;
      }
        callback(kin);
    });

  },
  delete : function(callback){
      kinds.remove(function(err){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback();
      });
  },
  getByName : function(objectName,callback){

    kinds.findOne({name:objectName},'-_id',function(err,kin){
        if(err){
          errorHandler.handle(err);
          return;
        }
        callback(kin);
    });

  },
  getAll : function(callback){
    kinds.find({},function(err,kin){

      if(err){
        errorHandler.handle(err);
        return;
      }
      callback(kin);
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

        kinds.find({},'',
        {// parametros de la busqueda
          skip:skipVal,
          limit:limitVal,
          sort:{
              created_at : order
          }
        },function(err,kin){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback(kin);
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

    kinds.find({},'',
    {// parametros de la busqueda
      skip:skipVal,
      limit:limitVal,
      sort:{
          created_at : order
      }
    },function(err,kin){
      if(err){
        errorHandler.handle(err);
        return;
      }
      callback(kin);
    });
  },

    /* Self methods */

    getAllByOrder : function(recent,callback){
      var order;

      if(recent){
          order = 'desc'
      }else{
          order = 'asc';
      }

      kinds.find({},'',
      {// parametros de la busqueda

        sort:{
            created_at : order
        }
      },function(err,kin){
        if(err){
          errorHandler.handle(err);
          return;
        }
        callback(kin);
      });

    }

}
// Asegurarse de que el modelo cuenta con los metodos necesarios de CRUD
Interface.ensureImplements(kindsModel,interfaceInstance);

module.exports = kindsModel;
