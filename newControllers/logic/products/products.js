
var productsModel = require('../../../models/models/products/productsModel.js');
var kindsModel = require('../../../models/models/products/kindsModel.js');

var PRODUCTS_ADDRESS = './public/assets/img/products/';
var PUBLIC_ADDRESS = 'assets/img/products/';
var errorHandler = require('../../middleware/error/errorHandler.js');
var herlperPrice = require('../../../models/models/helpers/helperPrice.js');
// middleware para las rutas del administrador

var getProducts = function(req,res,next){
    var data = req.body;

      var ammount = parseInt(data.ammount);
      var index = parseInt(data.index);
      var recent = data.recent;
      var kind = data.kind;


  productsModel.getPartial(recent,ammount,index,kind,function(data){
      res.status(200).send({message:'Busqueda exitosa',data:data});
      console.log('busqueeda exitosa');
  });
}

var getSingleProduct = function(req,res,next){
    var data = req.body;

    productsModel.getByName(data.name,function(prod){
        res.status(200).send({message:'Busqueda unitaria exitosa',data:prod});
    });
}

var viewDetails = function(req,res,next){
  var data = req.params;

  if(data.name == 'test'){
    res.status(200).render('home/detailsTest');
    return;
  }
  productsModel.getByName(data.name,function(prod){

        res.status(200).render('home/details',{message:'Exitoso',data:prod,addressPic:PUBLIC_ADDRESS});
  });
}

var getPrice = function(req,res,next){

  var data = req.body;

  productsModel.getAllDataById(data.id,function(prod){

      var sortedData = helperPrice.sortDataPrice(prod,ammount);
       var price = helperPrice.calCurrentPrice(sortedData);

      res.status(200).send({message:'exito',data:price});
  });
}

var loadProductsView = function(req,res){
  var data = req.body;

  if(!res.locals.authorized){// cambiar por rutas privadas de autenticas
    kindsModel.getById(data.id,function(kind){

          //res.status(200).render(kind.associatedView);
          res.status(200).render('home/fragances');
    });

      return;
  }

  kindsModel.getById(data.id,function(kind){
        res.status(200).render('home/fragances');
  });

}


module.exports = {
    getProducts,
    getSingleProduct,
    viewDetails,
    getPrice,
    loadProductsView
}
