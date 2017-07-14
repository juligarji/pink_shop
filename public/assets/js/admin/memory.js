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
