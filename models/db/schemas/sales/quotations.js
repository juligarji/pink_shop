var mongoose = require('mongoose');
var shortid = require('shortid');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Schema = mongoose.Schema;

var quotationsSchema = new Schema({
    reference:{type:String,unique:true,default:shortid.generate},
    products:[
              {id:{type:Schema.ObjectId,ref:'products'},
              ammount:{type:Number}}
            ],
    metaInfo:{type:Object,required:true},
    user:{type:Schema.ObjectId,ref:'users'},

    created_at:{type:Date,default:Date.now},
    modified_at:{type:Date,required:true}
});

var quotations = mongoose.model('quotations',quotationsSchema);

module.exports = quotations;
// PENDIENTE DE IMPLEMENTAR BIEN
// colocar fecha de vencimiento por defecto de validez
