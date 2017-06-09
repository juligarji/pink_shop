var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var fragancesCategoriesSc = new Schema({
    name:{type:String,required:true}
});

var fragancesCategories = mongoose.model('fragancesCategories',fragancesCategoriesSc);

module.exports = fragancesCategories;
