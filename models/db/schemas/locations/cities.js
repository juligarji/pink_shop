var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var countriesSchema = new Schema({//
  name:{type:String,required:true},
  phone_identifier:{type:Number,default:57}
});

var regionsSchema = new Schema({//
  country:countriesSchema,
  name:{type:String,required:true},
});

var citiesSchema = new Schema({// los precios son por kilo
  region:regionsSchema,
  name:{type:String,required:true},
});

var cities = mongoose.model('cities',citiesSchema);

module.exports = cities;
