
var GET_FRAGANCES = '/getfragances';
var GET_SINGLE_FRAGANCE = '/getfragances';
var GET_PRICE = '/getfragancesprice';

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

/* Estado inicial */
CartGraphics.paintMarker(Cart.getLength(),'#cartSize');
});

function errorCall(message){
  console.log(message);
}

function initOptions(data){

    $("input[name='ammount']").keyPress(function(){
      console.log('boton');
    })
}

function getPrice(name){
  var data = {
    ammount: $("input[name='ammount']").val(),
    name:name
  }

  DB.currentCall(data,GET_PRICE,true,function(data){
      $('#total').text(data);
  },errorCall);
}

function addElementToCart(name){
  var ammount = $("input[name='ammount']").val();
  Cart.addToCart(name,ammount);
  CartGraphics.paintMarker(Cart.getLength(),'#cartSize');
  //console.log(Cart.getCart(),null,'\t');

}