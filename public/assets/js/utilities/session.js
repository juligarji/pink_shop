
function openSession(e){
  // validation code here
    e.preventDefault();

    var sentData = JSON.stringify({
          email:$("#login input[name='email']").val(),
          password:$("#login input[name='password']").val()
    });

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
        console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
        var $toastContent = $('<I am toast content</span>');
        Materialize.toast(jqXHR.responseJson, 5000);
    });
}

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
    });
}
