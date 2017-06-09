var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var fragancesSizesSc = new Schema({
    name:{type:String,required:true}
});

var fragancesSizes = mongoose.model('fragancesSizes',fragancesSizesSc);

module.exports = fragancesSizes;
