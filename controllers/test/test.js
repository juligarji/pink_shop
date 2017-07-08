var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var routesProtect = require('../authentication/routesProtect.js');
/* Prueba de herencia perfumes */

/*var fragancesSchema = require('../../models/db/schemas/fragances/fragances.js');
var perfumes = require('../../models/models/frangances/fragancesModel.js');
var usersSchema = require('../../models/db/schemas/users.js');
var users = require('../../models/models/users.js');
var auth = require('../authentication/auth.js');*/

var herenciaPerfumesTest = function(req,res,next){// Pagina principal

    res.set('Content_type','text/html');
    res.send('<h1>' + perfumes.create() + '</h1>');
}


var rutaPrivada = function(req,res){

  if(!res.locals.authorized){
      res.send({message:'Acceso invalido'});
      return;
  }
  res.status(200).send({message: 'Tienes acceso'});

}
/* Puntos de acceso de las pruebas*/




/*prueba de seleccion de password provado*/
router.post('/passwordget',function(req,res){
    users.getEnct('admin@test.com',function(pass){
        res.send(pass);
    });
})

router.get('/delete-users',function(req,res){
    usersSchema.remove(function(err){
        res.status(200).end();
    });
})

/* priebas de la nueva funcionalidad */
var products = require('../../models/db/schemas/products/products.js');
var attributes = require('../../models/db/schemas/products/attributes/attributes.js');
var components = require('../../models/db/schemas/products/attributes/components.js');
var brands = require('../../models/db/schemas/products/brands.js');
var kinds = require('../../models/db/schemas/products/kinds.js');
var taxes = require('../../models/db/schemas/products/taxes.js');


router.post('/crearProductos',function(req,res,next){
  var data = req.body;
  data.modified_at = Date.now();

  console.log(data,null,'\t');
  var newProduct = new products(data);

  newProduct.save(function(err){
    if(err) throw err;
      console.log('Creacion exitosa');
      res.send('exito');
  });
});
router.post('/crearAtributos',function(req,res,next){
  var data = req.body;

  var newProduct = new attributes(data);

  newProduct.save(function(err){
    if(err) throw err;
      console.log('Creacion exitosa');
      res.send('exito');
  });
});
router.post('/crearComponentes',function(req,res,next){
  var data = req.body;
  data.modified_at = Date.now();
  var newProduct = new components(data);

  newProduct.save(function(err){
    if(err) throw err;
    res.send('exito');
      console.log('Creacion exitosa');
  });
});
router.post('/crearMarcas',function(req,res,next){
  var data = req.body;
    data.modified_at = Date.now();
  var newProduct = new brands(data);

  newProduct.save(function(err){
    if(err) throw err;
      console.log('Creacion exitosa');
      res.send('exito');
  });
});
router.post('/crearTipos',function(req,res,next){
  var data = req.body;
  data.modified_at = Date.now();
  var newProduct = new kinds(data);

  newProduct.save(function(err){
    if(err) throw err;
      console.log('Creacion exitosa');
      res.send('exito');
  });
});
router.post('/crearImpuestos',function(req,res,next){
  var data = req.body;
  data.value = parseFloat(data.value);


  var newProduct = new taxes(data);

  newProduct.save(function(err){
    if(err) throw err;
      console.log('Creacion exitosa');
      res.send('exito');
  });
});

/* visualizaciones */
router.get('/verProductos',function(req,res,next){

      products.find({},function(err,data){
          res.send(data);
      });
});

router.get('/verAtributos',function(req,res,next){

      attributes.find({},function(err,data){
          res.send(data);
      });
});

router.get('/verComponentes',function(req,res,next){

      components.find({},function(err,data){
          res.send(data);
      });
});

router.get('/verMarcas',function(req,res,next){

      brands.find({},function(err,data){
          res.send(data);
      });
});

router.get('/verTipos',function(req,res,next){

      kinds.find({},function(err,data){
          res.send(data);
      });
});

router.get('/verImpuestos',function(req,res,next){

      taxes.find({},function(err,data){
          res.send(data);
      });
});

/* Segundaws pruebas */
var salesModel = require('../../models/models/sales/salesModel.js');
var sales = require('../../models/db/schemas/sales/sales.js');
var salesInfo = require('../../models/db/schemas/sales/salesInfo.js');
var usersModel = require('../../models/models/users/users.js');

router.post('/crearUsuario',function(req,res,next){
    var data = req.body;
    usersModel.create(data,function(usr){
      res.send(usr);
    });
});
router.get('/verUsuarios',function(req,res,next){
    usersModel.getAll(function(data){
      res.send(data);
    })
});

// ventas
router.post('/crearVenta',function(req,res,next){
    var data = req.body;
    var info = [{
      product:'595ef3c73a89061709b914aa',
      ammount:5
    },
    {
      product:'595f90bd360ef30f8900759e',
      ammount:5
    }];
    data.info = info;

    salesModel.create(data,function(usr){
      res.send(usr);
    });
});

router.get('/verVentas',function(req,res,next){

  sales.find({},function(err,data){
    if(err) throw err;
      res.send(data);
  });

});
router.get('/verInfoVentas',function(req,res,next){
    /*salesInfo.find({},function(err,data){
        res.send(data);
    });*/
    salesInfo.find({}).populate('product').exec(function(err,datos){
      if(err) throw err;
        res.send(datos);
    });
});

router.get('/borrarInfoVentas',function(req,res,next){
    /*salesInfo.find({},function(err,data){
        res.send(data);
    });*/
    salesInfo.remove(function(err){
      if(err) throw err;
        res.send('bien borrado');
    })
});

router.get('/borrarVentas',function(req,res,next){
    /*salesInfo.find({},function(err,data){
        res.send(data);
    });*/
    sales.remove(function(err){
      if(err) throw err;
        res.send('bien borrado');
    })
});

module.exports = router;
