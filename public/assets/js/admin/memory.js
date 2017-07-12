var Memory = (function(){
  var Images = new PouchDB('Images');
  Images.info(function(err,res){
      if(err){
        console.log(err);
        return;
      }
      if(res.doc_count!=2){
        Images.put({
          _id:'local',
          paths:[]
        },function(err,img){
          if(err){
            console.log(err);
            return;
          }
          Images.put({
            _id:'edit',
            paths:[]
          },function(err,ed){
            if(err){
              console.log(err);
              return;
            }
            console.log(ed);
          });
        });
      }
  });
  var ID_CURRENT_OBJ;

  return {
    getLocalPics : function(local,callback){
        //cambiar por base de datos en local
        var address;
        if(local){
            address = 'local';
        }else{
              address='edit';
        }
      Images.get(address,function(err,img){
          if(err){
            console.log(err);
            return;
          }
          callback(img.paths);
      });
      },
      setLocalPics : function(local,arrayData,callback){
        var address;
        if(local){
            address = 'local';
        }else{
              address='edit';
        }
        Images.get(address,function(err,img){
          if(err){
            console.log(err);
            return;
          }
          img.paths = arrayData;
          Images.put(img);
          callback();
        });
      },
    addLocalPic : function(local,newPath,callback){
      var address;
      if(local){
          address = 'local';
      }else{
            address='edit';
      }

      Images.get(address,function(err,img){
        if(err){
          console.log(err);
          return;
        }
        img.paths.push(newPath);
        Images.put(img);
        callback();
      });
    },

    removeLocalPic : function(local,path,callback){
        var address;
        if(local){
            address = 'local';
        }else{
              address='edit';
        }
        // cambiar por base de datos en local
        Images.get(address,function(err,img){
          if(err){
            console.log(err);
            return;
          }
          var index = img.paths.indexOf(path);
          img.paths.splice(index,1);
          Images.put(img);
          callback();
        });
    },
    removeAllLocalPics : function(local,callback){
      var address;
      if(local){
          address = 'local';
      }else{
            address='edit';
      }

      Images.get(address,function(err,img){
        if(err){
          console.log(err);
          return;
        }
        img.paths = [];
        Images.put(img);
        callback();
      });

    },
    setEditId : function(idObj){
        ID_CURRENT_OBJ = idObj;
    },
    getEditId : function(){

      return ID_CURRENT_OBJ;
    }
  }

})();
/*
var Memory = {
    Images : {},

    getLocalPics : function(callback){
        //cambiar por base de datos en local

      Memory.Images.get('local',function(err,img){
          if(err){
            console.log(err);
            return;
          }
          callback(img.paths);
      });
      },
    addLocalPic : function(newPath,callback){
      //cambiar por base de datos en local
      MemoryImages.get('local',function(err,img){
        if(err){
          console.log(err);
          return;
        }
        img.paths.push(newPath);
        Memory.Images.put(img);
        callback();
      });
    },

    removeLocalPic : function(path){
        // cambiar por base de datos en local
        MemoryImages.get('local',function(err,img){
          if(err){
            console.log(err);
            return;
          }
          var index = img.paths.indexOf(path);
          img.paths.splice(index,1);
          Memory.Images.put(img);
          callback();
        });
    },
    removeAllLocalPics : function(callback){
      MemoryImages.get('local',function(err,img){
        if(err){
          console.log(err);
          return;
        }
        img.paths = [];
        Memory.Images.put(img);
        callback();
      });

    },

    // Funciones de memoria preliminar de edicion
        // cambiar por base de datos
        getEditPics : function(){
            //cambiar por base de datos en local
          if(sessionStorage.editImages==undefined || sessionStorage.editImages==""){
            return [];
          }

            var buffer = sessionStorage.editImages.split(',');
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
                sessionStorage.editImages = undefined;
                console.log('No hay fotos asignadas');
                return;
              }

              sessionStorage.editImages = arrayPaths.join();
          },
        addEditPic : function(newPath){
          //cambiar por base de datos en local
          var arrayPath;

          if(sessionStorage.editImages ==undefined){
            console.log('session indefinido');
              arrayPath = [];
          }else{
                arrayPath =sessionStorage.editImages.split(',');
          }

          arrayPath.push(newPath);
          sessionStorage.editImages = arrayPath.join();
          //guardar array en la memoria
        },

        removeEditPic : function(path){
            // cambiar por base de datos en local
            var buffer = sessionStorage.editImages.split(',');

            buffer.splice(buffer.indexOf(path),1);
            sessionStorage.editImages = buffer.join();
        },

        setEditName : function(name){
            localStorage.editName = name;
        },

        getEditName : function(){
          return localStorage.editName;
        }
}
*/
/* Inicializaciopn de la base de datos */
/*
  Memory.Images = new PouchDB('Images');

  Memory.Images.get('local',function(err,img){
      if(err){
        console.log(err);
        return;
      }
      if(img==undefined){
        Memory.Images.put({
          _id:'local',
          paths:[]
        });
      }
  });

  Memory.Images.get('edit',function(err,img){
      if(err){
        console.log(err);
        return;
      }
      if(img==undefined){
        Memory.Images.put({
          _id:'edit',
          paths:[]
        });
      }
  });
*/
