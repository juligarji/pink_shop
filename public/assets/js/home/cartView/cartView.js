
var GET_FRAGANCES = '/getfragances';
var GET_SINGLE_FRAGANCE = '/getfragances';
var GET_PRICE = '/getfragancesprice';
var TOTALIZATE_CART = '/totalizatecart';
var PAY_PRODUCTS = '/ventas/payproducts';

function failHandler(message){
  Dialogs.failMessage(message);
}


function totalizate(){

    Cart.getCart(function(car){
      var newData = {
        products : car,
        meta : {
            promotionalCode : null,
            shipment : false
        }
      }
      console.log('CARRO');
      console.log(car);
      if(car.length==0){
        return;
      }
      DB.currentCall(newData,TOTALIZATE_CART,function(data){


        data.data.products.forEach(function(element){
          //console.log(element);
            console.log(element);
            switch(element.state){
              case 'empty':
              Cart.deleteFromCart(element._id,function(){
                Dialogs.failMessage(`Las existencias de ${element.name} se agotaron, disculpe las molestias.`);
              });
                break;

              case 'missing':
              Cart.modifySingleAmount(element._id,element.ammount,function(){
                Dialogs.failMessage(`Del producto ${element.name} solo se tienen ${element.ammount} Und, disculpe las molestias`);
                Graphics.addElementToContainer('#productsContainer',element);
              });
                break;
              default :
                  Graphics.addElementToContainer('#productsContainer',element);
                  break;
            }
        });
        Graphics.paintTotals(data.data.meta);

      },failHandler);
    });
}
// cambiar animacion porque se ve feo
function deleteElement(id){


  Dialogs.confirmBox('Esta Seguro de elemininar ?',function(){


      Cart.deleteFromCart(id,function(){
            console.log('exitoso Borrado :' + id);
            Graphics.deleteComponent('#productsContainer',id);
            Graphics.resetContainer('#productsContainer');
            totalizate();

      });

  },function(){

  });
}

function PayElements(){
  Cart.getCart(function(car){
    var newData = {
      products : car,
      meta : {
          promotionalCode : null,
          shipment : false
      }
    }

    if(car.length==0){
      return;
    }
    DB.currentCall(newData,PAY_PRODUCTS,function(data){

      console.log(data);

      if(data.type=='graphic'){
          $('#productsContainer').append(data.data.body);
          document.getElementById('formBuy').submit();
          console.log(data.data.body);
          return;
      }


      var newData = JSON.stringify(data.data.body);
      var call =   $.ajax({
            url : data.data.address,
            type : 'POST',
            contentType: 'application/json',
            async: true,
            data: newData
      });

      call.done(function(data){
          console.log('sucess');
      });

      call.fail(function(jqXHR, textStatus, error){
          console.log('fail');
          console.log(jqXHR.responseText);
      });


    },failHandler);
  });
}
$('#payBut').on('click',function(){
    PayElements();
});
totalizate();
