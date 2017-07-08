var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;

var kindsSchema = new Schema({

    name:{type:String,required:true,unique:true},
    components:[{type:Schema.ObjectId,ref:'components'}],
    associatedView:{type:String,default:'home/fragances'},
    discount:{type:Number,default:0},
    description:{type:String,default:'Nueva categoria'},

    created_at:{type:Date,default:Date.now},
    modified_at:{type:Date,required:true}
});

kindsSchema.plugin(deepPopulate,{
  whitelist:[
    'components.attributes',
  ]

/*  populate:{

    'product.kind':{
      select:['attributes','discount']
    },
    'product.kind.attributes':{
      select:['discount']
    },
    'product.brand':{
      select:['discount']
    },
    'product.tax':{
      select:['value']
    },
  }*/
})


var kinds = mongoose.model('kinds',kindsSchema);

module.exports = kinds;
