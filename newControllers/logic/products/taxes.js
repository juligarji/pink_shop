
var taxesModel = require('../../../models/models/products/taxesModel.js');
var brandsModel = require('../../../models/models/products/brandsModel.js');
var errorHandler = require('../../middleware/error/errorHandler.js');


var renderTaxesAndBrands= function(req,res,next){

    brandsModel.getAll(function(brand){
      taxesModel.getAll(function(tax){
          res.status(200).render('admin/taxesAndBrands',{brands:brand,taxes:tax});
      },function(err){
        errorHandler.mongoose(err,res);
      });
    },function(err){
      errorHandler.mongoose(err,res);
    });
}



var createTax = function(req,res,next){
    var data = req.body;
    data.value = parseFloat(data.value);

    taxesModel.create(data,function(tax){
        res.send({message:'Impuesto creado con exito',data:tax});

    },function(err){
      errorHandler.mongoose(err,res);
    });
}

var deleteTax = function(req,res,next){
    var data = req.body;
    taxesModel.removeById(data.idTax,function(){

        res.status(200).send({message:'Impuesto Removido Exitosamente'});

    },function(err){
        errorHandler.mongoose(err,res);
    });
}

module.exports = {
  renderTaxesAndBrands,
  createTax,
  deleteTax
}
