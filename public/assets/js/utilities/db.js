
var DB = {
   INDEX : 0,
   FLAG : true,
  currentCall : function (data,url,sucessCall,failCall){

    //Protection.avoidDobleClick(function(){// prevenir que se envie inmediatamente una accion

      var newData = JSON.stringify(data);
      var call =   $.ajax({
            url : url,
            type : 'POST',
            contentType: 'application/json',
            data: newData
      });

      call.done(function(data){
          sucessCall(data);
      });

      call.fail(function(jqXHR, textStatus, error){
          failCall(jqXHR.responseText);
          //console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
      });
    //});
  },

  pictureCall : function(fileContainer,type,address,sucessCall,failCall,button){
// arrreglar doble click
    $(button).attr('disabled','disabled');
    if(!DB.FLAG){
      return;
    }
    DB.FLAG = false;

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
          $(button).removeAttr('disabled');
          DB.FLAG = true;
      });

      call.fail(function(jqXHR, textStatus, error){
          console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
          failCall(jqXHR.responseJson);
          $(button).removeAttr('disabled');
      });
    });
  },

  /* Manejo de llamadas a base de datos remota */

   getMoreElements : function(ammount,meta,callback,failback){

      // PUEDE TENER O NO QUERY
      // meta tendra, address,query
    var newData = {
      ammount : ammount,
      index : DB.INDEX,
      kind : meta.kind,
      query : meta.query,
      recent : true
    }
    if(DB.FLAG){
      DB.FLAG = false;

      DB.currentCall(newData,meta.address,

        function(data){
        callback(data);
        DB.INDEX ++;
          DB.FLAG = true;
      },failback);
    }


  },

    restartGetMoreCall : function(){
      DB.INDEX = 0;
      //DB.getMoreElements(ammount,meta,callback,failback);
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
