var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/test_monica');


//mongoose.connect('mongodb://pinkStoreAdmin:pinkStoreAdmin@ds111922.mlab.com:11');


mongoose.connect('mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASS +'@ds111922.mlab.com:11922/heroku_cm4twdr9');

var db = mongoose.connection;

module.exports = db;
