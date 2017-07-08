var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var brandsSchema = new Schema({

    name:{type:String,required:true,unique:true},
    discount:{type:Number,default:0},

    created_at:{type:Date,default:Date.now},
    modified_at:{type:Date,required:true}
});

var brands = mongoose.model('brands',brandsSchema);


module.exports = brands;
