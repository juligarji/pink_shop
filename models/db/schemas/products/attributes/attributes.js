var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var attributesSchema = new Schema({

    value:{type:String,required:true},
    discount:{type:Number,default:0},
    
    created_at:{type:Date,default:Date.now},
    modified_at:{type:Date,required:true}
});

var attributes = mongoose.model('attributes',attributesSchema);

module.exports = attributes;
