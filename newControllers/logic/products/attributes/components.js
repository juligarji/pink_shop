
var attributesModel = require('../../../../models/models/products/attributes/attributesModel.js');
var componentsModel = require('../../../../models/models/products/attributes/componentsModel.js');
var kindsModel = require('../../../../models/models/products/kindsModel.js');
var errorHandler = require('../../../middleware/error/errorHandler.js');

var renderComponents = function(req,res,next){



kindsModel.getAllByOrder(true,function(kind){

    res.status(200).render('admin/components.ejs',{kind:kind});

},function(err){
  errorHandler.mongoose(err,res);
});

}
/* logica de componentes */
var createComponent = function(req,res,next){
    var data = req.body;
    if(data.isNumeric=='true'){
      data.isNumeric = true;
    }else{
      data.isNumeric = false;
    }
    var newData ={
      name : data.name,
      isNumeric : data.isNumeric,
      modified_at : Date.now()
    }


    componentsModel.create(newData,function(comp){
        kindsModel.addComponentById(data.idKind,comp._id,function(kid){
            console.log(kid,null,'\t');
            res.status(200).send({message:'Componente Creado con Exito',data:comp});
        },function(err){
          errorHandler.mongoose(err,res);
        });
    },function(err){
      errorHandler.mongoose(err,res);
    });
  //  console.log(data,null,'\t');
}

var deleteComponent = function(req,res,next){
    var data = req.body;
    console.log(data,null,'\t');

    componentsModel.getAttributesById(data.idComp,function(attr){

        if(attr.length==0){
          console.log('esta vacio');
          componentsModel.removeById(data.idComp,function(){

              res.status(200).send({message:'Componente Borrado Exitosamente'});

          },function(err){
            errorHandler.mongoose(err,res);
          });
          return;
        }

        attributesModel.deleteMultipleByIds(attr,function(){
          componentsModel.removeById(data.idComp,function(){

              res.status(200).send({message:'Componente Borrado Exitosamente'});

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


/*
var createComponent = function(req,res,next){
  var data = req.body;

  componentsModel.create(data,function(newData){
      res.status(200).send({message:'Categoria creada exitosamente',data:newData.name});
  },function(err){
    errorHandler.mongoose(err,res);
  });
}
*/

/*
var createAttribute = function(req,res,next){
  var data = req.body;
  data.discount = parseFloat(data.discount);
  data.modified_at = Date.now();

  componentsModel.create(data,function(newData){
      res.status(200).send({message:'Categoria creada exitosamente',data:newData._id});
      console.log('exito en la creacion');
  },function(err){
    console.log('error en la creacion');
    errorHandler.mongoose(err,res);
  });

}

var deleteAttribute = function(req,res,next){
  var data = req.body;

  componentsModel.remove(data.id,function(){
      res.status(200).send({message:'Categoria removida exitosamente'});
  },function(err){
    console.log('error al borrar');
      errorHandler.mongoose(err,res);
  });
}
*/
module.exports = {
  renderComponents,
  createComponent,
  deleteComponent
}
