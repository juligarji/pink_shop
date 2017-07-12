
var errorHandler ={

  handle : function(err,res){
      // Provisional manejo

      switch(err.code){
        case 404:
          //res.status(500).send(err.message);
          console.log(err);
          break;

         default:
          //res.status(500).send('Error en el servidor');
          console.log('error del servidor');
          break;

      }
      return;
  },
  isNotEmpty : function(data){
    if(data==null||data==undefined||data==[]||data=={}){
      console.log('el objeto esta incorrecto');
      return false;
    }
    return true;
  },
  mongoose : function(err,res){
    switch(err.code){
      case 404:
        res.status(404).send('Elemento no encontrado');
        break;
      case 11000:
          res.status(400).send('El nombre ya existe');
        break;
      default :
        console.log(err,null,'\t');
        res.status(500).send('se ha presentado un error, intente mas tarde');
        break;
    }
  }
}

module.exports = errorHandler;
