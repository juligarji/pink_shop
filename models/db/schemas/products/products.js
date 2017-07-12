var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;

var productsSchema = new Schema({

    name:{type:String,required:true},
    reference:{type:String,required:true,unique:true},
    kind:{type:Schema.ObjectId, ref:'kinds',required:true},
    attributes:[{type:Schema.ObjectId, ref:'attributes'}],
    brand:{type:Schema.ObjectId, ref:'brands',required:true},
    ammount:{type:Number,required:true},
    tax:{type:Schema.ObjectId, ref:'taxes',required:true},
    realPrice:{type:Number,default:0,select:false},
    price:{type:Number,required:true},
    priceWholesale:{type:Number,required:true},
    description:{type:String,default:"Increible Producto"},
    photos:[String],

    discountGeneral:{type:Number,default:0},
    discountWholesale:{type:Number,default:0},
    minForWholesale:{type:Number,default:6},

    created_at:{type:Date,default:Date.now},
    modified_at:{type:Date,required:true}

});

productsSchema.plugin(deepPopulate,{
  whitelist:[
    'kind',
    'kind.components',
    'kind.components.attributes',
    'attributes',
    'brand',
    'tax',
  ],
  populate:{

    'kind':{
      select:['name','components','discount']
    },
    'kind.components':{
      select:['name','attributes']
    },
    'attributes':{
      select:['value','discount']
    },
    'kind.components.attributes':{
      select:['value','discount']
    },
    'brand':{
      select:['name','discount','description']
    },
    'tax':{
      select:['name','value']
    },

  }
})

var products = mongoose.model('products',productsSchema);

module.exports = products;
