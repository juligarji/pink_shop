
var GET_FRAGANCES = '/getfragances';
var VIEW_DETAILS = '/detalles/';

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


  if($('#productContainer').children().length>=6){
    ScrollIssues.initScrollClient('#productContainer',GET_FRAGANCES,Graphics.loadToContainer);

    var distanceBackToTop = $('#menuContainer').offset().top;

    $(window).scroll(function() {
      backToTop();//obligatorio

      if ( $(this).scrollTop() >= distanceBackToTop ) {
          console.log('is in top');
          $('#menuContainer').css('top',0);
          $('#menuContainer').css('position','fixed');
          $('#productContainer').addClass('push-l2');
      } else {
          console.log('is not in top');
          $('#menuContainer').css('position','relative');
          $('#menuContainer').css('top','auto');
          $('#productContainer').removeClass('push-l2');
      }
    });
  }
  
});




//$('div.product').css('display','none');
