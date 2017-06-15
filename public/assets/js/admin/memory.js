
var Memory = {
    getLocalPics : function(){
        //cambiar por base de datos en local
      if(sessionStorage.localImages==undefined || sessionStorage.localImages==""){
        return [];
      }

        var buffer = sessionStorage.localImages.split(',');
        var outBuffer = [];

        for(var i=0;i<buffer.length;i++){
          if(buffer[i]!=""){
              outBuffer.push(buffer[i]);
          }
        }

        return outBuffer;
      //retornar Array con las direcciones
      },
    addLocalPic : function(newPath){
      //cambiar por base de datos en local
      var arrayPath;

      if(sessionStorage.localImages ==undefined){
          arrayPath = [];
      }else{
            arrayPath =sessionStorage.localImages.split(',');
      }

      arrayPath.push(newPath);
      sessionStorage.localImages = arrayPath.join();
      //guardar array en la memoria
    },
    testSupport : function(){

    },
    removeLocalPic : function(path){
        // cambiar por base de datos en local
        var buffer = sessionStorage.localImages.split(',');

        buffer.splice(buffer.indexOf(path),1);
        sessionStorage.localImages = buffer.join();
    }
}
