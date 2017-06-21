
var fragancesModel = require('../../models/models/frangances/fragancesModel.js');
var fs = require('fs');

var PRODUCTS_ADDRESS = './public/assets/img/products/';
var errorHandler = require('../error/errorHandler.js');

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
      discount : parseFloat(data.discount),
      ammount:parseInt(data.ammount),
      price : parseFloat(data.price),
      description : data.description,
      minForDiscount : parseInt(data.minForDiscount),
      wholesale : parseFloat(data.wholesale),
      photos : data.photos,
      modified_at : Date.now()
  }


  fragancesModel.create(newData,function(newFragance){

    console.log('la fragancia a sido creada con exito');
    res.status(200).send({message:newFragance.name,data:newFragance});
  });

  // Implementar una verificacion desde el servidor
}


var deleteCurrentPicture = function(photoName,arrayNames){
if(photoName == undefined){return;}

    fs.stat(PRODUCTS_ADDRESS + photoName,function(err,stats){
        if(err){
            errorHandler.handle(err);
        }

        fs.unlink(PRODUCTS_ADDRESS + photoName,function(err){
          if(err){
              errorHandler.handle(err);
          }

          deleteCurrentPicture(arrayNames[arrayNames.indexOf(photoName) + 1],arrayNames);

        });
    });


}
var deleteFragance = function(req,res,next){
    var data = req.body;

    fragancesModel.getByName(data.name,function(frag){

        deleteCurrentPicture(frag.photos[0],frag.photos);
        fragancesModel.remove(frag.name,function(){

            res.status(200).send({message:'Borrado exitoso'});
        });
    });
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

var getSingleFragance = function(req,res,next){
    var data = req.body;

    fragancesModel.getByName(data.name,function(fragan){
        res.status(200).send({message:'Busqueda unitaria exitosa',data:fragan});
    });
}

var editSingleFragance = function(req,res,next){
    var data = req.body;

    var newData = {
        name : data.name,
      //  size: data.size,
        gender : data.gender,
        //fragance : data.fragance,
        //group : data.group,
        //brand : data.brand,
        discount : parseFloat(data.discount),
        ammount:parseInt(data.ammount),
        price : parseFloat(data.price),
        description : data.description,
        minForDiscount : parseInt(data.minForDiscount),
        wholesale : parseFloat(data.wholesale),
        //photos : data.photos,
        modified_at : Date.now()
    }

    fragancesModel.updateByName(data.oldName,newData,function(fragan){
        //console.log(fragan,null,'\t');
        res.status(200).send({message:'Edicion exitosa',data:fragan});
    });
}

var editPhotosFragance = function(req,res,next){
    var data = req.body;

    fragancesModel.updatePicturesByName(data.name,data.photos,function(fragan){
        res.status(200).send({message:'Edicion de Imagenes exitosa'});
    });
}


module.exports = {
    createFragance,
    getFragances,
    deleteFragance,
    editSingleFragance,
    editPhotosFragance,
    getSingleFragance
}
