
var fragancesModel = require('../../models/models/frangances/fragancesModel.js');


// middleware para las rutas del administrador

var createFragance = function(req,res,next){//POST

  var data = req.body;


  var newData = {
      name : data.name,
    //  size: data.size,
      gender : data.gender,
      //fragance : data.fragance,
      //group : data.group,
      //brand : data.brand,
      disscount : parseFloat(data.disscount),
      ammount:parseInt(data.ammount),
      price : parseFloat(data.price),
      description : data.description,
      minForDisccount : parseInt(data.minForDisccount),
      wholesale : parseFloat(data.wholesale),
      //photos : data.photos,
      modified_at : Date.now()
  }

  fragancesModel.create(newData,function(newFragance){

    console.log('la fragancia a sido creada con exito');
    res.status(200).send({message:newFragance.name});
  });

  // Implementar una verificacion desde el servidor
}

var getFragances = function(req,res,next){
    var data = req.body;



      var ammount = parseInt(data.ammount);
      var index = parseInt(data.index);
      var recent = data.recent;

  fragancesModel.getPartial(recent,ammount,index,function(data){

      res.status(200).send({message:'Busqueda exitosa',data:data});
      console.log('busqueeda exitosa');
  });
}


module.exports = {
    createFragance,
    getFragances
}
