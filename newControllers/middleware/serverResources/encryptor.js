var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var errorHandler = require('../error/errorHandler.js');
var SALT_NUMBER = 10;

var encryptor = {

  encrypt : function(data,callback){
    bcrypt.genSalt(SALT_NUMBER,function(err,salt){
        if (err) {
            errorHandler.handle(err);
            return;
          };
            bcrypt.hash(data,salt,null,function(err,hash){
                if(err){
                  errorHandler.handle(err);
                  return;
                }
                    callback(hash);
            });
    });
  },
  compare : function(dataStandar,dataEncrypt,callback){
    bcrypt.compare(dataStandar,dataEncrypt,function(err,response){
      if(err){
        errorHandler.handle(err);
        return;
      }
      callback(response);
    });
  },
  encryptObjectToMd5 : function(object,callback){

    if(typeof(object)!='object'){
      errorHandler.handle({code:112},'La variable ingresada no es un objeto');
      return;
    }
    var objString = JSON.stringify(object);

    callback(crypto.createHash('md5').update(objString).digest("hex"));
  },
  encryptStringToMd5 : function(stringData,callback){
      callback(crypto.createHash('md5').update(stringData).digest("hex"));
  }
}

module.exports = encryptor;
