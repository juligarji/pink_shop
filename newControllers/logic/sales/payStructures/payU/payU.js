var config = require('./config.js');
var encryptor = require('../../../../middleware/serverResources/encryptor.js');
var parentPayments = require('../parentPayments.js');

var payU = new parentPayments();

payU.configBody = function(data,client,reference,callback){

  var StringToConvert = config.apiKey + '~' + config.merchantId + '~' + reference + '~' + data.meta.totalPrice + '~' + 'COP';
  encryptor.encryptStringToMd5(StringToConvert,function(hash){
        var descriptionSell = ``;

        data.products.forEach(function(dataElement){
            descriptionSell =  descriptionSell + ` ${dataElement.ammount} Unidades de ${dataElement.name} Ref: ${dataElement.reference}Valor: ${dataElement.price},`;
        });
        var sendBody = {
            merchantId :config.merchantId,
            referenceCode : reference,
            description: descriptionSell,
            ammount: data.meta.totalPrice,
            tax:data.meta.totalTax,
            taxReturnBase : 0,// revisar este atributo,
            signature : hash,
            accountId : config.accountId,
            currency:'COP',
            buyerFullName : client.name + ' ' + client.lastname,
            buyerEmail : client.user.email,
            shippingAddress : client.location.address,
            shippingCity : client.location.cities.name,
            shippingCountry : 'Colombia',
            telephone : client.phoneNumber
        }
        callback({address:config.address,body:sendBody});
  });

}

payU.handleResponse = function(req,res,next){
    var data = req.body;

    quotationsModel.getByReference(data.reference_sale,function(quot){

        if(quot==null){
            errorHandler.salesError(err,res,{code:'501',obj:'Null Quotations'});
            return;
        }

        var new_value  = data.value.toFixed(2);
            new_value = new_value.split('');

           if(new_value[new_value.length-1]==0){
               new_value.splice(new_value.length-1,1);
           }
            new_value = new_value.join('');

        var StringToCompare = config.apiKey + '~' + data.merchantId + '~' + data.reference_sale + '~' + new_value + '~'+ data.currency + '~' + data.state_pol;

            encryptor.encryptStringToMd5(StringToCompare,function(hash){
                if(hash!=data.sign){
                  errorHandler.salesError(err,res,{code:'600',obj:'Invalid Sign PayU'});
                  return;
                }

                switch(data.state_pol){
                    case 4:// transaccion aprovada, dinero en cuenta
                      salesModel.create(quot,function(newSale){
                            //espacio para ver que hacer cuando finalice la compra
                      },function(err){
                          errorHandler.mongoose(err,res);
                          return;
                      });
                        break;
                    case 5:// transaccion expiro caducidad
                      quotationsModel.deleteByReference(quot.reference,function(){
                            // ver que hacer cuando se cancela una peticion
                      },function(err){
                        errorHandler.mongoose(err,res);
                        return;
                      });
                        break;
                    case 6:// transaccion rechazada pero puede volver
                        res.status(200).end();
                        break;
                }
                // logica para insertar la venta y borrar la cotizacion


            });



    },function(err){
      errorHandler.salesError(err,res,{code:'404',obj:'Quotations'});
      return;
    })

}

module.exports = payU;
