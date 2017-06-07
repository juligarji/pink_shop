
/*  Viejo */

$(window).ready(function(){

    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({fullWidth: true});
    setInterval(function(){
          $('.carousel.carousel-slider').carousel('next');
    },6000);

    $(".button-collapse").sideNav();
    $('.slider').slider();
    $('.parallax').parallax();
    $('.modal').modal();
    Materialize.updateTextFields();

    var $grid = $('.grid').masonry({
    // options
    itemSelector: '.grid-item'

    });

    $grid.on( 'layoutComplete', function( event, items ) {
  console.log( items.length );
});

  $(window).resize(function(){
    location.reload();
  });

});
