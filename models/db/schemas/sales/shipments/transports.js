var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var transportSchema = new Schema({// los precios son por kilo

  name:{type:String,required:true,unique:true},

  price_local:{type:Number,required:true},
  price_region:{type:Number,required:true},
  price_country:{type:Number,required:true},

  created_at:{type:Date,default:Date.now}
});

transportSchema.pre('save',function(next){// Encriptar la contraseña ingresada

    console.log(this);

});

var transport = mongoose.model('transport',transportSchema);

module.exports = transport;
