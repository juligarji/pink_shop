
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
      console.log(car);
      if(car.length==0){
        return;
      }
      DB.currentCall(newData,TOTALIZATE_CART,function(data){

        data.data.products.forEach(function(element){
            if(element.state=='empty'){
              Cart.deleteFromCart(element._id,function(){
              });
            }else{
                Graphics.addElementToContainer('#productsContainer',element);
                Graphics.paintTotals(data.data.meta);
            }
        });
        console.log(data);
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
      return;
      
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
