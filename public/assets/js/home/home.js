
$(window).ready(function(){

/* LOAD COMPONENTS */
    /*$('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({fullWidth: true});*/
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
  $(".card").hide();

  var showElements = function(){
      //alert('aparecieron');

      $('.card').eq(0).toggle(1000);
       $('.card').eq(1).toggle(1250);
       $('.card').eq(2).toggle(1500);
       $('.card').eq(3).toggle(1750);
       $('.card').eq(4).toggle(2000);
       $('.card').eq(5).toggle(2250);
       $('.card').eq(6).toggle(2500);

  };
  var options = [
   // {selector: '.class', offset: 200, callback: customCallbackFunc } },
    {selector: '#homeProducts', offset: 0, callback: function() {
      showElements();
    } },
  ];
  Materialize.scrollFire(options);

  CartGraphics.paintMarker(Cart.getLength(),'#cartAmmount');




  /* Inicializar componentes de parte grafica */
  $('#loginForm form').submit(function(event){

    Session.openSession(event,Dialogs.failMessage);
  });
  $('.modalToggleButton').on('click',function(){
      Session.toggleLogin();
  });


  $(window).resize(function(){
    if($( window ).width()>991){
      $('.carousel').carousel();
      $('.carousel.carousel-slider').carousel({fullWidth: true});
    }
  });

  $(window).scroll(function() {
    backToTop();
  });

});

/* El carrusel */
var $carousel = $('.carousel').flickity({
  imagesLoaded: true,
  //percentPosition: false,
  wrapAround: false,
  //contain: true,
  autoplay:true,
  lazyload:true

});
