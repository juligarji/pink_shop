
var categoriesModel = require('../../models/models/categoriesModel.js');
var kindsModel = require('../../models/models/kindsModel.js');

var renderCategories = function(req,res,next){
  categoriesModel.getAllByOrder(true,function(data){
      res.status(200).render('admin/categories.ejs',{list:data});
  });
}

var createCategory = function(req,res,next){
  var data = req.body;

  categoriesModel.create(data,function(newData){
      res.status(200).send({message:'Categoria creada exitosamente',data:newData.name});
  });
}

var createKind = function(){
  var data = req.body;
  kindsModel.create(data,function(newData){
      res.status(200).send({message:'Categoria creada exitosamente',data:data.name});
  })

}

var deleteCategory = function(req,res,next){
  var data = req.body;

  categoriesModel.remove(data.name,function(){
      res.status(200).send({message:'Categoria removida exitosamente'});
  });
}

module.exports = {
  renderCategories,
  createCategory,
  createKind,
  deleteCategory
}
