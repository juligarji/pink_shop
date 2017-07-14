

var helperFormat = {

  sortProductsToCartClient : function(arrayData){
        var outArray = [];

      arrayData.forEach(function(dataElement){

          outArray.push({
            _id : dataElement._id,
            name : dataElement.name,
            reference : dataElement.reference,
            kind : dataElement.kind.name,
            brand : dataElement.brand.name,
            ammount : dataElement.ammount,
            tax : dataElement.tax.value,
            price : dataElement.price,
            photos: dataElement.photos
          });
      });

      return outArray;
  }

}

module.exports = helperFormat;
