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
