var GRAPHIC_FLAG = true;

$(document).ready(function(){

/*
$('.grid').masonry({
itemSelector: '.grid-item',
columnWidth: 350,
fitWidth: true,


});*/

$('.grid').masonry({
itemSelector: '.grid-item',
columnWidth: 240,
fitWidth: true,
gutter: 10
//containerStyle: null
});

$('.collapsible').collapsible();
$('select').material_select();

$('.modal').modal();

});


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
