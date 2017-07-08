var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var shipmentsSchema = new Schema({// los precios son por kilo

  sale:{type:Schema.ObjectId,ref:'sales'},
  transport:{type:Schema.ObjectId,ref:'transports'},
  location:{type:Schema.ObjectId,ref:'location'},
  shipping_price:{type:Number,default:0},// se calcula con clausula post
  sent:{type:Boolean,default:false}

});
/*
shipmentsSchema.pre('save',function(next){// Encriptar la contraseña ingresada

    console.log(this);

});*/

var shipments = mongoose.model('shipments',shipmentsSchema);

module.exports = shipments;
