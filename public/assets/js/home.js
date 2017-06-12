
$(window).ready(function(){

    //document.cookie = null;  test
    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({fullWidth: true});
    setInterval(function(){
          $('.carousel.carousel-slider').carousel('next');
    },6000);
    $('select').material_select();


    $(".button-collapse").sideNav();
    $('.slider').slider();
    $('.parallax').parallax();
    $('.modal').modal();
    $('.tooltipped').tooltip({delay: 50});
    Materialize.updateTextFields();

    var $grid = $('.grid').masonry({
    // options
    itemSelector: '.grid-item'

    });

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

    $grid.on( 'layoutComplete', function( event, items ) {
  console.log( items.length );
});

  $(window).resize(function(){
    //location.reload();
  });

/* interceptor */

  $('#login').on('submit', function(e){
    // validation code here
    e.preventDefault();

    var sentData = JSON.stringify({

          email:$("#login input[name='email']").val(),
          password:$("#login input[name='password']").val(),
    });


    var call = $.ajax({
          type:'POST',
          url:'/sign/signin',
          //dataType:'json',
          contentType: 'application/json',

          data:sentData
    });

    call.done(function(data){

    //if(data==null) return;
    document.cookie = "token=" + data.token + ";";
    location.reload();
    });

    call.fail(function(jqXHR, textStatus, error){
        console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
        var $toastContent = $('<I am toast content</span>');
        Materialize.toast(jqXHR.responseJson, 5000);
    });


  });

});




/*
$('#login').submit(function(ev){
    ev.preventDefault();

    var call = $.ajax({
          type:'POST',
          //url:'/test/signin',
          url:'/sign/signin',
          dataType : 'json',
          data: {
              email:$('#login input[name="email"]').val(),
              password:$('#login input[name="password"]').val()
          },
    });

    call.done(function(data){
      console.log(data);
      sessionStorage.setItem('token',data.token);
      console.log(sessionStorage,null,'\t');
    });

    call.fail(function(err){
        console.log('error: ' + err.responseText);
    });

});
*/
/*
$('#login').submit(function(ev){
    ev.preventDefault();
})*/
/*
function submitUser(){

  var call = $.ajax({
        type:'POST',
        //url:'/test/signin',
        url:'/sign/signin',
        dataType : 'json',
        data: {
            email:$('#login input[name="email"]').val(),
            password:$('#login input[name="password"]').val()
        },
  });

  call.done(function(data){
    console.log(data);
    sessionStorage.setItem('token',data.token);
    console.log(sessionStorage,null,'\t');
  });

  call.fail(function(err){
      console.log('error: ' + err.responseText);
  });

}
*/

/*Seccion de carga de datos */

/*
document.querySelector('#login').addEventListener('submit',event =>{

  event.preventDefault();
  /*
  const formData = new FormData();
  formData.append('email',$('#login input[name="email"]').val())
  formData.append('password',$('#login input[name="password"]').val())
*/
/*
const formLogin = document.querySelector('#login')
const formData = new FormData(formLogin)

  console.log(formData.get('email'));
    fetch('/test/signin',{
        method:'POST',
        body: formData,
        processData: false,
        contentType: false
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
})
*/


/* Ultimo ntento */
/*
function submitUser(){

  var myFormData = new FormData();

  myFormData.append('email',$("#login input[name='email']").val());
  myFormData.append('password',$("#login input[name='password']").val());

 var call = $.ajax({
       type:'POST',
       url:'/test/signin',
       processData: false, // important
       contentType: false, // important
       dataType : 'json',
       data: myFormData,

       sucess : function(data){
         console.log('photo uploaded sucess');
         //location.reload();
       }
 });

  call.done(function(data){

      //if(data==null) return;
      console.log('photo uploaded Done');
      //location.reload();
  });

  call.fail(function(jqXHR, textStatus, error){
      console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
    //  location.reload();
  });

}
*/
