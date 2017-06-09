var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var fragancesCollectionsSc = new Schema({
    name:{type:String,required:true}
});

var fragancesCollections = mongoose.model('fragancesCollections',fragancesCollectionsSc);

module.exports = fragancesCollections;
