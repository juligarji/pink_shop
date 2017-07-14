
var CREATE_KIND = '/admin/createkind';
var DELETE_KIND = '/admin/deletekind';


// _Funciones PROPIAS
// sobre escribir en cada tipo de dato
function failHandler(msg){
  Dialogs.failMessage(msg);
}

function editKind(name){

}

function deleteKind(id){

  var newData = {
    id:id
  }

  Dialogs.confirmBox('Esta seguro de eliminar ?',function(){
    DB.currentCall(newData,DELETE_KIND,function(){
        Graphics.deleteRow(id);
    },failHandler);
  },
  function(){

  });
}

function uploadKind(ev){
  ev.preventDefault();

  var newData = {
    name : $("input[name='name']").val(),
    associatedView:$('select[name="view"]').val(),
    discount : $("input[name='discount']").val(),
    description : $("textArea[name='description']").val()
  }

  Protection.ensureFill(newData,function(){

      DB.currentCall(newData,CREATE_KIND,function(data){
          console.log(data);
          Dialogs.sucessMessage(data.message);
          newData.id = data.data;
          Graphics.createNewRow(newData,editKind,deleteKind);
      },failHandler);

  },failHandler);


}
