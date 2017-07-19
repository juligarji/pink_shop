
var productsModel = require('../../../models/models/products/productsModel.js');
var kindsModel = require('../../../models/models/products/kindsModel.js');
var brandsModel = require('../../../models/models/products/brandsModel.js');
var taxesModel = require('../../../models/models/products/taxesModel.js');

var PRODUCTS_ADDRESS = './public/assets/img/products/';
var PUBLIC_ADDRESS = 'assets/img/products/';
var errorHandler = require('../../middleware/error/errorHandler.js');
var helperPrice = require('../../../models/models/helpers/helperPrice.js');
// middleware para las rutas del administrador
var images = require('../../middleware/images/images.js');

var getProductsQueried = function(req,res,next){
    var data = req.body;

      var ammount = parseInt(data.ammount);
      var index = parseInt(data.index);
      var recent = data.recent;
      var kind = data.kind;
      var query = data.query;

      if(query!=undefined){
        if(query.attributes==undefined){
          query.attributes = [];
        }
      }
      console.log(data,null,'\t');


  productsModel.getPartialQueried(recent,ammount,index,kind,query,function(data){

      res.status(200).send({message:'Busqueda exitosa',data:data});

  },function(err){
    errorHandler.mongoose(err,res);
  });
}

var getSingleProduct = function(req,res,next){
    var data = req.body;

    productsModel.getById(data.idProd,function(prod){
        res.status(200).send({message:'Busqueda unitaria exitosa',data:prod});
    });
}

var viewDetails = function(req,res,next){
  var data = req.params;

  if(data.name == 'test'){
    res.status(200).render('home/detailsTest');
    return;
  }

  productsModel.getById(data.idProd,function(prod){

        res.status(200).render('home/details',{message:'Exitoso',product:prod,addressPic:PUBLIC_ADDRESS});
  });
}

var getPrice = function(req,res,next){

  var data = req.body;

  productsModel.populateAllDataById(data.idProd,function(prod){

      var sortedData = helperPrice.sortDataPrice(prod,parseFloat(data.ammount));
       var price = helperPrice.calCurrentPrice(sortedData);

      res.status(200).send({message:'exito',data:price});
  });
}
var isInStock = function(req,res,next){
    var data = req.body;

    productsModel.getById(data.idProd,function(prod){
        if(prod.ammount ==0){
          res.status(200).send({message:'Producto Agotado',data:false});
          return;
        }
        if(prod.ammount < data.ammount ){
            res.status(200).send({message:'No Se Tiene la cantidad Requerida',data:false});
            return;
        }
          res.status(200).send({message:'Producto en Stock',data:true});
          return;
    },function(err){
      errorHandler.mongoose(err,res);
    });
}

// GET
var loadProductsView = function(req,res){
  var data = req.params;

  kindsModel.getByNamePopulated(data.type,function(data){

    if(data==null||data==undefined){
        res.status(404).render('errors/404');
        return;
    }

    console.log(data);
    res.status(200).render('home/products/products',{kind:data._id,components:data.components});
  });
}

/* XXXXXXXXXXXXXXXXXXXXXXXXXXX ADMINISTRADOR XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
var renderProducts = function(req,res,next){
  //cambiar al definir condiciones
  kindsModel.getAll(function(kid){
    productsModel.getAllPopulated(function(prod){
      brandsModel.getAll(function(brand){
        taxesModel.getAll(function(tax){


          res.status(200).render('admin/products',{products:prod,kinds:kid,brands:brand,taxes:tax});


        },function(err){
          errorHandler.mongoose(err,res);
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


var createProduct = function(req,res,next){//POST

  var data = req.body;

  var newData = {
      name : data.name,
      reference: data.reference,
      kind:data.kind,
      attributes:data.attributes,
      brand:data.brand,
      ammount:data.ammount,
      tax:data.tax,
      realPrice:data.realPrice,
      price:data.price,
      priceWholesale:data.priceWholesale,
      description:data.description,
      photos:data.photos,

      discountGeneral:data.discountGeneral,
      discountWholesale:data.discountWholesale,
      minForWholesale:data.minForWholesale,

      modified_at : Date.now()
  }


  productsModel.create(newData,function(newProduct){

    res.status(200).send({message:'Producto creado con exito',data:newProduct});
  },function(err){
      errorHandler.mongoose(err,res);
  });
  // Implementar una verificacion desde el servidor
}

var getEditProduct = function(req,res,next){
  var data = req.body;

  productsModel.populateAllDataById(data.idProd,function(prod){
    res.status(200).send({message:'Producto hallado con exito',data:prod});
  },function(err){
    errorHandler.mongoose(err,res);
  });
}
var editProduct = function(req,res,next){
  var data = req.body;

  productsModel.updateAllById(data.meta,data.data,function(prod){
      res.status(200).send({message:'Producto actualizado exitosamente',data:prod});
  },function(err){
    errornHandler.mongoose(err,res);
  });
}


var deleteProduct = function(req,res,next){
    var data = req.body;

    productsModel.getById(data.idProd,function(prod){

        images.deleteArrayOfPictures(prod.photos[0],prod.photos);
        productsModel.removeById(prod._id,function(){

            res.status(200).send({message:'Borrado exitoso'});
        });
    },function(err){
      errorHandler.mongoose(err,res);
    });
}

var deleteMultipleProducts = function(req,res,next){
    var data = req.body;

    productsModel.getMultipleById(data.arrayIdProd,function(prod){
        var arrayPhotos = [];
        prod.forEach(function(element){
          arrayPhotos = arrayPhotos.concat(element.photos);
        });

        images.deleteArrayOfPictures(arrayPhotos[0],arrayPhotos);
        productsModel.removeMultipleById(data.arrayIdProd,function(){

            res.status(200).send({message:'Borrado exitoso'});
        });
    },function(err){
      errorHandler.mongoose(err,res);
    });
}

var getAttributes = function(req,res,next){
  var data = req.body;

  kindsModel.getByIdPopulated(data.idKind,function(kind){
      res.status(200).send({message:'Obtencion de atributos exitosa',data:kind});
  },function(err){
    errorHandler.mongoose(err,res);
  });

}

var editPhotosProduct = function(req,res,next){
    var data = req.body;

    productsModel.updatePicturesById(data.idProd,data.photos,function(prod){
        res.status(200).send({message:'Edicion de Imagenes exitosa'});
    });
}


var queryAdmin = function(req,res,next){
  var data = req.body;

  if(data.datePicker != ''){
      data.lowerDate = new Date(data.datePicker);
      data.upperDate = new Date(data.datePicker);
      data.upperDate.addDays(1);
  }

  data.exactTypeSearch = true;

  productsModel.getQuerySearch(data,function(arrayObj){
      res.status(200).send({message:'Busqueda Exitosa',data:arrayObj});

  },function(err){
    errorHandler.mongoose(err,res);
  });

  /*formato
  { search: '',
  typeSearch: 'name',
  kind: '-1',
  orderType: 'created_at',
  typeSort: 'lower',
  datePicker: '',
  brand: '-1',
  attributes: [],
  exactTypeSearch: true }

  */
}

module.exports = {
    client : {
      getProductsQueried,
      getSingleProduct,
      viewDetails,
      getPrice,
      loadProductsView,
      editPhotosProduct,
      isInStock
    },
    admin : {
      createProduct,
      editProduct,
      deleteProduct,
      deleteMultipleProducts,
      getEditProduct,
      renderProducts,
      editPhotosProduct,
      getAttributes,
      queryAdmin
    }
}
