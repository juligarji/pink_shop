var attributes = require('../../../db/schemas/products/attributes/attributes.js');
var CRUDaccess = require('../../CRUDaccess.js');
var Interface = require('../../../../controllers/serverResources/Interface.js');

var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));

var attributesModel = {

  create : function(objectData,callback,failback){

      var newattribute = new attributes(objectData);

      newattribute.save(function(err){

          if (err){
                failback(err);
                return;
          }

              callback(newattribute);
      });
  },
  remove : function(objectName,callback){

    attributes.findOneAndRemove({name:objectName},function(err){
                if(err){
                  failback(err);
                  return;
                }
                callback();
    });
  },
  updateByName : function(name,newObject,callback,failback){

    attributes.findOneAndUpdate({name:name},{ $set:newObject}, { new: true }, function (err,attr) {
      if(err){
        failback(err);
        return;
      }
        callback(attr);
    });

  },
  delete : function(callback,failback){
      attributes.remove(function(err){
          if(err){
            failback(err);
            return;
          }
          callback();
      });
  },
  getByName : function(objectName,callback,failback){

    attributes.findOne({name:objectName},'-_id',function(err,attr){
        if(err){
          failback(err);
          return;
        }
        callback(attr);
    });

  },
  getAll : function(callback,failback){
    attributes.find({},function(err,attr){

      if(err){
        failback(err);
        return;
      }
      callback(attr);
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

        attributes.find({},'',
        {// parametros de la busqueda
          skip:skipVal,
          limit:limitVal,
          sort:{
              created_at : order
          }
        },function(err,attr){
          if(err){
            failback(err);
            return;
          }
          callback(attr);
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

    attributes.find({},'',
    {// parametros de la busqueda
      skip:skipVal,
      limit:limitVal,
      sort:{
          created_at : order
      }
    },function(err,attr){
      if(err){
        failback(err);
        return;
      }
      callback(attr);
    });
  },

  getAllByOrder : function(recent,callback,failback){
    var order;

    if(recent){
        order = 'desc'
    }else{
        order = 'asc';
    }

    attributes.find({},'',
    {// parametros de la busqueda

      sort:{
          created_at : order
      }
    },function(err,attr){
      if(err){
        failback(err);
        return;
      }
      callback(attr);
    });

  },

    /* metodos propios */
    getById : function(objId,callback,failback){
      attributes.findOne({_id:objId},function(err,prod){
          if(err){
            failback(err);
            return;
          }
          callback(prod);
      });
    },
    removeById : function(objectId,callback,failback){

      attributes.findOneAndRemove({_id:objectId},function(err){
        if(err){
          failback(err);
          return;
        }
          callback();
      });
    },
    deleteMultipleByIds : function(arrayIds,callback,failback){// borrar multiple
      attributes.remove({_id:{$in:arrayIds}},function(err){
        if(err){
          failback(err);
          return;
        }
        callback();
      });
    }
}


module.exports = attributesModel;
