
var Cart = {
    getCart : function(){
        //cambiar por base de datos en local
      if(sessionStorage.cart==undefined || sessionStorage.cart==""){
        return [];
      }

        var buffer = JSON.parse(sessionStorage.cart);
        var outBuffer = [];

        for(var i=0;i<buffer.length;i++){
          if(buffer[i]!={}){
            outBuffer.push(buffer[i]);
          }
        }

        return outBuffer;
      //retornar Array con las direcciones
      },

      addToCart : function(name,ammount){
        // cambiar por base de datos
        var cartArray;
        if(sessionStorage.cart==undefined || sessionStorage.cart==""){
          cartArray =  [];
        }else{
              cartArray = JSON.parse(sessionStorage.cart);
        }

        var exis = -1;

        for(var i=0;i<cartArray.length;i++){
            if(cartArray[i].name == name){
              exis = i;
              break;
            }
        }

        if(exis!=-1){
          cartArray[exis].ammount = ammount;

          cartArray[exis].date = Date.now();
        }else{
          var obj = {
            name: name,
            ammount: ammount,
            date: Date.now()
          }
          cartArray.push(obj);
        }
        sessionStorage.cart = JSON.stringify(cartArray);
      },
      deleteFromCart : function(name){

          var cartArray = Cart.getCart();

          var max = cartArray.length;

          for(var i=0;i<max;i++){
            if(cartArray[i].name==name){
              cartArray.splice(i,1);
              break;
            }
          }
          sessionStorage.cart =  JSON.stringify(cartArray);
      },
      getLength : function(){
        return Cart.getCart().length;
      },
      deleteAllCart : function(){
        sessionStorage.cart = undefined;
      }


}
