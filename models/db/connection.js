var mongoose = require('mongoose');

//mongoose.connect('mongodb://menj_test:menj_test@ds157641.mlab.com:57641/menjar_test');
//mongoose.connect('mongodb://test_menjar:test_menjar@ds157571.mlab.com:57571/heroku_qgzwnns0');
//mongoose.connect('mongodb://localhost/test');

mongoose.connect('mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASS +'@ds111922.mlab.com:11922/heroku_cm4twdr9');
mongodb://<dbuser>:<dbpassword>@ds111922.mlab.com:11922/heroku_cm4twdr9
var db = mongoose.connection;

module.exports = db;
