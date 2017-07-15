var config = require('./config.js');
var encryptor = require('../../../../middleware/serverResources/encryptor.js');
var parentPayments = require('../parentPayments.js');

var payU = new parentPayments();

payU.configBody = function(data,client,reference,callback){

  var StringToConvert = config.apiKey + '~' + config.merchantId + '~' + reference + '~' + data.meta.totalPrice + '~' + 'COP';
  encryptor.encryptStringToMd5(StringToConvert,function(hash){
        var descriptionSell = ``;

        data.products.forEach(function(dataElement){
            descriptionSell =  descriptionSell + ` |${dataElement.ammount}| Unidades de ${dataElement.name} Ref: |${dataElement.reference}| Valor: |${dataElement.price}|,`;
        });
        //console.log(client,null,'\t');
        /* BUENA FORMA, REVISTAR PARA VER COMO IMPLEMENTARLA
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
        }*/

        /* MALA FORMA- PROVISIONAL HASTA QUE ENCUENTRE SOLUCION*/
        var element =  `<form id="formBuy" method="post" action="${config.address}">

        <input name="merchantId"    type="hidden"  value="${config.merchantId}">
          <input name="referenceCode" type="hidden"  value="${reference}" >
          <input name="description"   type="hidden"  value="1${descriptionSell}"  >
          <input name="amount"        type="hidden"  value="${data.meta.totalPrice}">
          <input name="tax"           type="hidden"  value="${data.meta.totalTax}"  >
          <input name="taxReturnBase" type="hidden"  value="0" >
          <input name="signature"     type="hidden"  value="${hash}">
          <input name="accountId"     type="hidden"  value="${config.accountId}" >
          <input name="currency"      type="hidden"  value="COP" >
          <input name="buyerFullName"    type="hidden"  value="${client.name} ${client.lastname}" >
          <input name="buyerEmail"    type="hidden"  value="${client.user.email}" >
          <input name="shippingAddress"    type="hidden"  value="${client.location.address}" >
          <input name="shippingCity"    type="hidden"  value="${client.location.cities.name}" >
          <input name="shippingCountry"    type="hidden"  value="Colombia" >
          <input name="telephone"    type="hidden"  value="${client.phoneNumber}" >
          <input name="test"          type="hidden"  value="1" >
          <!--
          <input name="responseUrl"    type="hidden"  value="http://http://pink-shop.herokuapp.com/" >
          <input name="confirmationUrl"    type="hidden"  value="" >-->

        </form>`;
        callback({data:{address:config.address,body:element},type:'graphic'});
  });

}

payU.handleResponse = function(req,res,next){
    var data = req.body;
    console.log('RESPUESTA XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    console.log(data,null,'\t');
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
                            req.stateOfTransaction = 1;
                      },function(err){
                          errorHandler.mongoose(err,res);
                          return;
                      });
                        break;
                    case 5:// transaccion expiro caducidad
                      quotationsModel.deleteByReference(quot.reference,function(){
                            // ver que hacer cuando se cancela una peticion
                            req.stateOfTransaction = 3;
                      },function(err){
                        errorHandler.mongoose(err,res);
                        return;
                      });
                        break;
                    case 6:// transaccion rechazada pero puede volver
                        res.status(200).end();
                        req.stateOfTransaction = 2;
                        break;
                }
                console.log('ESTADOS DE POL');
                console.log(data.sate_pol);
                next();
                // logica para insertar la venta y borrar la cotizacion
            });

    },function(err){
      errorHandler.salesError(err,res,{code:'404',obj:'Quotations'});
      return;
    })

}

module.exports = payU;
