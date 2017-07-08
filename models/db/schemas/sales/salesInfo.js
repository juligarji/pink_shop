var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var salesInfoSchema = new Schema({
  product:{type:Schema.ObjectId,ref:'products'},
  ammount:{type:Number,required:true}
});

salesInfoSchema.pre('save',function(next){// Encriptar la contraseña ingresada

    console.log(this);

});

var salesInfo = mongoose.model('salesInfo',salesInfoSchema);

module.exports = salesInfo;
