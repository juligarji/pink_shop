
var Dialogs = {
  sucessMessage : function(msg){
    var element = `
    <div class = "alertMess" style = "position:relative">
      <h3>You've clicked OK</h3>
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
