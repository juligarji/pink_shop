
var CartGraphics = {

  paintMarker : function(ammount,identifier){

    /*
    var element = `
      <span class="badge">${ammount}</span>
    `;
    $(identifier).append(element);
    console.log(ammount);
  }*/
  var element = `[${ammount}] `;
  $(identifier).text(element);

  }
}
