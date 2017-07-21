
$(document).ready(function(){
/*
  $('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 350,
  fitWidth: true,


});*/

$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 213,
  fitWidth: true,
  gutter: 10
  //containerStyle: null

});





$('select').material_select();



});

function failHandler(msg){
  Dialogs.failMessage(msg);
}


$('#logInForm1').on('submit',function(ev){

    Session.openSession(ev,'#logInForm1',failHandler);
});

$('#logInForm2').on('submit',function(ev){

    Session.openSession(ev,'#logInForm2',failHandler);
});
