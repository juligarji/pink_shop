var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var brandsSc = new Schema({
    name:{type:String,required:true}
});

var brands = mongoose.model('brands',brandsSc);

module.exports = brands;
