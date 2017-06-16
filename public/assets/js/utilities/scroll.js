var FLAG = true;

function scrollBig(ammount,address){

  var scrollHeight = $(document).height() - $('footer').innerHeight();
  var scrollPosition = $(window).height() + $(window).scrollTop();

  if ((scrollHeight - scrollPosition) / scrollHeight <= 0) {
      // when scroll to bottom of the page
      if(FLAG){
        FLAG=false;
        DB.getMoreElements(ammount,address,function(arrayData){
              Graphics.loadToTable(arrayData);
              FLAG = true;
        });
      }
  }
}

function scrollSmall(identifier,ammount,address){

  var $width = $(identifier).outerWidth();
  var $scrollWidth = $(identifier)[0].scrollWidth;
  var $scrollLeft = $(identifier).scrollLeft();

  if (Math.floor($scrollWidth - $width) == $scrollLeft){
    DB.getMoreElements(ammount,address,function(arrayData){
          Graphics.loadToTable(arrayData);
    });
  }
}

function initDataScroll(address,tableContainer){

  if($(document).width()>992){
    //Pantalla grande
    console.log('Gran pantalla');
    DB.getMoreElements(6,address,function(arrayData){
          Graphics.fillTable(arrayData);
    });
    $(window).on('scroll',function(){
      scrollBig(6);
    });

  }else{
        if($(document).width()>600){
          // Pantalla mediana de tablet
          console.log('Tablet pantalla');

          DB.getMoreElements(6,address,function(arrayData){
                Graphics.fillTable(arrayData);
          });
          $(tableContainer).on('scroll',function(){
            scrollSmall(6);
          });

        }else{
              // Pantalla pequeña celular
              console.log('Celular pantalla');

              DB.getMoreElements(3,address,function(arrayData){
                    Graphics.fillTable(arrayData);
              });
              $(tableContainer).on('scroll',function(){
                scrollSmall(3);
              });

            }
        }
}
