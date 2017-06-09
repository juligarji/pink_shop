var express = require('express');
var router = express.Router();

/* Prueba de herencia perfumes */
var perfumes = require('../../models/models/frangances/fragancesModel.js');

var herenciaPerfumesTest = function(req,res,next){// Pagina principal

    res.set('Content_type','text/html');
    res.send('<h1>' + perfumes.create() + '</h1>');
}

var creacionPerfumes = function(){

}
/* Puntos de acceso de las pruebas*/
/* Prueba llamadas a Perfumes */

router.get('/herenciaPerfumes',herenciaPerfumesTest);
module.exports = router;
