
var Dialogs = {
  sucessMessage : function(msg){
    var element = `
    <div class = "alertMess" style = "position:relative">
      <h3>${msg}</h3>
    </div>
    `;

    /*swal(
`Good job!`,
`${msg}`,
'success'
);*/

swal(
  'Muchas Gracias',
  `${msg}`,
  'success'
)

      //alertify.success(element).closeLogOnClick(true);
  },
  failMessage : function(msg){
    var element = `
    <div class = "alertMess" style = "position:relative">
      <h3>${msg}</h3>
    </div>
    `;

    swal(
`Oops`,
`${msg}`,
'error'
);

      //alertify.error(element).closeLogOnClick(true);
  },
  confirmBox : function(msg,callback,failback){
    /*  alertify.confirm(msg,
      function(){
        callback();
      },
      function(){
        failback();
      });*/

      swal({
  title: '',
  text: `${msg}`,
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, borralos!',
  cancelButtonText: 'Cancelar'
}).then(function () {
  callback();
})

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
    /*
      alertify.log(element);*/
      swal(
  `Good job!`,
  `${cartAdd}`,
  'success'
  );
},
failAlert : function(title,msg){

  swal(
`${title}`,
`${msg}`,
'error'
  )
}
}
