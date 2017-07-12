
var kinds = require('../../db/schemas/products/kinds.js');
var CRUDaccess = require('../CRUDaccess.js');
var Interface = require('../../../controllers/serverResources/Interface.js');

var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));

var kindsModel = {

  create : function(objectData,callback,failback){

      var newKind = new kinds(objectData);

      newKind.save(function(err){

          if (err){
                failback(err);
                return;
          }

              callback(newKind);
      });
  },
  remove : function(objectId,callback,failback){

    kinds.findOneAndRemove({_id:objectId},function(err){
                if(err){
                    failback(err);
                  return;
                }
                callback();
    });
  },
  removeById : function(objectId,callback,failback){

    kinds.findOneAndRemove({_id:objectId},function(err){
                if(err){
                    failback(err);
                  return;
                }
                callback();
    });
  },
  updateByName : function(name,newObject,callback,failback){

    kinds.findOneAndUpdate({name:name},{ $set:newObject}, { new: true }, function (err,fragan) {
      if(err){
        failback(err);
        return;
      }
        callback(fragan);
    });

  },
  delete : function(callback){
      kinds.remove(function(err){
          if(err){
            failback(err);
            return;
          }
          callback();
      });
  },
  getByName : function(objectName,callback,failback){

    kinds.findOne({name:objectName},function(err,fragan){
        if(err){
          failback(err);
          return;
        }
        callback(fragan);
    });

  },
  getAll : function(callback){
    kinds.find({},function(err,fragan){

      if(err){
        failback(err);
        return;
      }
      callback(fragan);
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

        kinds.find({},'',
        {// parametros de la busqueda
          skip:skipVal,
          limit:limitVal,
          sort:{
              created_at : order
          }
        },function(err,fragan){
          if(err){
            failback(err);
            return;
          }
          callback(fragan);
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

    kinds.find({},'',
    {// parametros de la busqueda
      skip:skipVal,
      limit:limitVal,
      sort:{
          created_at : order
      }
    },function(err,fragan){
      if(err){
        failback(err);
        return;
      }
      callback(fragan);
    });
  },
  getAllByOrder : function(recent,callback,failback){
    var order;
    console.log('aqui');
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
        failback(err);
        return;
      }
      callback(kin);
    });

  },
    /* metodos propios */
    getById : function(objId,callback,failback){
      kinds.findOne({_id:objId},function(err,prod){
          if(err){
            failback(err);
            return;
          }
          callback(prod);
      });
    },
    addComponentById : function(idKind,componentId,callback,failback){
      console.log('id :' + idKind)
        kinds.findOne({_id:idKind},function(err,kid){
          if(err){
            failback(err);
            return;
          }

          kid.components.push(componentId);
          kid.save(function(err){
              if(err){
                failback(err);
                return;
              }
            callback(kid);
          });
        });
    },
    getAllPopulated : function(callback,failback){
        kinds.find({}).deepPopulate('components.attributes').exec(function(err,kid){
          if(err){
            failback(err);
            return;
          }
          callback(kid);
        });
    },
    getByIdPopulated : function(objId,callback,failback){
      kinds.findOne({_id:objId}).deepPopulate('components.attributes').exec(function(err,kid){
        if(err){
          failback(err);
          return;
        }
        callback(kid);
      });
    },
    getMaxDiscount : function(objId,callback,failback){
        kinds.findOne({_id:objId}).populate('attributes').exec(function(err,kin){
          var outObj = {
            kind : prod.kind.discount,
            brand : prod.brand.discount,
            tax:prod.tax.value
          }
          var max = kin.attributes.length;
          var bufferArrary = [];
          for(var i=0;i<max;i++){
            bufferArray.push(kin.attributes[i].discount);
          }

          callback(Math.max(bufferArray));
        });
    },
    deleteMultipleByIds : function(arrayIds,callback,failback){// borrar multiple
      kinds.remove({_id:{$in:arrayIds}},function(err){
        if(err){
          failback(err);
          return;
        }
        callback();
      });
    }

}

module.exports = kindsModel;
