
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

    removeLocalPic : function(path){
        // cambiar por base de datos en local
        var buffer = sessionStorage.localImages.split(',');

        buffer.splice(buffer.indexOf(path),1);
        sessionStorage.localImages = buffer.join();
    },

    // Funciones de memoria preliminar de edicion
        // cambiar por base de datos
        getEditPics : function(){
            //cambiar por base de datos en local
          if(localStorage.localImages==undefined || localStorage.localImages==""){
            return [];
          }

            var buffer = localStorage.localImages.split(',');
            var outBuffer = [];

            for(var i=0;i<buffer.length;i++){
              if(buffer[i]!=""){
                  outBuffer.push(buffer[i]);
              }
            }

            return outBuffer;
          //retornar Array con las direcciones
          },
          setEditPics : function(arrayPaths){
              if(!Array.isArray(arrayPaths)){return;}
              if(arrayPaths==[]){
                localStorage.localImages = undefined;
                console.log('No hay fotos asignadas');
                return;
              }

              localStorage.localImages = arrayPaths.join();
          },
        addEditPic : function(newPath){
          //cambiar por base de datos en local
          var arrayPath;

          if(localStorage.localImages ==undefined){
              arrayPath = [];
          }else{
                arrayPath =localStorage.localImages.split(',');
          }

          arrayPath.push(newPath);
          localStorage.localImages = arrayPath.join();
          //guardar array en la memoria
        },

        removeEditPic : function(path){
            // cambiar por base de datos en local
            var buffer = localStorage.localImages.split(',');

            buffer.splice(buffer.indexOf(path),1);
            localStorage.localImages = buffer.join();
        },

        setEditName : function(name){
            localStorage.editName = name;
        },

        getEditName : function(){
          return localStorage.editName;
        }
}
