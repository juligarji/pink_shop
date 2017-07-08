// dependiente de la forma del product model

var helperPrice = {
  calCurrentPrice : function(values){
      // calcular de misma manera impuestos
      var tax;
      var discount;
      var priceByAmmount;

      /*var outObj={
        kind: info[0].product.kind.discount,
        attributes : attributes,
        tax : info[0].product.tax.value,
        ammount :info[0].ammount,
        price : info[0].product.price,
        priceWholesale : info[0].product.priceWholesale,
        minForWholesale:info[0].product.minForWholesale,
        discountWholesale:info[0].product.discountWholesale,
        discountGeneral:info[0].product.discountGeneral

      }*/
      var discAttr = Math.max(values.attributes);


        tax = ((100 + values.tax)/100);


        discount =  Math.max(values.kind,values.brand,values.discountGeneral,parseFloat(discAttr));

        discount = ((100 - discount)/100);

              if(values.ammount < values.minForWholesale){// precio al por menor
                  priceByAmmount = ((values.price * values.ammount)*discount);
              }else{
                    discount = Math.max(discount,values.discountWholesale);
                    priceByAmmount = ((values.priceWholesale * values.ammount)*discount);
              }
              priceByAmmount = (priceByAmmount * tax);

              return priceByAmmount;
    },

  sortDataSale : function(saleData){
      var info = saleData;

      var attributes = [];

      for(var i=0;i<info.product.kind.attributes.length;i++){
        attributes.push(parseFloat(info.product.kind.attributes[i].discount));
      }
      if(attributes==[]){
        attributes.push(0);
      }

      //for(var i=0;i<max;i++){
      var outObj={
        kind: info.product.kind.discount,
        attributes : attributes,
        tax : info.product.tax.value,
        brand : info.product.brand.discount,
        ammount :info.ammount,
        price : info.product.price,
        priceWholesale : info.product.priceWholesale,
        minForWholesale:info.product.minForWholesale,
        discountWholesale:info.product.discountWholesale,
        discountGeneral:info.product.discountGeneral

      }
      return outObj;
  },
  sortDataPrice : function(productData,ammount){
    var info = saleData;

    var attributes = [];

    for(var i=0;i<info.kind.attributes.length;i++){
      attributes.push(parseFloat(info.kind.attributes[i].discount));
    }
    if(attributes==[]){
      attributes.push(0);
    }

    //for(var i=0;i<max;i++){
    var outObj={
      kind: info.kind.discount,
      attributes : attributes,
      tax : info.tax.value,
      brand : info.brand.discount,
      ammount:ammount,
      price : info.price,
      priceWholesale : info.priceWholesale,
      minForWholesale:info.minForWholesale,
      discountWholesale:info.discountWholesale,
      discountGeneral:info.discountGeneral

    }
    return outObj;
  }
}

module.exports = helperPrice;
