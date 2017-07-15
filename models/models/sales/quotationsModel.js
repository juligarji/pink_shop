var quotations = require('../../db/schemas/sales/quotations.js');
var CRUDaccess = require('../CRUDaccess.js');
var Interface = require('../../../controllers/serverResources/Interface.js');
var errorHandler = require('../../../controllers/error/errorHandler.js');
var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));


var quotationsModel = {

  create : function(objectData,user,callback,failback){

      var objectSort = quotationsModel.sortDataToCreate(objectData);
      objectSort.modified_at = Date.now();
      objectSort.user = user;

      var newQuotation = new quotations(objectSort);

      newQuotation.save(function(err){

          if (err){
                failback(err);
                return;
          }

              callback(newQuotation);
      });
  },
  remove : function(objectName,callback){

    quotations.findOneAndRemove({name:objectName},function(err){
                if(err){
                  errorHandler.handle(err);
                  return;
                }
                callback();
    });
  },
  updateByName : function(name,newObject,callback){

    quotations.findOneAndUpdate({name:name},{ $set:newObject}, { new: true }, function (err,tax) {
      if(err){
        errorHandler.handle(err);
        return;
      }
        callback(tax);
    });

  },
  delete : function(callback){
      quotations.remove(function(err){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback();
      });
  },
  getByName : function(objectName,callback){

    quotations.findOne({name:objectName},'-_id',function(err,tax){
        if(err){
          errorHandler.handle(err);
          return;
        }
        callback(tax);
    });

  },
  getAll : function(callback){
    quotations.find({},function(err,tax){

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

        quotations.find({},'',
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

    quotations.find({},'',
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
      quotations.findOne({_id:objId},function(err,prod){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback(prod);
      });
    },
    getByReference : function(objReference,callback,failback){
      quotations.findOne({reference:objReference},function(err,prod){
          if(err){
            failback(err);
            return;
          }
          callback(prod);
      });
    },
    removeById : function(objectId,callback){

      quotations.findOneAndRemove({_id:objectId},function(err){
                  if(err){
                    errorHandler.handle(err);
                    return;
                  }
                  callback();
      });
    },

    /* funciones propias */
    sortDataToCreate : function(objectData){
      // se recibe un array completo de productos y meta para organizarlos
      var outObj = {
        products:[],
        metaInfo:{}
      };
      console.log(objectData,null,'\t');
      objectData.products.forEach(function(dataElement){
          outObj.products.push({
              id:dataElement._id,
              ammount:dataElement.ammount
          });
      });
      outObj.metaInfo = objectData.meta;
      return outObj;
    },
    deleteByReference : function(objectReference,callback,failback){
        quotations.findOneAndRemove({reference:objectReference},function(err){
                  if(err){
                    failback(err);
                    return;
                  }
                  callback();
      });
      callback(); // cambiar no olbvidar
    }

}

module.exports = quotationsModel;
