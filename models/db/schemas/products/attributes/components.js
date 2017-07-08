var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var componentsSchema = new Schema({
  // cosas como tamaño, peso, denisada, temporada etc
    name:{type:String,required:true},
    attributes:[{type:Schema.ObjectId,ref:'attributes'}],
    isNumeric:{type:Boolean,default:false},// 0 si es numerico, 1 si es cadena de texto

    created_at:{type:Date,default:Date.now},
    modified_at:{type:Date,required:true}
});

var components = mongoose.model('components',componentsSchema);

module.exports = components;
