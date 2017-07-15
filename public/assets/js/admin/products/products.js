
var GET_ATTRIBUTES = '/admin/products-getattributes';
var NEW_PICTURE = '/admin/newpicture';
var DELETE_PICTURE = '/admin/deletepicture';
var CREATE_PRODUCT = '/admin/createproduct';
var EDIT_SINGLE_PRODUCT = '/admin/products-editsingle';
var DELETE_PRODUCT = '/admin/deleteproduct';
var DELETE__MULTIPLE_PRODUCTS = '/admin/deletemultipleproducts';
var GET_EDIT_PRODUCT = '/admin/getEditProduct';
var EDIT_PHOTOS_PRODUCT = '/admin/products-editphotos';


/* Funcciones de inicializacion */
function failHandler(msg){
  Dialogs.failMessage(msg);
}

ProductSearcher.init('#searchForm','.attributeInput',function(dataObj){

      Graphics.fillTableSearch('#fragancesTable tbody',dataObj.data);

},failHandler);

function uploadProduct(ev,newProduct){
  ev.preventDefault();
  var container,address,isLocal,attrContainer;

  if(newProduct){
    container = '#productsForm';
    address = CREATE_PRODUCT;
    attrContainer = "#attributesCreateContainer";
  }else{
      container = '#editProductsForm';
      address = EDIT_SINGLE_PRODUCT;
      attrContainer = "#attributesEditContainer";
  }

  Memory.getLocalPics(newProduct,function(locPics){
    var newData = {
      name : $(`${container} input[name="name"]`).val(),
      reference : $(`${container} input[name="reference"]`).val(),
      brand : $(`${container} select[name="brand"]`).val(),
      tax : $(`${container} select[name="tax"]`).val(),
      realPrice : $(`${container} input[name="realPrice"]`).val(),
      price : $(`${container} input[name="price"]`).val(),
      priceWholesale : $(`${container} input[name="priceWholesale"]`).val(),
      discountGeneral : $(`${container} input[name="discountGeneral"]`).val(),
      discountWholesale : $(`${container} input[name="discountWholesale"]`).val(),
      minForWholesale : $(`${container} input[name="minForWholesale"]`).val(),
      description : $(`${container} input[name="description"]`).val(),
      ammount : $(`${container} input[name="ammount"]`).val(),
      //photos : locPics,
      kind:$(`${container} select[name="kind"]`).val(),
    }

    if(newData.realPrice==""){
        newData.realPrice = -1;
    }
    if(newData.realPrice==""){
        newData.realPrice = -1;
    }


    /*if(newData.photos.length==0){
      failHandler('Por favor seleccione alguna foto');
      return;
    }*/


    Protection.ensureFill(newData,function(){
      if($(attrContainer).children().length==0){
        Dialogs.failMessage('Porfavor seleccione todos los atributos');
        return;
      }
      var attributesArray =[];

      var max = $(`${container} .attributeSelector`).length;
      for(var i=0;i<max;i++){
        if($(`${container} .attributeSelector`).eq(i).val()==null){
          failHandler(`Porfavor seleccione todos los atributos`);
          return;
        }
        attributesArray.push($(`${container} .attributeSelector`).eq(i).val());
      }
      newData.attributes = attributesArray;

      if(!newProduct){
        newData = {
          data : newData,
          meta : Memory.getEditId()
        }
        if(newData.meta==undefined){
          console.log('Producto no ha sido asignado a memoria');
          return;
        }
      }

      DB.currentCall(newData,address,function(data){
          console.log('llego :');
          console.log(data.data);

          Memory.removeAllLocalPics(newProduct,function(){
              Dialogs.sucessMessage(data.message);
              if(newProduct){
                  Graphics.addRow(`#fragancesTable tbody`,data.data);
              }else{
                    Graphics.editRow(`#fragancesTable tbody`,data.data);
              }
          });


          //Graphics.fillAttributes(data.data);
      },failHandler);


    },failHandler);
  });
}


function loadEditProduct(id){

  $('#editTab').removeClass('disabled');
    $('#editTab a').addClass('active');
    $('#editTab a').click();

    var newData = {
      idProd : id
    }

    DB.currentCall(newData,GET_EDIT_PRODUCT,function(data){
      //  Graphics.deleteRow(id);
      Graphics.fillEditProduct('#editProductsForm',data.data);
      console.log(data);
      getAttributes('#attributesEditContainer','#editProductsForm');

      Graphics.fillEditProductAttributes('#attributesEditContainer',data.data);

      Memory.setLocalPics(false,data.data.photos,function(){
        console.log(data.data.photos);
          Memory.setEditId(data.data._id,function(){
              Memory.getLocalPics(false,function(img){
                  Graphics.fillPhotoModal(img,uploadEditPics,removeEditPic);
              });
          });
      });

      $('html,body').animate({
          scrollTop: 0
      }, 700);
    },failHandler);

}

function deleteProduct(id){

  var newData = {
    idProd:id
  }

  Dialogs.confirmBox('Esta seguro de eliminar ?',function(){
    DB.currentCall(newData,DELETE_PRODUCT,function(){
      //  Graphics.deleteRow(id);
      Graphics.deleteRow('#fragancesTable tbody',id);
    },failHandler);
  },
  function(){

  });
}


function getAttributes(container,dataCont){

    var newData = {
      idKind : $(dataCont + ' select[name="kind"]').val()
    }

    Protection.ensureFill(newData,function(){

        DB.currentCall(newData,GET_ATTRIBUTES,function(data){
            console.log(data);
            Graphics.fillAttributes(container,data.data);
        },failHandler);

    },failHandler);

}

function getAttributesToSearch(container,dataCont){


    var newData = {
      idKind : $(dataCont + ' select[name="kind"]').val()
    }
    if(newData.idKind==-1){
      return;
    }
    Protection.ensureFill(newData,function(){

        DB.currentCall(newData,GET_ATTRIBUTES,function(data){
            Graphics.fillSearchForm(container,data.data);
        },failHandler);

    },failHandler);
}


/* modals */
function uploadLocalPics(type){

    DB.pictureCall('localPhotoFile',type,NEW_PICTURE,function(data){
      console.log('upload local pic');
      console.log(data);
      Memory.addLocalPic(true,data,function(){
        Memory.getLocalPics(true,function(locPics){
          Graphics.fillPhotoModal(locPics,uploadLocalPics,removeLocalPic);
        });
      });
    },failHandler,'#photoModalAction');
}

function removeLocalPic(path){

  var newData = {
      path : path
  }
  Dialogs.confirmBox('Realmente Desea Eliminar la Imagen ?',function(){
    DB.currentCall(newData,DELETE_PICTURE,function(data){
      Memory.removeLocalPic(true,path,function(){
        Memory.getLocalPics(true,function(locPics){
          Graphics.fillPhotoModal(locPics,uploadLocalPics,removeLocalPic);
        });
      });

    },failHandler);
  },function(){

  });
}


function loadLocalModalPhotos(){
    Memory.getLocalPics(true,function(locPics){
      Graphics.fillPhotoModal(locPics,uploadLocalPics,removeLocalPic);
      $('#photoModal').modal('open');
    });
}

// MODAL DE EDICION DE DATOS


function removeEditPic(path){

    var newData = {
        path : path
    }

    DB.currentCall(newData,DELETE_PICTURE,function(data){
      //Memory.removeLocalPic(path);

      Memory.removeLocalPic(false,path,function(){
          Memory.getLocalPics(false,function(img){
            newData = {
              idProd : Memory.getEditId(),
              photos : img
            }

            DB.currentCall(newData,EDIT_PHOTOS_PRODUCT,function(data){
                Memory.getLocalPics(false,function(editImg){
                    Graphics.fillPhotoModal(editImg,uploadEditPics,removeEditPic);
                });

            },failHandler);

          });
      });

    },failHandler);
}



function uploadEditPics(){

    DB.pictureCall('localPhotoFile',1,NEW_PICTURE,function(data){

        console.log(data);
      Memory.addLocalPic(false,data,function(){
          Memory.getLocalPics(false,function(img){
                var newData = {
                  idProd : Memory.getEditId(),
                  photos : img
                }

                DB.currentCall(newData,EDIT_PHOTOS_PRODUCT,function(data){
                    Memory.getLocalPics(false,function(editImg){
                        Graphics.fillPhotoModal(editImg,uploadEditPics,removeEditPic);
                    });
                },failHandler);
          });
      });

    },failHandler,'#photoModalAction');

}

function loadEditModalPhotos(){
  Memory.getLocalPics(false,function(img){
    Graphics.fillPhotoModal(img,uploadEditPics,removeEditPic);
    $('#photoModal').modal('open');
  });

}


/* busqueda */



/* borrado multiple */
function selectAll(component){

  if($(component).is(':checked')){
      $('#fragancesTable tbody .eraseCheck').prop('checked', true);
      return;
  }
    $('#fragancesTable tbody .eraseCheck').prop('checked', false);
}


function deleteMultiple(){

  var data = $('#fragancesTable tbody .eraseCheck:checked');

  if(data.length==0){
    Dialogs.failMessage('Seleccione Algunos Productos');
    return;
  }

  Dialogs.confirmBox(`Seguro Desea Eliminar estos ${data.length} Productos ?`,function(){

          var arrayId = [];
          for(var i=0;i<data.length;i++){
              arrayId.push(data.eq(i).attr('id'));
          };

          var newData = {
            arrayIdProd : arrayId
          }
          DB.currentCall(newData,DELETE__MULTIPLE_PRODUCTS,function(){
            //  Graphics.deleteRow(id);
              arrayId.forEach(function(element){
                Graphics.deleteRow('#fragancesTable tbody',element);
              });

          },failHandler);
        },function(){

          });
  }
