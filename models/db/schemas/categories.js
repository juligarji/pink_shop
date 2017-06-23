var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categoriesSchema = new Schema({

    name:{type:String,required:true,unique:true},
    //kind:{type:Schema.ObjectId, ref:'kinds',required:true},
    kind:{type:String,required:true},
    disscount:{type:Number,default:0},
    description:{type:String,default:''},
    created_at:{type:Date,default:Date.now()},
    edited_at:{type:Date}

});

var categories = mongoose.model('categories',categoriesSchema);
/*
categories.collection.dropIndexes('categories.name');
categories.collection.dropIndexes('categories.kind');
*/
module.exports = categories;
