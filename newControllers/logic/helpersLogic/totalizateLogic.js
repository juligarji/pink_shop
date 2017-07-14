
var productsModel = require('../../../models/models/products/productsModel.js');
var quotationsModel = require('../../../models/models/sales/quotationsModel.js');
var errorHandler = require('../../middleware/error/errorHandler.js');
var helperPrice = require('../../../models/models/helpers/helperPrice.js');
var helperFormat = require('../../../models/models/helpers/helperFormat.js');

function totalizateClientCart(data,callback){
  //  data {
//      products = Array con producto - cantidad
//      meta =  { objeto con datos de la compra
//          promotionalCode; Codigo promocional, de una regla de descuento
//          shipment ; (boolean) si incluye precio de envio, se calcula con datos de usuario
//    }
//  }

  var arrayId = [];
  var outProducts = [];
  var hashProducts = {};
  data.products.forEach(function(element){
      arrayId.push(element.idProd);
      hashProducts[element.idProd] = element.ammount;
  });
  // modificar para almacenar las cotizaciones que se hagan, junto con los datos
  productsModel.populateAllDataByMultipleId(arrayId,function(prod){ // cliente, modificar la vista de este argumento
        var sortedData;
        var max = prod.length;
        var currentPrice;
        var currentAmmount;

        for(var i=0;i<max;i++){

          currentAmmount = hashProducts[prod[i]._id];

          sortedData = helperPrice.sortDataTotalize(prod[i],currentAmmount);

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
          products : helperFormat.sortProductsToCartClient(prod),
          meta : helperPrice.calTotalPrice(prod,data.meta)
        }

            callback(outProducts);
  });
}

module.exports = {
  totalizateClientCart
}
