
var Session = {
  openSession : function (e,formContainer,failHandler){
    // validation code here
      e.preventDefault();

      var sentData = {
            email:Protection.formatCorrectText($(`${formContainer} input[name='email']`).val()),
            password:$.trim($(`${formContainer} input[name='password']`).val())
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

            window.location.replace(data.data);
            /*document.cookie = "token=" + data.token + ";";*/
            /*location.reload();*/
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
          window.location.replace('/');
      });

      call.fail(function(data){
          console.log('Error al cerrar sesion');
      });
  }

}
