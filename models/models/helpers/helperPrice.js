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
      var discAttr = Math.max.apply(null,values.attributes);

        tax = ((100 + values.tax)/100);


        discount =  Math.max(values.kind,values.brand,values.discountGeneral,discAttr);

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
    calTotalPrice : function(arrayData,meta){
      /*data {
        products = Array con producto - cantidad
        meta =  { objeto con datos de la compra
            promotionalCode; Codigo promocional, de una regla de descuento
            shipment ; (boolean) si incluye precio de envio, se calcula con datos de usuario

      }
    }*/


    // Colocar reglas de codigo promocional y envio
    // calculo provisional
    var outTotal;
    var price = 0,ammount=0,shipmentPrice=0;
    arrayData.forEach(function(element){
      if(element.state!='empty'){
        price = price + element.price;
        ammount = price + element.ammount;
      }
    });

      outTotal = {
        subTotalPrice : price,
        totalPrice : price + shipmentPrice,// provisional
        totalAmmount : ammount,
        discount : 0 // proviosional
      }

      return outTotal;
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
    var info = productData;

    var attributes = [];

    info.attributes.forEach(function(attr){

          attributes.push(attr.discount);
    });

    /*for(var i=0;i<info.attributes.length;i++){
      attributes.push(parseFloat(info.attributes[i].discount));
    }*/

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
  },
  sortDataTotalize : function(productData,ammount){

    var state;
    var realAmmount;
    if(productData.ammount == 0){
        state = "empty";
    };
    if(productData.ammount < ammount){
      state = "missing";
      realAmmount = ProductData.ammount;
    };
    if(productData.ammount >= ammount){
      state = "stock";
      realAmmount = ammount;
    }

    var outObj;
    if(state!="empty"){
        var sortData = helperPrice.sortDataPrice(productData,realAmmount);
          outObj = {
          sortData : sortData,
          state : state,
          ammount : realAmmount
        }
    }else{
        outObj = {
        state : state
      }
    }
    return outObj;
  }
}

module.exports = helperPrice;
