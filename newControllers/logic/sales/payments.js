
var request = require('request');
var totalizateLogic = require('../helpersLogic/totalizateLogic.js');
var parentsPayments = require('./payStructures/parentPayments.js');

var clientsModel = require('../../../models/models/users/clientsModel');
var quotationsModel = require('../../../models/models/sales/quotationsModel.js');

/* metodos de pago */
var payU = require('./payStructures/payU/payU.js');


var payments = (function(){
  var currentMethods = {};
  /* inicializa todas las formas de pago*/
  currentMethods['payU'] = payU;

  return {
  getCurrentMethods :function(){
      return currentMethods;
  },
  payProducts : function(req,res,next) {
        //cambiar logica para que busque en la base de datos los usuarios reales y obtenga los datos como direccion, nombre etc


              // forma de prueba premiliminar en formato clientsModel
              // tambier recibir desde el cliente la forma de pago
              /*
              */

          totalizateLogic.totalizateClientCart(req.body,function(prod){
              // falta buscar usuario y agregarlo a la quot
              quotationsModel.create(prod,null,function(newQuot){
                //aqui hacer el clientsModel.get ... y que retorne la info reales
                /* objeto de prueba*/

                var personaPrueba = {
                  user : {
                    email:'test1@gmail.com'
                  },
                  name : 'Julian',
                  lastname : 'Garzon',
                  phoneNumber : '314586974',
                  identification : '14587963654',
                  location : {
                    cities : {
                      name : 'Bogota'
                    },
                    address : 'Kr 21 no. 3 a 52',
                    coordinates : ""
                  }
                }
                // agregar aqui que el usuario envie igualmente la forma de pago
                // en req.body.payMent method, sera un codigo no complicado
                // agregar que la referencia se creee de buena manera
                  currentMethods['payU'].configBody(prod,personaPrueba,newQuot.reference,function(bod){

                      res.status(200).send({message:'Sucess Call implements',data:bod});
                      return;
                });
              },function(err){
                errorHandler.mongoose(err,res);
                return;
              });

          });
 },
 handleResponse : function(req,res,next){

 }

}

})();


 module.exports = payments;
