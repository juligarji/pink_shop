var clients = require('../../db/schemas/users/clients.js');
var users = require('./users.js');
var CRUDaccess = require('../CRUDaccess.js');
var Interface = require('../../../controllers/serverResources/Interface.js');
var errorHandler = require('../../../controllers/error/errorHandler.js');
var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));


var clientsModel = {

  create : function(objectData,callback){

      var newTax = new clients(objectData);

      newTax.save(function(err){

          if (err){
                errorHandler.handle(err);
                return;
          }

              callback(newTax);
      });
  },
  remove : function(objectName,callback){

    clients.findOneAndRemove({name:objectName},function(err){
                if(err){
                  errorHandler.handle(err);
                  return;
                }
                callback();
    });
  },
  updateByName : function(name,newObject,callback){

    clients.findOneAndUpdate({name:name},{ $set:newObject}, { new: true }, function (err,tax) {
      if(err){
        errorHandler.handle(err);
        return;
      }
        callback(tax);
    });

  },
  delete : function(callback){
      clients.remove(function(err){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback();
      });
  },
  getByName : function(objectName,callback){

    clients.findOne({name:objectName},'-_id',function(err,tax){
        if(err){
          errorHandler.handle(err);
          return;
        }
        callback(tax);
    });

  },
  getAll : function(callback){
    clients.find({},function(err,tax){

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

        clients.find({},'',
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

    clients.find({},'',
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
      clients.findOne({_id:objId},function(err,prod){
          if(err){
            errorHandler.handle(err);
            return;
          }
          callback(prod);
      });
    },
    removeById : function(objectId,callback){

      clients.findOneAndRemove({_id:objectId},function(err){
                  if(err){
                    errorHandler.handle(err);
                    return;
                  }
                  callback();
      });
    },
    getByName : function(email,callback,failback){
      users.getIdByName(email,function(data){
          clients.findOne({_id:data},function(err,cli){
              if(err){
                failback(err);
                return;
              }
                callback(cli);
          });
      },failback);
    }

}

module.exports = clientsModel;
