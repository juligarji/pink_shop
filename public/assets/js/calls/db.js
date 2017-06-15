
var getMoreElements = (function(){
    var index = 0;

    // manejo de las llamadas a la base de datos

    return function(ammount,url,callback){

      var newData = JSON.stringify({
        ammount : ammount,
        index : INDEX,
        recent : true
      });

      var call =   $.ajax({
            url : url,
            type : 'POST',
            contentType: 'application/json',
            data: newData
      });

      call.done(function(data){

          callback(data.data);
          INDEX ++;
      });

      call.fail(function(jqXHR, textStatus, error){
          console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
      });
    }
})();
