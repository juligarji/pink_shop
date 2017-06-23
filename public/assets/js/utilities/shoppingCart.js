
var ShoppingCart = {
  getLocalCart : function(){
      //cambiar por base de datos en local
    if(sessionStorage.cart==undefined || sessionStorage.cart==""){
      return [];
    }

      var buffer = sessionStorage.cart.split(',');
      var outBuffer = [];

      for(var i=0;i<buffer.length;i++){
        if(buffer[i]!=""){
            outBuffer.push(buffer[i]);
        }
      }

      return outBuffer;
    //retornar Array con las direcciones
    },
  addLocalCart : function(newName,ammount){
    //cambiar por base de datos en local
    var arrayPath;

    if(sessionStorage.cart ==undefined){
        arrayPath = [];
    }else{
          arrayPath =sessionStorage.cart.split(',');
    }

    arrayPath.push({
      name:newName,
      ammount
    });
    sessionStorage.cart = arrayPath.join();
    //guardar array en la memoria
  },

  removeLocalCart : function(path){
      // cambiar por base de datos en local
      var buffer = sessionStorage.cart.split(',');

      buffer.splice(buffer.indexOf(path),1);
      sessionStorage.cart = buffer.join();
  },

  // Funciones de memoria preliminar de edicion
      // cambiar por base de datos

}
