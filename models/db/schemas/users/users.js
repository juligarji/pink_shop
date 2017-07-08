var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var usersSc = new Schema({

    email:{type:String,unique:true,lowercase:true},
    permits:{type:Number,required:true},
    displayName:{type:String},
    avatar:{type:String},
    password:{type:String,select:false},
    singupDate:{type:Date,default:Date.now()},
    lastLogin:{type:Date}
});

usersSc.pre('save',function(next){// Encriptar la contraseña ingresada

    var user = this;
    if(!user.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10,function(err,salt){
        if (err) {

          return next(err)};

            bcrypt.hash(user.password,salt,null,function(err,hash){
                if(err){

                  return next(err);}
                    user.password = hash;
                    next();
            });
    });
});

usersSc.methods.gravatar = function(){// REtornar el avatar del usuario ingresado
    if(!this.email) return 'https//gravatar.com/avatar/?s=200&d=retro';
      var md5 = crypto.createHash('md5').update(this.email).digest('hex');
          return "https://gravatar.com/avatar/${md5}?s=200&d=retro";
}


var users = mongoose.model('users',usersSc);

module.exports = users;
