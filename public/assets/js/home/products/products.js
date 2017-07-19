var GET_PRODUCTS = '/getproductsqueried';
var VIEW_DETAILS = '/detalles/';
var AMMOUNT_CALL = 6;
var KIND = $('#INIT').attr('value');


$(document).ready(function(){


  var meta = {
    kind : KIND,
    address : GET_PRODUCTS
  }
/*
  ScrollIssues.initScrollClient('#productContainer',meta,Graphics.loadToContainer);
*/
/* inicializacion de componentes del layout */

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
          $('#centralCont').addClass('push-l3');
      } else {
          $('#menuContainer').css('position','relative');
          $('#menuContainer').css('top','auto');
          $('#centralCont').removeClass('push-l3');
      }
    }

  });

}

var GRAPHIC_FLAG = true;
function toggleInfoSideSearch(ident){
  if(GRAPHIC_FLAG){
      GRAPHIC_FLAG = false;
      $(`#${ident}`).slideToggle('medium',function(){
          GRAPHIC_FLAG = true;
      });
  }
}

function toggleSelectSideSearch(){

  $('#menuContainer div.circle').on('click',function(){
      var comp = $('#menuContainer div.circle-selected').children();
        if(comp.length==0){

          $(this).addClass('circle-selected');
          return;
        }
        $('#menuContainer div.circle-selected').removeClass('circle-selected');
        $(this).addClass('circle-selected');

  });
}


/* ejecutar funciones */
/*
$('#productContainer').change(function(){
      console.log('CAmbio');
      initMasonry();
});

initMasonry();*/

$(document).keypress(function(e) {
    if(e.which == 13) {
        //alert('You pressed enter!');
        $('#productContainer').children().removeClass('hvr-rotate animated fadeInUp');
        $('#productContainer').masonry('remove',$('#productContainer').children());
        console.log($('#productContainer').children());
        $('#productContainer').masonry('layout');
        var eq = $('<div class="grid-item grid-item--placeHolder"></div>');

        $('#productContainer').append(eq);
        $('#productContainer').masonry('appended',$(eq));

    }
});
$('#productContainer').masonry({
   itemSelector: '.grid-item',
   gutter:10,
   fitWidth: true,
   columnWidth: 240
});

ScrollIssues.initScrollIssues(AMMOUNT_CALL,'#productContainer',Graphics.loadToContainer,failHandler);
initAxuliars();
toggleSelectSideSearch();


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
        search : Protection.formatCorrectText($(`${containerForm} input[name="search"]`).val()),
        orderType : $(`${containerForm} div.circle-selected`).attr('value')
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
