
var kindsModel = require('../../../models/models/products/kindsModel.js');
var attributesModel = require('../../../models/models/products/attributes/attributesModel.js');
var componentsModel = require('../../../models/models/products/attributes/componentsModel.js');

var errorHandler = require('../../middleware/error/errorHandler.js');

var renderKinds = function(req,res,next){


  kindsModel.getAllByOrder(true,function(data){
      res.status(200).render('admin/kinds.ejs',{list:data});
  });
}

var createKind = function(req,res,next){
  var data = req.body;

  kindsModel.create(data,function(newData){
      res.status(200).send({message:'Categoria creada exitosamente',data:newData.name});
  });
}

var createKind = function(req,res,next){
  var data = req.body;
  data.discount = parseFloat(data.discount);
  data.modified_at = Date.now();

  kindsModel.create(data,function(newData){
      res.status(200).send({message:'Categoria creada exitosamente',data:newData._id});
      console.log('exito en la creacion');
  },function(err){
    console.log('error en la creacion');
    errorHandler.mongoose(err,res);
  });

}

var deleteKind = function(req,res,next){
    var data = req.body;

    kindsModel.getByIdPopulated(data.id,function(kind){
      var arrayAttributes = [];
      var arrayComponents = [];

      kind.components.forEach(function(componentElement){
          arrayComponents.push(componentElement._id);
            componentElement.attributes.forEach(function(attributeElement){
                arrayAttributes.push(attributeElement._id);
            });
      });

      attributesModel.deleteMultipleByIds(arrayAttributes,function(){
          componentsModel.deleteMultipleByIds(arrayComponents,function(){

              kindsModel.removeById(data.id,function(){
                  res.status(200).send({message:'Categoria removida exitosamente'});
              },function(err){
                    errorHanlder.mongoose(err,res);
              });

          },function(err){
              errorHandler.mongoose(err,res);
          });
      },function(err){
        errorHandler.mongoose(err,res);
      });

    },function(err){
      errorHandler.mongoose(err,res);
    });

}

module.exports = {
  renderKinds,
  createKind,
  deleteKind
}
