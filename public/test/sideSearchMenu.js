function toggleInfoSideSearch(ident){
  if(GRAPHIC_FLAG){
      GRAPHIC_FLAG = false;
      $(`#${ident}`).slideToggle('medium',function(){
          GRAPHIC_FLAG = true;
      });
  }
}

function toggleSelectSideSearch(){

  $('#lateralSearcher div.circle').on('click',function(){
      var comp = $('#lateralSearcher div.circle-selected').children();
        if(comp.length==0){

          $(this).addClass('circle-selected');
          return;
        }
        $('#lateralSearcher div.circle-selected').removeClass('circle-selected');
        $(this).addClass('circle-selected');

  });
}

toggleSelectSideSearch();
