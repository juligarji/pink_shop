var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var taxesSchema = new Schema({

    name:{type:String,required:true,unique:true},
    value:{type:Number,required:true}
    
});

var taxes = mongoose.model('taxes',taxesSchema);


module.exports = taxes;
