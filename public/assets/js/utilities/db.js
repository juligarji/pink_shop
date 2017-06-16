

var DB = {
   INDEX : 0,

  currentCall : function (data,url,sucessCall,failCall){

    var call =   $.ajax({
          url : url,
          type : 'POST',
          contentType: 'application/json',
          data: data
    });

    call.done(function(data){
        sucessCall(data.data);
        DB.INDEX ++;
    });

    call.fail(function(jqXHR, textStatus, error){
        failCall(jqXHR.responseJson);
        console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
    });
  },

  /* Manejo de llamadas a base de datos remota */

   getMoreElements : function(ammount,url,callback){

    var newData = JSON.stringify({
      ammount : ammount,
      index : DB.INDEX,
      recent : true
    });

    DB.currentCall(newData,url,callback,function(err){

    });

  },

   getSingle : function(name,url,data){

    var newData = JSON.stringify({
        name : name
    });

    DB.currentCall(newData,url,callback,function(err){

    });
  },

   editSingle : function(name,url,data){

    var newData = JSON.stringify(data);

    DB.currentCall(newData,url,callback,function(err){

    });
  },

   deleteSingle : function(name,url,callback){

    var newData = JSON.stringify({
        name : name
    });

    DB.currentCall(newData,url,callback,function(err){

    });
  }

}



// modificar para el manejo de errores

/*LLAMADAS A ELEMENTOS DE LA BASE DE DATOS*/
