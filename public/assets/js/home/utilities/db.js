
var DB = {
   INDEX : 0,

  currentCall : function (data,url,asy,sucessCall,failCall){

    Protection.avoidDobleClick(function(){// prevenir que se envie inmediatamente una accion

      var newData = JSON.stringify(data);
      var call =   $.ajax({
            url : url,
            type : 'POST',
            contentType: 'application/json',
            async: asy,
            data: newData
      });

      call.done(function(data){
          sucessCall(data.data);
      });

      call.fail(function(jqXHR, textStatus, error){
          failCall(jqXHR.responseJson);
          console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
      });
    });
  },

  /* Manejo de llamadas a base de datos remota */

   getMoreElements : function(ammount,url,callback){

    var newData = {
      ammount : ammount,
      index : DB.INDEX,
      recent : true
    }

    DB.currentCall(newData,url,
      function(data){
      callback(data);
      DB.INDEX ++;

    },function(err){


    });

  },

   getSingle : function(name,url,data){

    var newData = JSON.stringify({
        name : name
    });

    DB.currentCall(newData,url,callback,function(err){

    });
  }


}
