var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var errorHandler = require('../../../../controllers/error/errorHandler.js');
var helperPrice = require('../../../models/helpers/helperPrice');

var quotations = require('./quotations.js');
var products = require('../products/products.js');

var Schema = mongoose.Schema;

var salesSchema = new Schema({

    user:{type:Schema.ObjectId,ref:'users'},
    reference:{type:String,unique:true},
    products:[
              {id:{type:Schema.ObjectId,ref:'products'},
              ammount:{type:Number,requied:true}}
            ],
    meta : {type:Object,required:true},
    created_at:{type:Date,default:Date.now},

    requested_at:{type:Date,required:true},
    dispatched:{type:Boolean,default:false}
});

salesSchema.plugin(deepPopulate,{
  whitelist:[
    'info.product',
    'info.product.kind',
    'info.product.kind.attributes',
    'info.product.brand',
    'info.product.tax',
  ],
  populate:{
    'info.product':{
      select:['name','reference','price','priceWholesale',
      'ammount','discountGeneral','discountWholesale',
      'minForWholesale','created_at','kind','brand','tax']
    },
    'info.product.kind':{
      select:['attributes','discount']
    },
    'info.product.kind.attributes':{
      select:['discount']
    },
    'info.product.brand':{
      select:['discount']
    },
    'info.product.tax':{
      select:['value']
    },
  }
});
// se almacena los nuevos datos en una hash
function nestedUpdateInventory(index,arrayData){
    if(arrayData[index]==undefined){
      return;
    }
    arrayData[index].save(function(err){
        if(err){
          errorHandler.handle(err);
          return;
        }
        nestedUpdateInventory(index+1,arrayData);
    });
}
// revisar una manera mas segura de hacer el aumento del inventario
salesSchema.pre('save',function(next){
// Esta funcion elimina el registro en la tabla de quotations, y actualiza el inventario,
// antes de crear el nuevo registro de ventas

  var prevData = this;

  quotations.findOneAndRemove({reference:this.reference},function(err){
      if(err){
        errorHandler.handle(err);
        return;
      }
      var hashObjects = {};
      var arrayData = [];
      prevData.products.forEach(function(element){
          hashObjects[element.id] = element.ammount;
          arrayData.push(element.id);
      });

      products.find({_id:{$in:arrayData}}).select('ammount').exec(function(err,prod){
          if(err){
              errorHandler.handle(err);
              return;
          }

          prod.forEach(function(element){// disminuir inventario
              element.ammount -= hashObjects[element._id];
          });

          nestedUpdateInventory(0,prod);
            console.log(prod);
          next();
      });
  });
});


var sales = mongoose.model('sales',salesSchema);

module.exports = sales;
