var components = require('../../../db/schemas/products/attributes/components.js');
var CRUDaccess = require('../../CRUDaccess.js');
var Interface = require('../../../../controllers/serverResources/Interface.js');

var attributesModel = require('./attributesModel.js');

var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));

var componentsModel = {

  create : function(objectData,callback,failback){

      var newComponent = new components(objectData);

      newComponent.save(function(err){

          if (err){
                failback(err);
                return;
          }

              callback(newComponent);
      });
  },
  remove : function(objectName,callback,failback){

    components.findOneAndRemove({name:objectName},function(err){
                if(err){
                  failback(err);
                  return;
                }
                callback();
    });
  },
  updateByName : function(name,newObject,callback,failback){

    components.findOneAndUpdate({name:name},{ $set:newObject}, { new: true }, function (err,comp) {
      if(err){
        failback(err);
        return;
      }
        callback(comp);
    });

  },
  delete : function(callback,failback){
      components.remove(function(err){
          if(err){
            failback(err);
            return;
          }
          callback();
      });
  },
  getByName : function(objectName,callback,failback,failback){

    components.findOne({name:objectName},'-_id',function(err,comp){
        if(err){
          failback(err);
          return;
        }
        callback(comp);
    });

  },
  getAll : function(callback){
    components.find({},function(err,comp){

      if(err){
        failback(err);
        return;
      }
      callback(comp);
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

        components.find({},'',
        {// parametros de la busqueda
          skip:skipVal,
          limit:limitVal,
          sort:{
              created_at : order
          }
        },function(err,comp){
          if(err){
            failback(err);
            return;
          }
          callback(comp);
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

    components.find({},'',
    {// parametros de la busqueda
      skip:skipVal,
      limit:limitVal,
      sort:{
          created_at : order
      }
    },function(err,comp){
      if(err){
        failback(err);
        return;
      }
      callback(comp);
    });
  },
    getPopulated : function(callback,failcall){
        components.find({}).populate('attributes').exec(function(err,comp){
            if(err){
              failcall(err);
              return;}
              callback(comp);
        });
    },
    /* metodos propios */
    getById : function(objId,callback,failback){
      components.findOne({_id:objId},function(err,prod){
          if(err){
            failback(err);
            return;
          }
          callback(prod);
      });
    },
    removeById : function(objectId,callback,failback){

      components.findOneAndRemove({_id:objectId},function(err){
        if(err){
          failback(err);
          return;
        }
          callback();
      });
    },
    getAttributesById : function(objectId,callback,failback){
      components.findOne({_id:objectId},function(err,comp){
        if(err){
          failback(err);
          return;
        }
          callback(comp.attributes);
      });
    },
    addAttributeById : function(idComp,attributeId,callback,failback){

        components.findOne({_id:idComp},function(err,comp){
          if(err){
            failback(err);
            return;
          }
        
          comp.attributes.push(attributeId);
          comp.save(function(err){
              if(err){
                failback(err);
                return;
              }
            callback(comp);
          });
        });
    },
    removeAttributeById : function(idComp,idAttr,callback,failback){
      components.findOne({_id:idComp},function(err,comp){
        if(err){
          failback(err);
          return;
        }
        var index = comp.attributes.indexOf(idAttr);

        if(index==-1){
          failback({code:404});
          return;
        }
        comp.attributes.splice(index,1);
        comp.save(function(err){
            if(err){
              failback(err);
              return;
            }
          callback(comp);
        });
      });
    }
}


module.exports = componentsModel;
