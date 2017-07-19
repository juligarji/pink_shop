
var CartGraphics = {

  paintMarker : function(ammount,identifier){

    /*
    var element = `
      <span class="badge">${ammount}</span>
    `;
    $(identifier).append(element);
    console.log(ammount);
  }*/
  var element;
  element = ammount;
  if(parseFloat(ammount)%1!=0){
      element = parseFloat(ammount).toFixed(2);
  }

  $(identifier).text(element.toString());
},

paintTotalElements : function(){
  Cart.getLength(function(leng){
      CartGraphics.paintMarker(leng,'#totalCartElements');
  });
}

}
