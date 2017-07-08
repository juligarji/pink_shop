var sales = require('../../db/schemas/sales/sales.js');
var salesInfo = require('../../db/schemas/sales/salesInfo.js');
var productsModel = require('../products/productsModel.js');
var kindsModel = require('../products/kindsModel.js');
var CRUDaccess = require('../CRUDaccess.js');
var Interface = require('../../../controllers/serverResources/Interface.js');
var errorHandler = require('../../../controllers/error/errorHandler.js');

var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));

var salesModel = {

  create : function(objectData,callback){

      var saleData = objectData;

      salesInfo.insertMany(saleData.info,function(err,info){
        if (err){
              errorHandler.handle(err);
              return;
        }
        var currentIds = [];
        var max = info.length;
        for(var i=0;i<max;i++){
          currentIds.push(info[i]._id);
        }

        /*console.log("ids");
        console.log(currentIds,null,'\t');*/

        saleData.info = currentIds;

        var newSale = new sales(saleData);
        newSale.save(function(err){
          if (err){// cambiar para borrar sale info si llega a fallar
                errorHandler.handle(err);
                return;
          }

            callback(newSale);
        });
        //saleData.info = info;
        //objectData
      });
  },
    remove : function(objectId,callback){},
    updateByName : function(oldObject,newObject,callback){},
    delete : function(callback){},
    getByName : function(objectName,callback){},
    getAll : function(callback){},
    getPartial : function(recent,ammount,index,callback){},
    getByParameters : function(recent,ammount,index,parameters,callback){}

    /* funciones propias */

}

module.exports = salesModel;
