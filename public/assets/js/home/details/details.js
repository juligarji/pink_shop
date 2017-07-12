
var GET_FRAGANCES = '/getproducts';
var GET_SINGLE_FRAGANCE = '/getproduct';
var IN_STOCK = '/productinstock';
var GET_PRICE = '/getproductprice';

$(window).ready(function(){

/* LOAD COMPONENTS */
    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({fullWidth: true});
    setInterval(function(){
          $('.carousel.carousel-slider').carousel('next');
    },6000);
    $('select').material_select();

    $(".button-collapse").sideNav();
    $('.slider').slider();
    $('.parallax').parallax();
    $('.modal').modal();
    $('.tooltipped').tooltip({delay: 50});
    Materialize.updateTextFields();

    var $grid = $('.grid').masonry({
      itemSelector: '.grid-item'
    });

    $('.dropdown-button').dropdown({
       inDuration: 300,
       outDuration: 225,
       constrainWidth: false, // Does not change width of dropdown to that of the activator
       hover: false, // Activate on hover
       gutter: 0, // Spacing from edge
       belowOrigin: true, // Displays dropdown below the button
       alignment: 'left', // Displays dropdown with edge aligned to the left of button
       stopPropagation: false // Stops event propagation
   });

   paceOptions = {
        ajax: true, // Monitors all ajax requests on the page
        document: false, // Checks for the existance of specific elements on the page
        eventLag: false, // Checks the document readyState
        elements: {
            selectors: ['main'] // Checks for event loop lag signaling that javascript is being executed
        }
  };

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
    })
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

          Cart.getLength(function(leng){

              CartGraphics.paintMarker(leng,'#cartAmmount');
              Dialogs.sucessMessage(data.message);
          });

        })

      }else{
          failHandler(data.message);
      }
    },failHandler);
  }
}



/* El carrusel */
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
