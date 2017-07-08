
var Session = {
  openSession : function (e,failHandler){
    // validation code here
      e.preventDefault();

      var sentData = {
            email:$("input[name='email']").val(),
            password:$("input[name='password']").val()
      };

      Protection.ensureFill(sentData,function(){

        sentData = JSON.stringify(sentData);

        var call = $.ajax({
              type:'POST',
              url:'/sign/signin',
              contentType: 'application/json',
              data:sentData
        });

        call.done(function(data){

            document.cookie = "token=" + data.token + ";";
            location.reload();
        });

        call.fail(function(jqXHR, textStatus, error){
            failHandler(jqXHR.responseText);
        });

      },failHandler);


  },

  closeSession : function (){

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
      });
  },

  toggleLogin : function (){

    if($('#loginForm').is(':visible')){

      $('#loginForm').fadeOut('slow',function(){
        $('#registryForm').fadeIn('slow');
      });

    }else{

      $('#registryForm').fadeOut('slow',function(){
        $('#loginForm').fadeIn('slow');
      });

    }

  }

}
