
var Cart = (function(){

  var NAME='cart';
  var ShoppingDB = new PouchDB('ShoppingCart');
  var INFO_CALLER = '//ipapi.co/json/';

  ShoppingDB.info(function(err,res){
      if(err){
        console.log(err);
        return;
      }

      if(res.doc_count==0){
        ShoppingDB.put({
          _id:NAME,
          products:[]
        },function(err,img){
          if(err){
            console.log(err);
            return;
          }
        });
      }
  });
  return  {
    getCart : function(callback){
        //cambiar por base de datos en local
        ShoppingDB.get(NAME,function(err,car){
            if(err){
              console.log(err);
              return;
            }
            callback(car.products);
        });
      },
      addToCart : function(idProd,ammount,callback){
          Cart.existsInCart(idProd,function(index,car){

               $.getJSON(INFO_CALLER)
                  .done(function(data){
                    if(index==-1){
                      var newObj = {
                        idProd : idProd,
                        ammount : ammount,
                        created_at : Date.now(),
                        modified_at : Date.now(),
                        meta : data
                      }
                      car.products.push(newObj);
                    }else{
                        car.products[index].ammount = ammount;
                        car.products[index].modified_at = Date.now();
                        car.products[index].meta = data;
                    }
                    ShoppingDB.put(car);
                    callback();
                    return;
                  })
                  .fail(function(err){
                      console.log(err);

                      if(index==-1){
                        var newObj = {
                          idProd : idProd,
                          ammount : ammount,
                          created_at : Date.now(),
                          modified_at : Date.now(),
                        }
                        car.products.push(newObj);
                      }else{
                          car.products[index].ammount = ammount;
                          car.products[index].modified_at = Date.now();
                      }
                      ShoppingDB.put(car);
                      callback();
                      return;
                  })
          });
      },
      existsInCart : function(idProd,callback){
        ShoppingDB.get(NAME,function(err,car){
            if(err){
              console.log(err);
              return;
            }

            var max = car.products.length;
            for(var i=0;i<max;i++){

              if(car.products[i].idProd==idProd){
                callback(i,car);
                return;
              }
            }
            callback(-1,car);
        });

      },
      deleteFromCart : function(idProd,callback){

          Cart.existsInCart(idProd,function(index,car){
              if(index!=-1){
                car.products.splice(index,1);
                ShoppingDB.put(car);
                callback();
              }
          });
      },
      getLength : function(callback){
        ShoppingDB.get(NAME,function(err,car){
            if(err){
              console.log(err);
              return;
            }
            callback(car.products.length);
        })
      },
      deleteAllCart : function(callback){
        ShoppingDB.get(NAME,function(err,car){
            if(err){
              console.log(err);
              return;
            }
            car.products = [];
            ShoppingDB.put(car);
            callback();
        });
      },
      getSingleFromCart(idProd,callback){
        Cart.existsInCart(idProd,function(index,car){
            if(index!=-1){
              callback(car.products[index]);
            }else{
              callback(undefined);
            }
        });
      }
  }

})();
