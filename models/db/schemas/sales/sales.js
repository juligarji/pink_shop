var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var errorHandler = require('../../../../controllers/error/errorHandler.js');
var helperPrice = require('../../../models/helpers/helperPrice');

var Schema = mongoose.Schema;

var salesSchema = new Schema({

    user:{type:Schema.ObjectId,ref:'users'},
    info:[{type:Schema.ObjectId,ref:'salesInfo'}],
    totalPrice:{type:Number,default:0},
    created_at:{type:Date,default:Date.now},
    paid:{type:Boolean,default:false}
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
})


salesSchema.post('save',function(next){// Encriptar la contraseña ingresada

    var currentSale = this;

    sales.findOne({_id:currentSale._id}).deepPopulate('info.product info.product.brand info.product.kind info.product.kind.attributes info.product.tax').exec(function(err,data){
      if(err) throw err;

        var info = data.info;
        var price = 0;
        var sortedData;

        //sortedData = helper.sortData(info[0]);

        for(var i=0;i<info.length;i++){
              sortedData = helperPrice.sortDataSale(info[i]);
              price = (price + helperPrice.calCurrentPrice(sortedData));
        }

        sales.findOneAndUpdate({_id:currentSale._id},{ $set:{totalPrice:price}}, { new: false }, function (err,sal) {
          if(err){
            errorHandler.handle(err);
            return;
          }
          console.log('post funcion exitosa');
        });

    });

});
var sales = mongoose.model('sales',salesSchema);

module.exports = sales;
