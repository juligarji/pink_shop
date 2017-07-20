var PUBLIC_ADDRESS = 'assets/img/products/';
var VIEW_DETAILS = '/detalles/';


var Graphics = {

  addElementToContainer : function(container,data){

    /* <img class = "responsive-img col s12" src="${PUBLIC_ADDRESS} ${mainPhoto}">   */
    var element = `

    <div class = "row cartElement animated fadeInDown" value = "${data._id}">
      <div class = "col l12">

        <div class = "col l2 center elementCont" >
          <a href="#" target='_blank'>
            <div style = "overflow:hidden">
              <img src="assets/img/page/test_product.jpgn" width="75%" style = "margin:-20% 0px -20% 0px;">
            </div>
          </a>
        </div>

        <div class = "col l10 valign-wrapper elementCont" >
          <div class = "col l2" >
              <p>${data.name}</p>
        </div>

          <div class = "col l3" >
            <div class = "col l6 elementCont">
              <p>${data.kind}</p>
            </div>
            <div class = "col l6 elementCont center">
              <p>${data.brand}</p>
            </div>
          </div>

          <div class = "col l1 center elementCont amount" style = "padding:0">
            <p class = "amoSelect"><i class="fa fa-plus-square" aria-hidden="true"></i></p>
            <p class = "number">${data.ammount}</p>
            <p class = "amoSelect"><i class="fa fa-minus-square" aria-hidden="true"></i></p>
          </div>

          <div class = "col l2 elementCont center" >
            <span class ="number">${data.price}</span>
            <span class = "discount">(Pendiente de implementar)</span>
          </div>

          <div class = "col l4" >
            <div class = "row valign-wrapper">
              <div class = "col l10 elementCont">
                <p>${data.description}</p>
              </div>
              <div class = "col l2 elementCont">
              <div class = "trash" onclick = "deleteElement('${data._id}')">
                  <i class="fa fa-trash" aria-hidden="true"></i>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    var newComp = $(element);
      $(container).append(newComp);
  },

  deleteComponent : function(container,id){
       $(container).children(`div[value='${id}']`).remove();
  },
  resetContainer : function(container) {
      $(container).empty();
  },

  paintTotals : function(meta){
    $('#subtotalCont').text(meta.subTotalPrice);
    $('#totalCont').text(meta.totalPrice);
    $('#shipmentPrice').text(meta.shipmentPrice);
  }

}
