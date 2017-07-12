
var products = require('../../db/schemas/products/products.js');
var CRUDaccess = require('../CRUDaccess.js');
var Interface = require('../../../controllers/serverResources/Interface.js');
var errorHandler = require('../../../controllers/error/errorHandler.js');
var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));


var productsModel = {

  create : function(objectData,callback,failback){

      var newProduct = new products(objectData);

      newProduct.save(function(err){

          if (err){
                failback(err);
                return;
          }

              callback(newProduct);
      });
  },
  remove : function(objectName,callback,failback){

    products.findOneAndRemove({name:objectName},function(err){
                if(err){
                  failback(err);
                  return;
                }
                callback();
    });
  },
  updateByName : function(name,newObject,callback,failback){

    products.findOneAndUpdate({name:name},{ $set:newObject}, { new: true }, function (err,prod) {
      if(err){
        failback(err);
        return;
      }
        callback(prod);
    });

  },

  delete : function(callback,failback){
      products.remove(function(err){
          if(err){
            failback(err);
            return;
          }
          callback();
      });
  },
  getByName : function(objectName,callback,failback){

    products.findOne({name:objectName},'-_id',function(err,prod){
        if(err){
          failback(err);
          return;
        }
        callback(prod);
    });

  },
  getAll : function(callback,failback){
    products.find({},function(err,prod){

      if(err){
        failback(err);
        return;
      }
      callback(prod);
    });
  },
  getPartial : function(recent,ammount,index,kind,callback,failback){

        var skipVal = index*ammount;
        var limitVal = ammount;
        var order;

        if(recent){
            order = 'desc'
        }else{
            order = 'asc';
        }
        products.find({kind:kind},'',
        {// parametros de la busqueda
          skip:skipVal,
          limit:limitVal,
          sort:{
              created_at : order
          }
        },function(err,prod){
          if(err){
            failback(err);
            return;
          }
          callback(prod);
        });
  },
  getByParameters : function(recent,ammount,index,kind,parameters,callback,failback){
    var skipVal = index*ammount;
    var limitVal = ammount;
    var order;

    if(recent){
        order = 'desc'
    }else{
        order = 'asc';
    }

    products.find({kind:kind},'',
    {// parametros de la busqueda
      skip:skipVal,
      limit:limitVal,
      sort:{
          created_at : order
      }
    },function(err,prod){
      if(err){
        failback(err);
        return;
      }
      callback(prod);
    });
  },

    getById : function(objId,callback,failback){
      products.findOne({_id:objId},function(err,prod){
          if(err){
            failback(err);
            return;
          }
          callback(prod);
      });
    },


    /* funciones propias */

    getTaxById : function(objId,callback,failback){
      products.findOne({_id:objId}).populate('attributes').exec(function(err,prod){
        if(err){
          failback(err);
          return;
        }
        callback(prod.tax.value);
      });
    },
    removeById : function(objectId,callback,failback){

      products.findOneAndRemove({_id:objectId},function(err){
                  if(err){
                    failback(err);
                    return;
                  }
                  callback();
      });
    },

    getAllMoneyValues : function(objId,callback,failback){
        products.findOne({_id:objId}).populate('kind','brand','tax').exec(function(err,prod){
          var outObj = {
            kind : prod.kind.discount,
            brand : prod.brand.discount,
            tax:prod.tax.value
          }
          callback(outObj);
        });
    },
    /* funcionalidades */
    existsAmmount : function(data,ammount){
        if(data.ammount >= ammount){
          return true;
        }
        return false;
    },
    populateAllDataById : function(dataId,callback,failback){
      products.findOne({_id:dataId}).deepPopulate('kind kind.components kind.components.attributes attributes brand tax').exec(function(err,prod){
        if(err){
          failback(err);
          return;
        }
          console.log('populate exitoso');
          callback(prod);

          });
      },
      populateAllDataByMultipleId : function(arrayId,callback,failback){
        products.find({_id:{$in:arrayId}}).deepPopulate('kind kind.components kind.components.attributes attributes brand tax').exec(function(err,prod){
          if(err){
            failback(err);
            return;
          }
            console.log('populate exitoso');
            callback(prod);

            });
        },
      getAllPopulated : function(callback,failback){
        products.find({}).deepPopulate('kind kind.components kind.components.attributes attributes brand tax').exec(function(err,prod){
          if(err){
            failback(err);
            return;
          }
            console.log('populate exitoso');
            callback(prod);

            });
      },
      updatePicturesById : function(objId,newPhotos,callback,failback){

        products.findOneAndUpdate({_id:objId},{ $set:{photos:newPhotos}}, { new: false }, function (err,prod) {
          if(err){
            failback(err);
            return;
          }
            callback(prod);
        });

      },
      updateAllById : function(idObj,newObject,callback,failback){

        products.findOneAndUpdate({_id:idObj},{ $set:newObject}, { new: true }, function (err,prod) {
          if(err){
            failback(err);
            return;
          }
            callback(prod);
        });

      },
      getQuerySearch : function(data,callback,failback){

            var query = {};
            var options= {
              sort:{},
            };
            if(data.limit>0){
                options.limit=data.limit;
            }

            if(data.search!=''){ // tipo de busqueda
              if(!data.exactTypeSearch){
                query[data.typeSearch] = {
                    $regex : data.search,
                    $options:'i'
                };
              }else{
                    query[data.typeSearch] = data.search;
              }
            }

            if(data.kind!=-1){ // el tipo es importante
              query.kind = data.kind;
              var attributesArray = [];
              data.attributes.forEach(function(attr){
                if(attr!=-1){
                  attributesArray.push(attr);
                }
              });
              if(attributesArray.length>0){// si hay atributos
                query.attributes = {$in : attributesArray}
              }
            }
            if(data.brand!=-1){
              query.brand = data.brand;
            }

            if(data.datePicker!=''&&data.datePicker!=undefined){// se definio una fecha
              query.created_at = {
                $gte:data.lowerDate,
                $lt:data.upperDate
              }
            }

            if(data.typeSort=='lower'){
              options.sort[data.orderType]=1;
            }else{
                options.sort[data.orderType]=-1;
            }


            products.find(query,'',options,function(err,prod){
              if(err){
                failback(err);
                return;
              }
              callback(prod);
            });
      },
}


module.exports = productsModel;
