var taxes = require('../../db/schemas/products/taxes.js');
var CRUDaccess = require('../CRUDaccess.js');
var Interface = require('../../../controllers/serverResources/Interface.js');
var errorHandler = require('../../../controllers/error/errorHandler.js');
var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));


var taxesModel = {

  create : function(objectData,callback){

      var newTax = new taxes(objectData);

      newTax.save(function(err){

          if (err){
                errorHandler.handle(err);
                return;
          }

              callback(newTax);
      });
  },
  remove : function(objectName,callback){

    taxes.findOneAndRemove({name:objectName},function(err){
                if(err){
                  errorHandler.handle(err);
                  return;
                }
                callback();
    });
  },
  updateByName : function(name,newObject,callback){

    taxes.findOneAndUpdate({name:name},{ $set:newObject}, { new: true }, function (err,tax) {
      if(err){
        errorHandler.handle(err);
        return;
      }
        callback(tax);
    });

  },
  delete : function(callback){
      taxes.remove(function(err){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback();
      });
  },
  getByName : function(objectName,callback){

    taxes.findOne({name:objectName},'-_id',function(err,tax){
        if(err){
          errorHandler.handle(err);
          return;
        }
        callback(tax);
    });

  },
  getAll : function(callback){
    taxes.find({},function(err,tax){

      if(err){
        errorHandler.handle(err);
        return;
      }
      callback(tax);
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

        taxes.find({},'',
        {// parametros de la busqueda
          skip:skipVal,
          limit:limitVal,
          sort:{
              created_at : order
          }
        },function(err,tax){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback(tax);
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

    taxes.find({},'',
    {// parametros de la busqueda
      skip:skipVal,
      limit:limitVal,
      sort:{
          created_at : order
      }
    },function(err,tax){
      if(err){
        errorHandler.handle(err);
        return;
      }
      callback(tax);
    });
  },

    /* metodos propios */
    getById : function(objId,callback){
      taxes.findOne({_id:objId},function(err,prod){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback(prod);
      });
    },

}

module.exports = taxesModel;
