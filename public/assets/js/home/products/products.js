var GET_PRODUCTS = '/getproductsqueried';
var VIEW_DETAILS = '/detalles/';
var AMMOUNT_CALL = 6;
var KIND = $('#INIT').attr('value');

$(document).ready(function(){


  var meta = {
    kind : KIND,
    address : GET_PRODUCTS
  }

  //ScrollIssues.initScrollClient('#productContainer',meta,Graphics.loadToContainer);



/* iniciacion de componentes propios */


});
function failHandler(msg){
  Dialogs.failMessage(msg);
}

function initAxuliars(){
  var distanceBackToTop = $('#menuContainer').offset().top;

  $(window).scroll(function() {
    backToTop();//obligatorio

    if($('#productContainer').children().length>3){

      if ( $(this).scrollTop() >= distanceBackToTop ) {
          $('#menuContainer').css('top',0);
          $('#menuContainer').css('position','fixed');
          $('#productContainer').addClass('push-l2');
      } else {
          $('#menuContainer').css('position','relative');
          $('#menuContainer').css('top','auto');
          $('#productContainer').removeClass('push-l2');
      }
    }

  });

}


ScrollIssues.initScrollIssues(AMMOUNT_CALL,'#productContainer',Graphics.loadToContainer,failHandler);
initAxuliars();


var meta = {
  kind:KIND,
  address : GET_PRODUCTS,
}

ScrollIssues.initScrollDownOnly(meta,Graphics.loadToContainer,failHandler);


function searchProductClient(ev,containerForm,attributesSelector){
  ev.preventDefault();

    var meta = {
      kind:KIND,
      address : GET_PRODUCTS,
      query : {
        search : $(`${containerForm} input[type="search"]`).val(),
        orderType : $(`${containerForm} select[name="orderType"]`).val()
      }
    }

    var attributesArray =[];

      var iter = $(`${attributesSelector}:checked`);

    for(var i=0;i<iter.length;i++){
      attributesArray.push(iter.eq(i).attr('id'));
    }

    meta.attributes = attributesArray;

    ScrollIssues.restartScrollDownOnly(meta,Graphics.loadToContainer,failHandler);
    initAxuliars();


}

/* Inicializar */
$('#productSearchForm').on('submit',function(ev){
    searchProductClient(ev,'#productSearchForm','.attributeInputSearcher');
});
