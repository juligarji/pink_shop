var brands = require('../../db/schemas/products/brands.js');
var CRUDaccess = require('../CRUDaccess.js');
var Interface = require('../../../controllers/serverResources/Interface.js');

var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));


var brandsModel = {

  create : function(objectData,callback,failback){

      var newBrand = new brands(objectData);

      newBrand.save(function(err){

          if (err){
                //errorHandler.handle(err);
                failback(err);
                return;
          }

              callback(newBrand);
      });
  },
  remove : function(objectName,callback,failback){

    brands.findOneAndRemove({name:objectName},function(err){
                if(err){

                  failback(err);
                  return;
                }
                callback();
    });
  },
  updateByName : function(name,newObject,callback,failback){

    brands.findOneAndUpdate({name:name},{ $set:newObject}, { new: true }, function (err,bran) {
      if(err){
        failback(err);
        return;
      }
        callback(bran);
    });

  },
  delete : function(callback,failback){
      brands.remove(function(err){
          if(err){
            failback(err);
            return;
          }
          callback();
      });
  },
  getByName : function(objectName,callback,failback){

    brands.findOne({name:objectName},'-_id',function(err,bran){
        if(err){
          failback(err);
          return;
        }
        callback(bran);
    });

  },
  getAll : function(callback,failback){
    brands.find({},function(err,bran){

      if(err){
        failback(err);
        return;
      }
      callback(bran);
    });
  },
  getPartial : function(recent,ammount,index,callback,failback){

        var skipVal = index*ammount;
        var limitVal = ammount;
        var order;

        if(recent){
            order = 'desc'
        }else{
            order = 'asc';
        }

        brands.find({},'',
        {// parametros de la busqueda
          skip:skipVal,
          limit:limitVal,
          sort:{
              created_at : order
          }
        },function(err,bran){
          if(err){
            failback(err);
            return;
          }
          callback(bran);
        });
  },
  getByParameters : function(recent,ammount,index,parameters,callback,failback){
    var skipVal = index*ammount;
    var limitVal = ammount;
    var order;

    if(recent){
        order = 'desc'
    }else{
        order = 'asc';
    }

    brands.find({},'',
    {// parametros de la busqueda
      skip:skipVal,
      limit:limitVal,
      sort:{
          created_at : order
      }
    },function(err,bran){
      if(err){
        failback(err);
        return;
      }
      callback(bran);
    });
  },

    /* metodos propios */
    getById : function(objId,callback,failback){
      brands.findOne({_id:objId},function(err,prod){
          if(err){
            failback(err);
            return;
          }
          callback(prod);
      });
    },

}

module.exports = brandsModel;
