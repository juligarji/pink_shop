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

        /*$('#square').css('width','100px');
        $('#square').css('height','100px');
        $('#square').css('background','red');
        $('#square').css('margin-top','80%');
        $('#square').css('margin-left','auto');*/


/*
<div value = "${data.name}" class="col l4 m6 s12 product">
  <a href = "${VIEW_DETAILS}${data.name}">
    <div class = "card large center">
      <div class="card-content">
        <img src="assets/img/page/test_product.jpg">
            <span class="card-title">${data.name}</span>

        <p>Mayor: <span>28000</span> </p>
            <p>Detal: <span>${data.price}</span> </p>
      </div>
    </div>
  </a>
</div>


<div class="col l4" style = "height:500px;border:solid black;background-image:'assets/img/page/test_product.jpg'">
    <img src = "http://via.placeholder.com/150x600">
    <span> ${data.name}</span>
</div>

<div id = "square" class = "center" style = "margin-top:90%">
  <p class = "white center-align"> Por Mayor: <span class = "white"> ${data.name}</span></p>
</div>

*/
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
