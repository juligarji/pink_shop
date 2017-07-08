
var attributesModel = require('../../../../models/models/products/attributes/attributesModel.js');
var componentsModel = require('../../../../models/models/products/attributes/componentsModel.js');
var kindsModel = require('../../../../models/models/products/kindsModel.js');
var errorHandler = require('../../../middleware/error/errorHandler.js');

var renderAttributes = function(req,res,next){



kindsModel.getAllPopulated(function(kind){

    res.status(200).render('admin/attributes.ejs',{kind:kind});

},function(err){
  errorHandler.mongoose(err,res);
});

}
/* logica de componentes */


var createAttribute = function(req,res,next){
  var data = req.body;
  data.discount = parseFloat(data.discount);
  data.modified_at = Date.now();


  var newData ={
    value:data.value,
    discount:parseFloat(data.discount),
    modified_at:Date.now()
  }


  attributesModel.create(newData,function(attr){
    componentsModel.addAttributeById(data.idComp,attr._id,function(comp){
        res.status(200).send({message:'Atributo creado Exitosamente',data:attr});

    },function(err){
      errorHandler.mongoose(err,res);
    });

  },function(err){
    console.log('error en la creacion');
    errorHandler.mongoose(err,res);
  });

}

var deleteAttribute = function(req,res,next){
  var data = req.body;

  componentsModel.removeAttributeById(data.idComp,data.idAttr,function(comp){
    attributesModel.removeById(data.idAttr,function(){

        res.status(200).send({message:'Atributo Removido Exitosamente'});

    },function(err){
        errorHandler.mongoose(err,res);
    });

  },function(err){
      errorHandler.mongoose(err,res);
  });
}

module.exports = {
  renderAttributes,
  createAttribute,
  deleteAttribute
}
