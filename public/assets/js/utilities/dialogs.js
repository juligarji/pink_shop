
var Dialogs = {
  sucessMessage : function(msg){
    var element = `
    <div class = "alertMess" style = "position:relative">
      <h3>${msg}</h3>
    </div>
    `;
      alertify.success(element).closeLogOnClick(true);
  },
  failMessage : function(msg){
    var element = `
    <div class = "alertMess" style = "position:relative">
      <h3>${msg}</h3>
    </div>
    `;
      alertify.error(element).closeLogOnClick(true);
  },
  confirmBox : function(msg,callback,failback){
      alertify.confirm(msg,
      function(){
        callback();
      },
      function(){
        failback();
      });
  },
  cartMessage : function(cartAdd){
    var element = `
      <div class = "alertMess">
      <div class="col s12 m2">
        <a href = "${cartAdd}" class = "waves-effect waves-light btn">
          Abrir Carrito de Compras
        </a>
      </div>
      </div>
    `;
      alertify.log(element);
  }
}
