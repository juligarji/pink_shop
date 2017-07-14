
var CREATE_TAX = '/admin/createtax';
var DELETE_TAX = '/admin/deletetax';

var CREATE_BRAND = '/admin/createbrand';
var DELETE_BRAND = '/admin/deletebrand';


// _Funciones PROPIAS
// sobre escribir en cada tipo de dato
function failHandler(msg){
  Dialogs.failMessage(msg);
}

function createBrand(ev){
  ev.preventDefault();
  var newData = {
    name:$('#formBrands input[name="name"]').val(),
    discount:$('#formBrands input[name="discount"]').val(),
    description:$('#formBrands textArea[name="description"]').val(),
  }

  Protection.ensureFill(newData,function(){

      DB.currentCall(newData,CREATE_BRAND,function(data){
          console.log(data);
          Dialogs.sucessMessage(data.message);
          Graphics.createNewBrand(data.data);
      },failHandler);

  },failHandler);
}

function deleteBrand(id){

  var newData = {
    idBrand:id
  }

  Dialogs.confirmBox('Esta seguro de eliminar ?',function(){
    DB.currentCall(newData,DELETE_BRAND,function(){
        Graphics.deleteBrand(id);
    },failHandler);
  },
  function(){

  });
}

function createTax(ev){
  ev.preventDefault();
  var newData = {
    name:$('#formTaxes input[name="name"]').val(),
    value:$('#formTaxes input[name="value"]').val()
  }

  Protection.ensureFill(newData,function(){

      DB.currentCall(newData,CREATE_TAX,function(data){
          Dialogs.sucessMessage(data.message);
          Graphics.createNewTax(data.data);
      },failHandler);

  },failHandler);

}

function deleteTax(id){

  var newData = {
    idTax:id
  }

  Dialogs.confirmBox('Esta seguro de eliminar ?',function(){
    DB.currentCall(newData,DELETE_TAX,function(){
        Graphics.deleteTax(id);
    },failHandler);
  },
  function(){

  });
}
