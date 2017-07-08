// penmdiente de implementar
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var accountingSchema = new Schema({
  sale:{type:Schema.ObjectId,ref:'sales'},
  ammount:{type:Number,required:true},
  paid_at:{type:Number,required:true}
});
/*
accountingSchema.pre('save',function(next){// Encriptar la contraseña ingresada

    console.log(this);

});*/

var accounting = mongoose.model('accounting',accountingSchema);

module.exports = accounting;
