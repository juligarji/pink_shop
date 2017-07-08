var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var locationsSchema = new Schema({// los precios son por kilo
  cities:{type:Schema.ObjectId,ref:'cities'},
  address:{type:String,required:true},
  coordinates:{type:String}
});

locationsSchema.pre('save',function(next){// Encriptar la contraseña ingresada

    console.log(this);

});

var locations = mongoose.model('locations',locationsSchema);

module.exports = locations;
