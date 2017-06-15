var multer = require('multer');
var fs = require('fs');
var PRODUCTS_ADDRESS = './public/assets/img/products/';
var PUBLIC_ADDRESS = 'assets/img/products/';
var errorHandler = require('../error/errorHandler.js');
var product_sub = '';

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, PRODUCTS_ADDRESS);
  },
  filename: function (req, file, callback) {

    callback(null, file.originalname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage}).any();

var createPicture = function(req,res,next){

  //var imagePath = PUBLIC_ADDRESS + req.files[0].filename;

  res.status(200).send({message:req.files[0].filename});
  next();
}

var deletePicture = function(req,res,next){
    var data = req.body.path;

    fs.stat(PRODUCTS_ADDRESS + data,function(err,stats){
        if(err){
            errorHandler.handle(err);
        }

        fs.unlink(PRODUCTS_ADDRESS + data,function(err){
          if(err){
              errorHandler.handle(err);
          }
            console.log('file removed sucessfully');
        });
    });
}

module.exports = {
  createPicture,
  deletePicture,
  upload
}
