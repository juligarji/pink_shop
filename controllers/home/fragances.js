
var fragancesModel = require('../../models/models/frangances/fragancesModel.js');

var PRODUCTS_ADDRESS = './public/assets/img/products/';
var PUBLIC_ADDRESS = 'assets/img/products/';
var errorHandler = require('../error/errorHandler.js');

// middleware para las rutas del administrador

var getFragances = function(req,res,next){
    var data = req.body;

      var ammount = parseInt(data.ammount);
      var index = parseInt(data.index);
      var recent = data.recent;

  fragancesModel.getPartial(recent,ammount,index,function(data){

      res.status(200).send({message:'Busqueda exitosa',data:data});
      console.log('busqueeda exitosa');
  });
}

var getSingleFragance = function(req,res,next){
    var data = req.body;

    fragancesModel.getByName(data.name,function(fragan){
        res.status(200).send({message:'Busqueda unitaria exitosa',data:fragan});
    });
}

var viewDetails = function(req,res,next){
  var data = req.params;

  fragancesModel.getByName(data.name,function(fragan){
      console.log(fragan);
        res.status(200).render('home/details',{message:'Exitoso',data:fragan,addressPic:PUBLIC_ADDRESS});
  });

}


var calCurrentPrice = function(ammount,data){
  var price;
  var disscount = ((100 - parseFloat(data.discount))/100);

  if(ammount < parseInt(data.minForDiscount)){

      price = ((ammount * parseFloat(data.price))*disscount);
  }else{
          price = ((ammount * data.wholesale)*disscount);
  }
  return price;
}


var getPrice = function(req,res,next){

  var data = req.body;
  var price;
  var disscount;


  fragancesModel.getByName(data.name,function(fragan){

      var ammount = parseFloat(data.ammount);
      var output = calCurrentPrice(data.ammount,fragan);
      console.log(output);
      res.status(200).send({message:'exito',data:output});
  });

}

module.exports = {
    getFragances,
    getSingleFragance,
    viewDetails,
    getPrice
}
