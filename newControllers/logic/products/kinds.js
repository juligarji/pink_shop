
var kindsModel = require('../../../models/models/products/kindsModel.js');
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

  kindsModel.remove(data.id,function(){

      res.status(200).send({message:'Categoria removida exitosamente'});
  },function(err){
    console.log('error al borrar');
      errorHandler.mongoose(err,res);
  });
}

module.exports = {
  renderKinds,
  createKind,
  deleteKind
}
