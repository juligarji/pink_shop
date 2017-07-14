var PUBLIC_ADDRESS = 'assets/img/products/';
var VIEW_DETAILS = '/detalles/';

var Graphics = {

  addElementToContainer : function(data){

    var container = $('#productContainer');

    var rowIndex = container.children().length;
    var mainPhoto = data.photos[0];

    /* <img class = "responsive-img col s12" src="${PUBLIC_ADDRESS} ${mainPhoto}">   */
    var element = `
      <a href = "${VIEW_DETAILS}${data._id}" class = "product">
        <div class = "card center col l4 m4 s6 animated fadeInDown">
          <div class="card-content" style = "background-image:url('../${PUBLIC_ADDRESS}${data.photos[0]}')">
            <div class = "card-info center">
              <span class="card-title">${data.name}</span>
              <p>Mayor: <span>28000</span> </p>
              <p>Detal: <span>${data.price}</span> </p>
            </div>
          </div>
        </div>
      </a>
    `;
    var newComp = $(element);
      container.append(newComp);

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
