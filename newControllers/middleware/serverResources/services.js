
var jwt = require('jwt-simple');
var moment = require('moment');// libreria para la fecha
var config = require('../../../config.js');

function createToken(user){// crea el token de acceso para el cliente al REgistrarse
  var payLoad = {// jwt estandar para el envio del info
    sub: user.email,// cambiar por otro que no sea el de mongo para mayor seguridad
    iat: moment().unix(),
    exp: moment().add(14,'days').unix(),// caducidad del token
  }

  return jwt.encode(payLoad,config.SECRET_TOKEN);
}

function decodeToken(token){// decodificar token

  const decoded = new Promise((resolve,reject)=>{// promesa ecmascript 2015
      try{
        const payload = jwt.decode(token,config.SECRET_TOKEN);

        if(payload.exp <= moment().unix()){
           reject({
            status:'401',
            message:'Token a expirado'
          });
        }

        resolve(payload.sub);
      }catch(err){
          reject({
            status:500,
            message:'Invalid Token'
          })
      }

  });
  return decoded;
}
module.exports = {
  createToken,
  decodeToken
};
