
var errorHandler ={

  handle : function(err){
      console.log('XXXXXXXXXXXXXXXXXX');// Provisional manejo
      throw err;

  },
  isNotEmpty : function(data){
    if(data==null||data==undefined||data==[]||data=={}){
      console.log('el objeto esta incorrecto');
      return false;
    }
    return true;
  }
}

module.exports = errorHandler;
