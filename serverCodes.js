
var errorHandler = require('./newControllers/middleware/error/errorHandler.js');
var SUPER_KEY = process.env.SUPER_KEY || 'super';// provisional, cambiar para desplegue
var ADMIN_KEY = process.env.ADMIN_KEY || 'admin';// provisional, cambiar para desplegue
var encryptor = require('./newControllers/middleware/serverResources/encryptor.js');

  var out_super_key = SUPER_KEY;
  var out_admin_key = ADMIN_KEY;

  encryptor.encrypt(SUPER_KEY,function(data){
      SUPER_KEY = data;
        encryptor.encrypt(ADMIN_KEY,function(data2){
            ADMIN_KEY = data2;
        });
  });


module.exports = {
  SUPER_KEY,
  ADMIN_KEY
}
