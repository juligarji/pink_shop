var PUBLIC_ADDRESS = 'assets/img/products/';
var VIEW_DETAILS = '/detalles/';

var Graphics = {

  addElementToContainer : function(data){

    var container = $('#productContainer');

    var rowIndex = container.children().length;
    var mainPhoto = data.photos[0];

    /* <img class = "responsive-img col s12" src="${PUBLIC_ADDRESS} ${mainPhoto}">   */
    var element = `
    <div value = "${data.name}" class = "col l4 m4 s6 product">
      <a href = '${VIEW_DETAILS}${data.name}'>
        <img class = "responsive-img col s12" src="http://via.placeholder.com/150x600">
        <div class = "divider"></div>
        <div class = " center col l12 m12 s12 grey">
            <span>${data.name}</span>
            <p>${data.price}</p>
        </div>
      </a>
    </div>
    `;
        container.append(element);

  },

  loadToContainer : function(arrayData,newReg){
      if(!Array.isArray(arrayData)){return;}
      if(arrayData==[]){return;}

      if(newReg){$('#productContainer').empty();}

      for(var i=0;i<arrayData.length;i++){
        Graphics.addElementToContainer(arrayData[i]);
      }
  },

  locateRow : function(name){
      var output = $('#fragancesTable tbody').children(`tr[value='${name}']`);
      return output;
  }

}
