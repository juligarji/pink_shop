var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productsSchema = new Schema({

    name:{type:String,required:true,unique:true},
    fragance:{type:Schema.ObjectId, ref:'categories',required:false},
    gender:{type:String,default:'Mujer'},
    fragance:{type:Schema.ObjectId, ref:'categories',required:false},
    group:{type:Schema.ObjectId, ref:'categories',required:false},
    brand:{type:Schema.ObjectId, ref:'categories',required:false},
    discount:{type:Number,default:0},
    ammount:{type:Number,required:true},
    price:{type:Number,required:true},// Precio por unidad
    description:{type:String,default:"Increible Producto"},
    // Descuento al por mayor de venta
    minForDiscount:{type:Number,default:6},//cantidad minima para descuento
    wholesale:{type:Number,required:true},// precio al por mayor
     // Parte tecnica del sistema
    photos:[String],
    created_at:{type:Date,default:Date.now},
    modified_at:{type:Date,required:false}
});

var products = mongoose.model('products',productsSchema);

module.exports = products;
