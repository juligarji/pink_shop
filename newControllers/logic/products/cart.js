
var productsModel = require('../../../models/models/products/productsModel.js');
var errorHandler = require('../../middleware/error/errorHandler.js');
var helperPrice = require('../../../models/models/helpers/helperPrice.js');


var loadCartView = function(req,res,next){
  if(!res.locals.authorized){
    res.status(200).render('home/cartView');
    return;
  }
    res.status(200).render('home/cartView');
}

var totalizateCart = function(req,res,next){
  /*
    data {
      products = Array con producto - cantidad
      meta =  { objeto con datos de la compra
          promotionalCode; Codigo promocional, de una regla de descuento
          shipment ; (boolean) si incluye precio de envio, se calcula con datos de usuario
    }
  }
  */
  var data = req.body;
  var arrayId = [];
  var outProducts = [];
  data.products.forEach(function(element){
      arrayId.push(element.idProd);
  });
  // modificar para almacenar las cotizaciones que se hagan, junto con los datos
  productsModel.populateAllDataByMultipleId(arrayId,function(prod){ // cliente, modificar la vista de este argumento
        var sortedData;
        var max = prod.length;
        var currentPrice;

        for(var i=0;i<max;i++){
          sortedData = helperPrice.sortDataTotalize(prod[i],data.products[i].ammount);

          if(sortedData.state!='empty'){
            prod[i].price = helperPrice.calCurrentPrice(sortedData.sortData);
            prod[i].ammount = sortedData.ammount;
          }else{
            prod[i].price = -1;
            prod[i].ammount = -1;
          }
          prod[i].state = sortedData.state;
        }

        outProducts = {
          products : prod,
          meta : helperPrice.calTotalPrice(prod,data.meta)
        }

        res.status(200).send({message:'Productos Totalizados con exito',data:outProducts});

/*
      var sortedData = helperPrice.sortDataPrice(prod,parseFloat(data.ammount));
       var price = helperPrice.calCurrentPrice(sortedData);

      res.status(200).send({message:'exito',data:price});
      */
  });

}

module.exports = {
  loadCartView,
  totalizateCart
}
