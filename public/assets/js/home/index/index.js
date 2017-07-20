

$(document).ready(function(){

  $('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 350,
  fitWidth: true,

});
/*
$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 213,
  fitWidth: true,
  gutter: 10
  //containerStyle: null
});*/

$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true,
  fitWidth: true
});



});

var initWidth = $(window).width();

$(window).resize(function(event){
  if($(window).width()!= initWidth){
      initWidth = $(window).width();
    //  alert('si');
      $('.grid').masonry('layout');
  }

});

$( window ).keypress(function( event ) {

  if ( event.which == 13 ) {
     alert($(window).width());
  }
});
