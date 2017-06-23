
var CREATE_CATEGORY = '/admin/createcategory';
var DELETE_CATEGORY = '/admin/deletecategory';

$(document).ready(function(){

  $('select').material_select();
  $('.collapsible').collapsible();

  $(".button-collapse").sideNav();
  $('.slider').slider();

  $('.carousel').carousel();
  $('.carousel.carousel-slider').carousel({fullWidth: true});

  $('.modal').modal();
  Materialize.updateTextFields();

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
  };

});

// _Funciones PROPIAS

function editCategory(name){

}

function deleteCategory(name){

  var newData = {
    name:name
  }
console.log(name);
  DB.currentCall(newData,DELETE_CATEGORY,function(){
      Graphics.deleteRow(name);
  });

}

function uploadCategory(ev){

  ev.preventDefault();

  var newData = {
    kind : $("select[name='kind']").val(),
    name : $("input[name='name']").val(),
    discount : $("input[name='discount']").val(),
    description : $("textArea[name='description']").val()
  }

  console.log(newData,null,'\t');

  DB.currentCall(newData,CREATE_CATEGORY,function(data){
      Graphics.createNewRow(newData,editCategory,deleteCategory);
  });
}
