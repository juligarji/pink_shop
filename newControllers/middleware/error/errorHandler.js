
var errorHandler ={

  handle : function(err){
      // Provisional manejo

      switch(err.code){
        case 404:
          //res.status(500).send(err.message);
          console.log(err.message);
          break;

         default:
          //res.status(500).send('Error en el servidor');
          console.log('error del servidor');
          throw(err);

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
  },
  salesError : function(err,res,generated){
    switch(generated.code){
      case 400:
        res.status(400).send('La verificacion de datos es erronea :' + generated.obj);
        break;
      case 404:// no encontrado en base de datos;
        res.status(404).send('Recurso no encontrado en espacio :' + generated.obj);
          break;
      case 501:
        res.status(501).send('El Recurso especificado no se encuentra dentro del servidor ' + generated.obj);
          break;
      case '600':// error de firma invalida, manejar de otra manera
        res.status(500).send('La Informacion ha sido modificada en el camino |' + generated.obj);
          break;
      default:
        res.status(500).send('Se ha presentado un problema en el servidor, intente mas tarde.');
          break;
    }
  }
}

module.exports = errorHandler;
