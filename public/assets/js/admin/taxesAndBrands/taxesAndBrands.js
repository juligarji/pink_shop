
var CREATE_TAX = '/admin/createtax';
var DELETE_TAX = '/admin/deletetax';

var CREATE_BRAND = '/admin/createbrand';
var DELETE_BRAND = '/admin/deletebrand';

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
// sobre escribir en cada tipo de dato
function failHandler(msg){
  Dialogs.failMessage(msg);
}

function createBrand(ev){
  ev.preventDefault();
  var newData = {
    name:$('#formBrands input[name="name"]').val(),
    discount:$('#formBrands input[name="discount"]').val(),
    description:$('#formBrands textArea[name="description"]').val(),
  }

  Protection.ensureFill(newData,function(){

      DB.currentCall(newData,CREATE_BRAND,function(data){
          console.log(data);
          Dialogs.sucessMessage(data.message);
          Graphics.createNewBrand(data.data);
      },failHandler);

  },failHandler);
}

function deleteBrand(id){

  var newData = {
    idBrand:id
  }

  Dialogs.confirmBox('Esta seguro de eliminar ?',function(){
    DB.currentCall(newData,DELETE_BRAND,function(){
        Graphics.deleteBrand(id);
    },failHandler);
  },
  function(){

  });
}

function createTax(ev){
  ev.preventDefault();
  var newData = {
    name:$('#formTaxes input[name="name"]').val(),
    value:$('#formTaxes input[name="value"]').val()
  }

  Protection.ensureFill(newData,function(){

      DB.currentCall(newData,CREATE_TAX,function(data){
          Dialogs.sucessMessage(data.message);
          Graphics.createNewTax(data.data);
      },failHandler);

  },failHandler);

}

function deleteTax(id){

  var newData = {
    idTax:id
  }

  Dialogs.confirmBox('Esta seguro de eliminar ?',function(){
    DB.currentCall(newData,DELETE_TAX,function(){
        Graphics.deleteTax(id);
    },failHandler);
  },
  function(){

  });
}
