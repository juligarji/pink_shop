var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var fragancesSchema = new Schema({

    name:{type:String,required:true,unique:true},
    size:{type:Schema.ObjectId, ref:'fragancesSize'},
    gender:{type:String,default:'Mujer'},
    fragance:{type:Schema.ObjectId, ref:'fragancesCategories'},
    group:{type:Schema.ObjectId, ref:'fragancesCollections'},
    brand:{type:Schema.ObjectId, ref:'brands'},
    disscount:{type:Number,default:0},
    ammount:{type:Number,required:true},
    price:{type:Number,required:true},// Precio por unidad

    // Descuento al por mayor de venta
    minForDisccount:{type:Number,default:6},//cantidad minima para descuento
    Wholesale:{type:Number,required:true},// precio al por mayor
     // Parte tecnica del sistema
    photos:[String],
    created_at:{type:Date,default:Date.now}
});

var fragances = mongoose.model('fragances',fragancesSchema);

module.exports = fragances;
