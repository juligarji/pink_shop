
var GET_FRAGANCES = '/getproducts';
var GET_SINGLE_FRAGANCE = '/getproduct';
var IN_STOCK = '/productinstock';
var GET_PRICE = '/getproductprice';


$(window).ready(function(){



  $('.materialboxed').materialbox();
  /* Carrusel */

/* Estado inicial */

});

function failHandler(message){
  Dialogs.failMessage(message);
}

function initOptions(data){

    $("input[name='ammount']").keyPress(function(){
      console.log('boton');
    });
}

function getPrice(id){
  var newData = {
    ammount: $("input[name='ammount']").val(),
    idProd : id
  }
  if(newData.ammount>0){
    DB.currentCall(newData,GET_PRICE,function(data){
      CartGraphics.paintMarker(data.data,'#total');
    },failHandler);
  }
}
/*
function addElementToCart(name){

  var ammount = $("input[name='ammount']").val();
  Cart.addToCart(name,ammount);
  CartGraphics.paintMarker(Cart.getLength(),'#cartSize');
  Dialogs.cartMessage('#');
  //console.log(Cart.getCart(),null,'\t');
}
*/
function addElementToCart(id){
  var newData = {
    ammount: $("input[name='ammount']").val(),
    idProd : id
  }

  if(newData.ammount>0){
    DB.currentCall(newData,IN_STOCK,function(data){
      if(data.data){
        Cart.addToCart(newData.idProd,newData.ammount,function(){

              CartGraphics.paintTotalElements();

              Dialogs.sucessMessage(data.message);

              Cart.getLength(function(lon){
                if(lon!=0){
                      $('div.ammountCart a').attr('href','/carrito');
                      $('#cartIconCont a').attr('href','/carrito');
                      $('div.ammountCart').unbind('click');
                      $('#cartIconCont').unbind('click');
                }
              });
        });

      }else{
          failHandler(data.message);
      }
    },failHandler);
  }
}

function changeValueInput(plus){
  if(plus){
      $('input[name="ammount"]').val(parseInt($('input[name="ammount"]').val()) + 1);

  }else{
    if($('input[name="ammount"]').val()==0){
      return;
    }
      $('input[name="ammount"]').val($('input[name="ammount"]').val() - 1);
  }

    getPrice($('input[name="ammount"]').attr('id'));
}


/* El carrusel */
/* carga del modal paralax*/
var $carousel = $('.main-carousel').flickity({
  imagesLoaded: true,
  percentPosition: false,
  wrapAround: false,
  contain: true
});

var $imgs = $carousel.find('.carousel-cell img');
// get transform property
var docStyle = document.documentElement.style;
var transformProp = typeof docStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';
// get Flickity instance
var flkty = $carousel.data('flickity');

$carousel.on( 'scroll.flickity', function() {
  flkty.slides.forEach( function( slide, i ) {
    var img = $imgs[i];
    var x = ( slide.target + flkty.x ) * -1/3;
    img.style[ transformProp ] = 'translateX(' + x  + 'px)';
  });
});
