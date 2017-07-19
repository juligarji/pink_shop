var PUBLIC_ADDRESS = 'assets/img/products/';
var VIEW_DETAILS = '/detalles/';
var GRAPHIC_TOP_LAYOUT  = true;
var Graphics = {

  addElementToContainer : function(index,arrayData){

    if(arrayData[index]==undefined){
      return;
    }
    var data = arrayData[index];

    var container = $('#productContainer');

    var rowIndex = container.children().length;
    var mainPhoto = data.photos[0];/* Cambiar por la fotos reales*/
    var guardarClases = "hvr-rotate animated fadeInUp";
    /* <img class = "responsive-img col s12" src="${PUBLIC_ADDRESS} ${mainPhoto}">   */
    var element = `
      <div class="grid-item z-depth-3 animated fadeInUp">
        <a href="${VIEW_DETAILS}${data._id}">
          <img src="../assets/img/page/test_product.jpg" width="100%" height="70%" alt ="La Imagen no pudo cargarse :(">
          <div class="productInfo">
              <div class="col l12 title center">
                  ${data.name}
              </div>
              <div class="col l6 center z-depth-1 wholesaleInfo">
                    <div class="subtitle">
                        Mayor
                    </div>
                    <div class="number">
                        <span class = "numberSign">$</span>${data.priceWholesale}
                    </div>
              </div>
              <div class="col l6 center z-depth-1 detailInfo">
                <div class="subtitle">
                      Detal
                </div>
                <div class="number">
                    <span class = "numberSign">$</span>${data.price}
                </div>
              </div>
              <div class="col l12 center shoppingButton">
                <span>Comprar   <i class="fa fa-cart-plus" aria-hidden="true"></i> </span>
              </div>
          </div>
        </a>
      </div>
    `;
    var newComp = $(element);

    if(index==1 && GRAPHIC_TOP_LAYOUT){

        var eq = $('<div class="grid-item grid-item--placeHolder"></div>');
        container.append(eq);
        container.masonry('appended',$(eq));
        GRAPHIC_TOP_LAYOUT = false;

    }

    $('#productContainer').append(newComp);
    container.masonry('appended',newComp);


    setTimeout(function(){
          Graphics.addElementToContainer(index+1,arrayData);
    },100);
  },

  loadToContainer : function(arrayData,newReg){
      if(!Array.isArray(arrayData)){return;}
      if(arrayData==[]){return;}

      if(newReg){Graphics.emptyMasonryContainer($('#productContainer'));}

      //for(var i=0;i<arrayData.length;i++){
        Graphics.addElementToContainer(0,arrayData);
      //}
  },

  locateRow : function(name){
      var output = $('#fragancesTable tbody').children(`tr[value='${name}']`);
      return output;
  },
  emptyMasonryContainer : function(container){

      if(container.children().length==0){
        return;
      }
      $('footer').css('visibility','hiden');
      container.children().removeClass('hvr-rotate animated fadeInUp');
      container.masonry('remove',$('#productContainer').children());
      container.masonry('layout');
      GRAPHIC_TOP_LAYOUT = true;
  },

 wait : function(ms, cb) {
  var waitDateOne = new Date();
  while ((new Date()) - waitDateOne <= ms) {
    //Nothing
  }
  if (cb) {
    eval(cb);
  }
}

}
