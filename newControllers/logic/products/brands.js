
var brandsModel = require('../../../models/models/products/brandsModel.js');
var errorHandler = require('../../middleware/error/errorHandler.js');


var createBrand = function(req,res,next){
    var data = req.body;
    data.discount = parseFloat(data.discount);
    data.modified_at = Date.now();

    brandsModel.create(data,function(brand){
        res.send({message:'Marca Creada con Exito',data:brand});

    },function(err){
      errorHandler.mongoose(err,res);
    });
}
var deleteBrand = function(req,res,next){
    var data = req.body;
    brandsModel.removeById(data.idBrand,function(){

        res.status(200).send({message:'Marca Removida Exitosamente'});

    },function(err){
        errorHandler.mongoose(err,res);
    });
}

module.exports = {
  createBrand,
  deleteBrand
}
