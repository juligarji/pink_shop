

$(document).ready(function(){

  $('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 350,
  fitWidth: true,


});

$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 213,
  fitWidth: true,
  gutter: 10
  //containerStyle: null
});

});
