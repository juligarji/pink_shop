
var CREATE_KIND = '/admin/createkind';
var DELETE_KIND = '/admin/deletekind';


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

function uploadKind(ev){
  ev.preventDefault();

  var newData = {
    name : $("input[name='name']").val(),
    associatedView:$('select[name="view"]').val(),
    discount : $("input[name='discount']").val(),
    description : $("textArea[name='description']").val()
  }

  Protection.ensureFill(newData,function(){

      DB.currentCall(newData,CREATE_KIND,function(data){
          console.log(data);
          Dialogs.sucessMessage(data.message);
          newData.id = data.data;
          Graphics.createNewRow(newData,editKind,deleteKind);
      },failHandler);

  },failHandler);


}
