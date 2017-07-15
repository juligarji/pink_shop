
var request = require('request');
var http = require('follow-redirects').http;
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

                      //res.status(200).send({message:'Sucess Call implements',data:bod});
                      /*request({
                            uri: 'https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi',
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                            },
                            data:{
                            	"test": false,
                            	"language": "en",
                            	"command": "GET_PAYMENT_METHODS",
                            	"merchant": {
                            					"apiLogin": "pRRXKOl8ikMmt9u",
                            					"apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
                            				}
                            	}

                            });*/
                            console.log('aqui');
                            http.get('http://bit.ly/900913', function (response) {

                                console.log(response.responseUrl);
                                //req.setHeader('Location',response.responseUrl);
                                //res.status(302).redirect(response.responseUrl);
                                //res.end();
                                /*
                                response.on('data', function (chunk) {
                                  console.log(chunk);
                                  res.setHeader('Location', foo);
                                });*/
                                res.set('Access-Control-Allow-Origin',response.responseUrl);
                                res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

                                //res.setHe('Access-Control-Allow-Origin', response.responseUrl);

                               // Request methods you wish to allow


                               // Request headers you wish to allow
                               res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

                               // Set to true if you need the website to include cookies in the requests sent
                               // to the API (e.g. in case you use sessions)
                               res.set('Access-Control-Allow-Credentials', true);
                              res.status(302).redirect(response.responseUrl);

                              }).on('error', function (err) {
                                console.error(err);
                              });



/*
                            console.log(bod,null,'\t');
                              https.request()*/
                          /*  request({
                                url:bod.address,
                                data : JSON.stringify(bod.body),
                                followAllRedirects: true,
                                //json: true,
                                method: 'post'
                            },function(err,response,body){
                                if(err) throw err;
                                console.log(response);
                            });*/
                      /*request({
                        url:bod.address,
                        method:'POST',
                        followAllRedirects: true,
                        'content-Type':'application/json',
                        jar:true,
                        form : bod.body
                      },function(err,response,body){
                          //console.log(response);
                          //return;
                          if(err){
                            throw err;
                            return;
                          }
                          //console.log(response.headers);
                          console.log(response.statusCode);
                          //res.send(body);
                          //request(response.headers['location'], function(error, response, html) {
                            //    console.log(html);
                            //});
                      });*/
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
