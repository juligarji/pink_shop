
/* DECLARACION DE DIRECCIONES DENTRO DE LA BASE DE DATOS*/
var CREATE_FRAGANCE = '/admin/createfragance';
var DELETE_FRAGANCE = '/admin/deletefragance';
var GET_FRAGANCES = '/admin/getfragances';//recibe varios parametros diferentes
var NEW_PICTURE = '/admin/newpicture';
var DELETE_PICTURE = '/admin/deletepicture';
var GET_SINGLE_FRAGANCE = '/admin/getsinglefragance';
var EDIT_SINGLE_FRAGANCE = '/admin/editsinglefragance';
var EDIT_PHOTOS_FRAGANCE = '/admin/editphotosfragance';
var FLAG = true;

$(window).ready(function(){

/* CARGAR COMPONENTES */

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

/*  CONFIGURAR MANEJADOR DE ERRORES*/

/* FUNCIONES PROPIAS DE LA VISTA */

  ScrollIssues.initDataScroll('#fragancesTable tbody',GET_FRAGANCES,Graphics.loadToTable);

});// document ready function

/* XXXXXXXXXX FUNCIONES PROPIAS XXXXXXXXXXX */

    //MANEJADOR DE ERRORES
function errorHandler(err){
  // provisional
  console.log(err);
}

    //TABLAS
function deleteRegistry(name,index){

    DB.deleteSingle(name,DELETE_FRAGANCE,function(){
      Graphics.deleteRow(index);
    });
}
/* manejo de los datos del perfume */
function createFragance(){

  var newData = {
      name : $("#fraganceForm input[name='name']").val(),
      size: $("#fraganceForm select[name='size']").val(),
      gender : $("#fraganceForm select[name='gender']").val(),
      fragance : $("#fraganceForm select[name='fragance']").val(),
      group : $("#fraganceForm select[name='group']").val(),
      brand : $("#fraganceForm select[name='brand']").val(),
      discount : $("#fraganceForm input[name='discount']").val(),
      price : $("#fraganceForm input[name='price']").val(),
      minForDiscount : $("#fraganceForm input[name='minForDiscount']").val(),
      wholesale : $("#fraganceForm input[name='wholesale']").val(),
      description : $("#fraganceForm input[name='description']").val(),
      ammount : $("#fraganceForm input[name='ammount']").val(),
      photos : Memory.getLocalPics()
  }

  DB.currentCall(newData,CREATE_FRAGANCE,function(data){
      //console.log('Producto creado');
      ScrollIssues.listenChanges('#fragancesTable tbody',GET_FRAGANCES,Graphics.loadToTable);
  },errorHandler);

};

/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx Imagenes locales */
function removeLocalPic(path){

  var newData = {
      path : path
  }

  DB.currentCall(newData,DELETE_PICTURE,function(data){
    Memory.removeLocalPic(path);
    Graphics.fillPhotoModal(Memory.getLocalPics(),uploadLocalPics,removeLocalPic);
  },errorHandler);
}

function uploadLocalPics(type){
  if(FLAG){
    FLAG = false;

    DB.pictureCall('localPhotoFile',type,NEW_PICTURE,function(data){
      Memory.addLocalPic(data);
      Graphics.fillPhotoModal(Memory.getLocalPics(),uploadLocalPics,removeLocalPic);

      FLAG = true;
    },errorHandler);
  }
}

function loadLocalModalPhotos(name){

    Graphics.fillPhotoModal(Memory.getLocalPics(),uploadLocalPics,removeLocalPic);
    $('#photoModal').modal('open');
}

/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Fotos del servidor */
function removeEditPic(path){

    var newData = {
        path : path
    }

    DB.currentCall(newData,DELETE_PICTURE,function(data){
      //Memory.removeLocalPic(path);
      Memory.removeEditPic(path);

      newData = {
        name:Memory.getEditName(),
        photos:Memory.getEditPics()
      }

      DB.currentCall(newData,EDIT_PHOTOS_FRAGANCE,function(data){

          Graphics.fillPhotoModal(Memory.getEditPics(),uploadEditPics,removeEditPic);
      });

    },errorHandler);
}

function uploadEditPics(type){
  if(FLAG){
    FLAG = false;

    DB.pictureCall('localPhotoFile',type,NEW_PICTURE,function(data){
      Memory.addEditPic(data);

      var newData = {
        name:Memory.getEditName(),
        photos:Memory.getEditPics()
      }

      DB.currentCall(newData,EDIT_PHOTOS_FRAGANCE,function(data){

          Graphics.fillPhotoModal(Memory.getEditPics(),uploadEditPics,removeEditPic);
          FLAG = true;
      });

    },errorHandler);
  }
}

function loadEditModalPhotos(name){
  var newData = {
    name:name
  }

  DB.currentCall(newData,GET_SINGLE_FRAGANCE,function(data){

      Memory.setEditPics(data.photos);
      Memory.setEditName(data.name);


      Graphics.fillPhotoModal(Memory.getEditPics(),uploadEditPics,removeEditPic);
      //cambiar el manejador de archivos de las fotos
      $('#photoModal').modal('open');

  },errorHandler);
}


// NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo
function submitEditModal(name,index){
  var newData = {
      name : $("#editModal input[name='name']").val(),
      size: $("#editModal select[name='size']").val(),
      gender : $("#editModal select[name='gender']").val(),
      fragance : $("#editModal select[name='fragance']").val(),
      group : $("#editModal select[name='group']").val(),
      brand : $("#editModal select[name='brand']").val(),
      discount : $("#editModal input[name='discount']").val(),
      price : $("#editModal input[name='price']").val(),
      minForDiscount : $("#editModal input[name='minForDiscount']").val(),
      wholesale : $("#editModal input[name='wholesale']").val(),
      description : $("#editModal input[name='description']").val(),
      ammount : $("#editModal input[name='ammount']").val(),
      oldName : name
  }

    DB.currentCall(newData,EDIT_SINGLE_FRAGANCE,function(data){
        Graphics.editRow(data,index);
    });
}

function loadEditModal(name,index){
    var newData = {
      name:name
    }
    console.log('como lo llama :' + name);
    DB.currentCall(newData,GET_SINGLE_FRAGANCE,function(data){
        console.log('lo que llego');
        console.log(data,null,'\t');
        Graphics.fillEditModal(index,data,submitEditModal);
        $('#editModal').modal('open');
    },errorHandler);
}
