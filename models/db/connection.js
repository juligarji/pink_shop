var mongoose = require('mongoose');
//pruebas locales
//mongoose.connect('mongodb://localhost/test_final');
mongoose.connect('mongodb://pinkStoreAdmin:pKsTRdb361017._@ds111922.mlab.com:11922/heroku_cm4twdr9');

//pruebas remotas

//mongoose.connect('mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASS +'@ds111922.mlab.com:11922/heroku_cm4twdr9');

var db = mongoose.connection;

module.exports = db;
