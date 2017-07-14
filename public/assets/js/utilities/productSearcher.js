

/* PARA UTILIZARSE ES NECESARIO DB */
// se llama desde un evento submit
// los formularios llevan especificamente un formato

var ProductSearcher = (function(){

  var failHandler = null;
  var attributesSelector = null;
  var containerForm = null;
  var PRODUCTS_QUERY = '/admin/products-query';

  return {
    init : function(container,attributes,callback,fail){
        containerForm = container;
        attributesSelector = attributes;
        failHandler = fail;

        $(container).on('submit',function(ev){
            ev.preventDefault();
            ProductSearcher.makeProductSearch(callback);
        });
    },
    makeProductSearch : function(callback){


      if(failHandler==null || containerForm==null || attributesSelector ==null){
        console.log('<error>: El objeto ProductSearcher no ha sido inicializado.');
        return;
      }

      var newData = {
        search : $(`${containerForm} input[name="search"]`).val(),
        typeSearch : $(`${containerForm} input[name="typeSearch"]:checked`).val(),
        kind : $(`${containerForm} select[name="kind"]`).val(),
        orderType : $(`${containerForm} select[name="orderType"]`).val(),
        typeSort : $(`input[name="orderSort"]:checked`).val(),
        datePicker : $(`${containerForm} input[name="datePicker"]`).val(),
        brand : $(`${containerForm} select[name="brand"]`).val(),
        limit : $(`${containerForm} input[name="limit"]`).val()
      }

      var attributesArray =[];
      console.log(newData,null,1);
      if(newData.kind!=-1){
        var max = $(attributesSelector).length;
        if(max==0){
          console.log('<error>: No se encontraron atributos |Product Searcher|');
          return;
        }
      }

      for(var i=0;i<max;i++){
        attributesArray.push($(attributesSelector).eq(i).val());
      }
      newData.attributes = attributesArray;

      DB.currentCall(newData,PRODUCTS_QUERY,function(data){
        callback(data);
      },failHandler);
    }

  }

})();
