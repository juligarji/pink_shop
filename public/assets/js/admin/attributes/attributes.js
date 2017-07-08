
var CREATE_COMPONENT = '/admin/createcomponent';
var DELETE_COMPONENT = '/admin/deletecomponent';

var CREATE_ATTRIBUTE = '/admin/createattribute';
var DELETE_ATTRIBUTE = '/admin/deleteattribute';

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

function editKind(name){

}

function deleteKind(id){

  var newData = {
    id:id
  }

  Dialogs.confirmBox('Esta seguro de eliminar ?',function(){
    DB.currentCall(newData,DELETE_KIND,function(){
        Graphics.deleteRow(id);
    },failHandler);
  },
  function(){

  });
}


function createComponent(ev,id){
  ev.preventDefault();

  var newData = {
    name : $(`form[value='${id}'] input[name='name']`).val(),
    isNumeric : $(`form[value='${id}'] select[name='isNumeric']`).val(),
    idKind: `${id}`
  }
  Protection.ensureFill(newData,function(){

      DB.currentCall(newData,CREATE_COMPONENT,function(data){
          console.log(data);
          Dialogs.sucessMessage(data.message);
          Graphics.createNewRow(id,data.data);
      },failHandler);

  },failHandler);

}



function deleteComponent(ev,idComp){
  ev.preventDefault();

  var newData = {

    idComp: `${idComp}`
  }

  Dialogs.confirmBox('Esta seguro de eliminar ?',function(){
    DB.currentCall(newData,DELETE_COMPONENT,function(data){
        Graphics.deleteRow(idComp);
        Dialogs.sucessMessage(data.message);
    },failHandler);
  },function(){

  });

}



/* funciones de los atribuos */
function createAttributeToComp(ev,id){
  ev.preventDefault();

  var newData = {
    value : $(`form[value='${id}'] input[name='value']`).val(),
    discount : $(`form[value='${id}'] input[name='discount']`).val(),
    idComp : id
  }

  Protection.ensureFill(newData,function(){

      DB.currentCall(newData,CREATE_ATTRIBUTE,function(data){
          console.log(data);
          Dialogs.sucessMessage(data.message);
          Graphics.createNewAttributeCont(id,data.data);
      },failHandler);
  },failHandler);

}

function deleteAttributeToComp(ev,idComp,idAttr){
  ev.preventDefault();

  var newData = {
    idAttr: idAttr,
    idComp:idComp
  }

  Dialogs.confirmBox('Esta seguro de eliminar ?',function(){
    DB.currentCall(newData,DELETE_ATTRIBUTE,function(data){
        Graphics.deleteAttributeCont(idAttr);
        Dialogs.sucessMessage(data.message);
    },failHandler);
  },function(){

  });



}
