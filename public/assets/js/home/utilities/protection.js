

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

};
