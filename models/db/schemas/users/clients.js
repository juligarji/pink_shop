var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var clientsSchema = new Schema({// los precios son por kilo
  user:{type:Schema.ObjectId,ref:'users'},
  name:{type:String,required:true},
  lastname:{type:String,required:true},
  phoneNumber:{type:String,required:true},
  identification:{type:Number},
  location:{type:Schema.ObjectId,ref:'locations'}

});

var clients = mongoose.model('clients',clientsSchema);

module.exports = clients;
