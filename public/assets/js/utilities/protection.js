
var Protection = {
  FLAG : true,

  avoidDobleClick : function(callback){
    if(Protection.FLAG){
        Protection.FLAG = false;
        callback();
        Protection.FLAG = true;
    }
  },
  avoidNull : function(value,callback){
      if(value==null || value==undefined){
        console.log('Objeto nulo');
        return;
      }
      if(value==[]){
        console.log('Objeto vacio');
        return;
      }
      callback();
  },
  ensureFill : function(data,callback,failHandler){
      var arr = Object.values(data);

      for(var i=0;i<arr.length;i++){
        if(arr[i]==""||arr[i]==undefined||arr[i]==null){
          failHandler('Por Favor Rellenar Todos Los Campos');
          return;
        }
      }

      callback();
  }

};
