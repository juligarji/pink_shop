var sales = require('../../db/schemas/sales/sales.js');
var salesInfo = require('../../db/schemas/sales/salesInfo.js');
var productsModel = require('../products/productsModel.js');
var kindsModel = require('../products/kindsModel.js');
var CRUDaccess = require('../CRUDaccess.js');
var Interface = require('../../../controllers/serverResources/Interface.js');
var errorHandler = require('../../../controllers/error/errorHandler.js');

var interfaceInstance = new Interface('interfaceInstance',Object.keys(CRUDaccess));

var salesModel = {

  create : function(quotData,callback,failback){

      var saleData = salesModel.sortDataFromQuotation(quotData);
        console.log(saleData);
      var newSale = new sales(saleData);
      newSale.save(function(err){
        if(err){
          failback(err);
          return;
        }
        callback(newSale);
      })

  },
    remove : function(objectId,callback){},
    updateByName : function(oldObject,newObject,callback){},
    delete : function(callback){},
    getByName : function(objectName,callback){},
    getAll : function(callback){},
    getPartial : function(recent,ammount,index,callback){},
    getByParameters : function(recent,ammount,index,parameters,callback){},

    /* funciones propias */
    sortDataFromQuotation : function(quot){
       var outObj = {
         user:quot.user,
         reference:quot.reference,
         products:quot.products,
         meta:quot.metaInfo,
         requested_at:quot.created_at
       }
       return outObj;
    }

}

module.exports = salesModel;
