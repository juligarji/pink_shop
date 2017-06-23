
var DB = {
   INDEX : 0,

  currentCall : function (data,url,sucessCall,failCall){
    
    Protection.avoidDobleClick(function(){// prevenir que se envie inmediatamente una accion

      var newData = JSON.stringify(data);
      var call =   $.ajax({
            url : url,
            type : 'POST',
            contentType: 'application/json',
            async: false,
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

  pictureCall : function(fileContainer,type,address,sucessCall,failCall){

    Protection.avoidDobleClick(function(){

      var myFormData = new FormData();
      var pictureInput = document.getElementById(fileContainer).files[0];
        document.getElementById(fileContainer).form.reset();

        myFormData.append('pictureFile',pictureInput);

        myFormData.append('type',type);

     var call = $.ajax({
           type:'POST',
           url:address,
           processData: false, // important
           contentType: false, // important
           dataType : 'json',
           data: myFormData
     });

      call.done(function(data){
          // lA SUBIDA AL SERVIDOR FUE EXITOSA
          sucessCall(data.data);
          /* Almacenamiento solo para pruebas*/
      });

      call.fail(function(jqXHR, textStatus, error){
          console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
          failCall(jqXHR.responseJson);
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
  },

   editSingle : function(name,url,data){

    var newData = JSON.stringify(data);

    DB.currentCall(newData,url,callback,function(err){

    });
  },

   deleteSingle : function(name,url,callback){

    var newData = {
        name : name
    };

    DB.currentCall(newData,url,callback,function(err){

    });
  }

}
