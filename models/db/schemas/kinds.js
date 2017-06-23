var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var kindsSchema = new Schema({

    name:{type:String,required:true,unique:true}
    
});

var kinds = mongoose.model('kinds',kindsSchema);
/*
categories.collection.dropIndexes('categories.name');
categories.collection.dropIndexes('categories.kind');
*/
module.exports = kinds;
