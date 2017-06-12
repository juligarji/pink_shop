
/*  Viejo */

$(window).ready(function(){

  /* Carga de los componentes materialize */
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
   }
 );

});

function loadEditModal(index){
  /* Funcion para llamr al server y cargar la informacion completa del componente */
  $('#editModal').modal('open');

/*  const HTML = `

    `;*/

}

function loadPhotoModal(index){
  /* Funcion para llamr al server y cargar la informacion completa del componente */
  $('#photoModal').modal('open');


/*  const HTML = `

    `;*/
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
      ammount : $("#fraganceForm input[name='ammount']").val()
  });

  var call =   $.ajax({
        url : '/admin/createfragance',
        type : 'POST',
        contentType: 'application/json',
        data: newData
    });

    call.done(function(data){
        console.log(data.message);
    });

    call.fail(function(error,xhr){
        console.log(error);
    });
};

function closeSession(){
  var call =   $.ajax({
        url : '/sign/signout',
        type : 'GET'
    });

    call.done(function(data){
        console.log('Se ha cerrado sesion exitosamente');
        location.reload();
    });

    call.fail(function(data){
        console.log('Error al cerrar sesion');
    })
}
