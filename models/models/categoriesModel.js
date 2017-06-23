
var categories = require('../../models/db/schemas/categories.js');
var CRUDaccess = require('./CRUDaccess.js');
var Interface = require('../../controllers/serverResources/Interface.js');
var errorHandler = require('../../controllers/error/errorHandler.js');

var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));

var fragancesModel = {

  /* Interface methods */
  create : function(objectData,callback){

      var newFragance = new categories(objectData);

      newFragance.save(function(err){

          if (err){
                errorHandler.handle(err);
                return;
          }

              callback(newFragance);
      });
  },
  remove : function(objectName,callback){

    categories.findOneAndRemove({name:objectName},function(err){
                if(err){
                  errorHandler.handle(err);
                  return;
                }
                callback();
    });
  },
  updateByName : function(name,newObject,callback){

    categories.findOneAndUpdate({name:name},{ $set:newObject}, { new: true }, function (err,categ) {
      if(err){
        errorHandler.handle(err);
        return;
      }
        callback(categ);
    });

  },
  delete : function(callback){
      categories.remove(function(err){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback();
      });
  },
  getByName : function(objectName,callback){

    categories.findOne({name:objectName},'-_id',function(err,categ){
        if(err){
          errorHandler.handle(err);
          return;
        }
        callback(categ);
    });

  },
  getAll : function(callback){
    categories.find({},function(err,categ){

      if(err){
        errorHandler.handle(err);
        return;
      }
      callback(categ);
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

        categories.find({},'',
        {// parametros de la busqueda
          skip:skipVal,
          limit:limitVal,
          sort:{
              created_at : order
          }
        },function(err,categ){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback(categ);
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

    categories.find({},'',
    {// parametros de la busqueda
      skip:skipVal,
      limit:limitVal,
      sort:{
          created_at : order
      }
    },function(err,categ){
      if(err){
        errorHandler.handle(err);
        return;
      }
      callback(categ);
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

      categories.find({},'',
      {// parametros de la busqueda

        sort:{
            created_at : order
        }
      },function(err,categ){
        if(err){
          errorHandler.handle(err);
          return;
        }
        callback(categ);
      });

    }

}
// Asegurarse de que el modelo cuenta con los metodos necesarios de CRUD
Interface.ensureImplements(fragancesModel,interfaceInstance);

module.exports = fragancesModel;
