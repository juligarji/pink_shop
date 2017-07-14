var PUBLIC_ADDRESS = 'assets/img/products/';
var VIEW_DETAILS = '/detalles/';

var Graphics = {

  addElementToContainer : function(container,data){

    /* <img class = "responsive-img col s12" src="${PUBLIC_ADDRESS} ${mainPhoto}">   */
    var element = `

    <div class = "row cartElement" value = "${data._id}">
      <div class = "col l12">
        <div class = "col l2 center" >
          <div style = "overflow:hidden">
            <img src="${PUBLIC_ADDRESS}${data.photos[0]}" width="60%" style = "margin:-20% 0px -20% 0px;">
          </div>
        </div>
        <div class = "col l10 valign-wrapper" >
          <div class = "col l3" >
              <p>${data.name}</p>
        </div>

          <div class = "col l3" >
            <div class = "col l6">
              <p>${data.kind}</p>
            </div>
            <div class = "col l6">
              <p>${data.brand}</p>
            </div>
          </div>
          <div class = "col l1 center" >
            <p class = "ammoSelect">+</p>
            <p class = "ammo">${data.ammount}</p>
            <p class = "ammoSelect">-</p>
          </div>
          <div class = "col l1" >
            <p>${data.price}</p>
          </div>
          <div class = "col l4" >
            <div class = "row valign-wrapper">
              <div class = "col l10">
                <p>${data.description}</p>
              </div>
              <div class = "col l2">
              <div onclick = "deleteElement('${data._id}')">
                  <i class="material-icons">&#xE872;</i>
              </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    `;

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