$(window).ready(function(){

/* LOAD COMPONENTS */

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

/*  MODAL DE EDICION */

function loadEditModal(index){

  $('#editModal').modal('open');

}


/* MODAL DE FOTOGRAFIA */
function loadPhotoModal(index){

    var arrayPaths = Memory.getLocalPics();
    Graphics.fillPhotoModal(arrayPaths);
    $('#photoModal').modal('open');

}

function createFragance(){

  var newData = JSON.stringify({
      name : $("#fraganceForm input[name='name']").val(),
      size: $("#fraganceForm select[name='size']").val(),
      gender : $("#fraganceForm select[name='gender']").val(),
      fragance : $("#fraganceForm select[name='fragance']").val(),
      group : $("#fraganceForm select[name='group']").val(),
      brand : $("#fraganceForm select[name='brand']").val(),
      disscount : $("#fraganceForm input[name='disscount']").val(),
      price : $("#fraganceForm input[name='price']").val(),
      minForDisccount : $("#fraganceForm input[name='minForDisccount']").val(),
      wholesale : $("#fraganceForm input[name='wholesale']").val(),
      description : $("#fraganceForm input[name='description']").val(),
      ammount : $("#fraganceForm input[name='ammount']").val(),
      photos : Memory.getLocalPics()
  });

  var call =   $.ajax({
        url : '/admin/createfragance',
        type : 'POST',
        contentType: 'application/json',
        data: newData
    });

    call.done(function(data){
        console.log('Crear fragancia exitoso');
        console.log(data.message);
    });

    call.fail(function(error,xhr){
        console.log(error);
    });
};

/*Acciones de los modal */
function uploadLocalPics(type){

    var myFormData = new FormData();
    var pictureInput = document.getElementById('localPhotoFile').files[0];
      document.getElementById('localPhotoFile').form.reset();

      myFormData.append('pictureFile',pictureInput);

      myFormData.append('type',type);

   var call = $.ajax({
         type:'POST',
         url:'/admin/newpicture',
         processData: false, // important
         contentType: false, // important
         dataType : 'json',
         data: myFormData
   });

    call.done(function(data){
        // lA SUBIDA AL SERVIDOR FUE EXITOSA
        Memory.addLocalPic(data.message);
        Graphics.fillPhotoModal(Memory.getLocalPics());
        /* Almacenamiento solo para pruebas*/
    });

    call.fail(function(jqXHR, textStatus, error){
        console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
    });

}

function removePic(path){

  Memory.removeLocalPic(path);
  Graphics.fillPhotoModal(Memory.getLocalPics());

  var newData = JSON.stringify({
      path : path
  });

  var call =   $.ajax({
        url : '/admin/deletepicture',
        type : 'POST',
        contentType: 'application/json',
        data: newData
    });

  call.done(function(data){
      console.log('borrado exitosamente');
  });

  call.fail(function(jqXHR, textStatus, error){
      console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
  });

}

/* Parte de la tabla de datos */


$('#fragancesTable tbody').scroll( function() {

        if($( document ).width()<992){//esta pequeño

          var $width = $('#fragancesTable tbody').outerWidth()
          var $scrollWidth = $('#fragancesTable tbody')[0].scrollWidth;
          var $scrollLeft = $('#fragancesTable tbody').scrollLeft();

          if (Math.floor($scrollWidth - $width) == $scrollLeft){
              getMoreFragances();
          }
        }else{

          if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
               alert('maximo')
           }
        }
    });
