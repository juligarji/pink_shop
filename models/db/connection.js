var mongoose = require('mongoose');

//mongoose.connect('mongodb://menj_test:menj_test@ds157641.mlab.com:57641/menjar_test');
//mongoose.connect('mongodb://test_menjar:test_menjar@ds157571.mlab.com:57571/heroku_qgzwnns0');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

module.exports = db;
