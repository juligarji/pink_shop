

/* DECLARACION DE DIRECCIONES DENTRO DE LA BASE DE DATOS*/
var CREATE_FRAGANCE = '/admin/createfragance';
var DELETE_FRAGANCE = '/admin/deletefragance';
var GET_FRAGANCES = '/admin/getfraganceS';//recibe varios parametros diferentes
var NEW_PICTURE = '/admin/newpicture';
var DELETE_PICTURE = '/admin/deletepicture';


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

/*  MODAL DE EDICION */



/* MODAL DE FOTOGRAFIA */


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
        url : CREATE_FRAGANCE,
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


function removePic(path){

  Memory.removeLocalPic(path);
  Graphics.fillPhotoModal(Memory.getLocalPics());

  var newData = JSON.stringify({
      path : path
  });

  var call =   $.ajax({
        url : DELETE_PICTURE,
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

/* INICIO DE LAS LLAMDAS */

function scrollAction(){
  if($( document ).width()>992){

      var scrollHeight = $(document).height() - $('footer').innerHeight();
    	var scrollPosition = $(window).height() + $(window).scrollTop();

    	if ((scrollHeight - scrollPosition) / scrollHeight <= 0) {
    	    // when scroll to bottom of the page
          console.log('final');
          DB.getMoreElements(6,GET_FRAGANCES,function(arrayData){
                Graphics.loadToTable(arrayData);
          });
    	}

  }else{

    var $width = $(this).outerWidth();
    var $scrollWidth = $(this)[0].scrollWidth;
    var $scrollLeft = $(this).scrollLeft();

    if (Math.floor($scrollWidth - $width) == $scrollLeft){
      DB.getMoreElements(3,GET_FRAGANCES,function(arrayData){
            Graphics.loadToTable(arrayData);
      });
    }
  }
}
var FLAG = true;
function scrollBig(index){

  var scrollHeight = $(document).height() - $('footer').innerHeight();
  var scrollPosition = $(window).height() + $(window).scrollTop();

  if ((scrollHeight - scrollPosition) / scrollHeight <= 0) {
      // when scroll to bottom of the page
      if(FLAG){
        FLAG=false;
        DB.getMoreElements(index,GET_FRAGANCES,function(arrayData){
              Graphics.loadToTable(arrayData);
              FLAG = true;
        });
      }
  }
}

function scrollSmall(index){

  var $width = $('#fragancesTable tbody').outerWidth();
  var $scrollWidth = $('#fragancesTable tbody')[0].scrollWidth;
  var $scrollLeft = $('#fragancesTable tbody').scrollLeft();

  if (Math.floor($scrollWidth - $width) == $scrollLeft){
    DB.getMoreElements(index,GET_FRAGANCES,function(arrayData){
          Graphics.loadToTable(arrayData);
    });
  }
}

function initData(){

  if($(document).width()>992){
    //Pantalla grande
    console.log('Gran pantalla');
    DB.getMoreElements(6,GET_FRAGANCES,function(arrayData){
          Graphics.fillTable(arrayData);
    });
    $(window).on('scroll',function(){
      scrollBig(6);
    });

  }else{
        if($(document).width()>600){
          // Pantalla mediana de tablet
          console.log('Tablet pantalla');

          DB.getMoreElements(6,GET_FRAGANCES,function(arrayData){
                Graphics.fillTable(arrayData);
          });
          $('#fragancesTable tbody').on('scroll',function(){
            scrollSmall(6);
          });

        }else{
              // Pantalla pequeña celular
              console.log('Celular pantalla');

              DB.getMoreElements(3,GET_FRAGANCES,function(arrayData){
                    Graphics.fillTable(arrayData);
              });
              $('#fragancesTable tbody').on('scroll',function(){
                scrollSmall(3);
              });

            }
        }
}


// REsizado de la ventana
var CURRENT_WIDTH = $(document).width();


$(window).resize(function(){

  if($(document).width() != CURRENT_WIDTH){
    DB.INDEX =0;
    initData();
    CURRENT_WIDTH = $(document).width();
  }
});

  /* MAIN */

  initData();

});// document ready function

/* tablas */
function deleteRegistry(name,index){
    DB.deleteSingle(name,DELETE_FRAGANCE,function(){
      Graphics.deleteRow(index);
    });
}


/* Modals efects */
function loadPhotoModal(index){
    var arrayPaths = Memory.getLocalPics();
    Graphics.fillPhotoModal(arrayPaths);
    $('#photoModal').modal('open');
}

function uploadLocalPics(type){

    var myFormData = new FormData();
    var pictureInput = document.getElementById('localPhotoFile').files[0];
      document.getElementById('localPhotoFile').form.reset();

      myFormData.append('pictureFile',pictureInput);

      myFormData.append('type',type);

   var call = $.ajax({
         type:'POST',
         url:NEW_PICTURE,
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

function loadEditModal(index){

  $('#editModal').modal('open');

}
