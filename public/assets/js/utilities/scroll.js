

var ScrollIssues = {
  FLAG : true,
  CURRENT_WIDTH : $(document).width(),

  scrollBig : function(ammount,address,graphicsCall){

    var scrollHeight = $(document).height() - $('footer').innerHeight();
    var scrollPosition = $(window).height() + $(window).scrollTop();

    if ((scrollHeight - scrollPosition) / scrollHeight <= 0) {
        // when scroll to bottom of the page
        if(ScrollIssues.FLAG){
          ScrollIssues.FLAG=false;
          DB.getMoreElements(ammount,address,function(arrayData){
                graphicsCall(arrayData,false);
                ScrollIssues.FLAG = true;
          });
        }
    }
  },

 scrollSmall : function(identifier,ammount,address,graphicsCall){

    var $width = $(identifier).outerWidth();
    var $scrollWidth = $(identifier)[0].scrollWidth;
    var $scrollLeft = $(identifier).scrollLeft();

    if (Math.floor($scrollWidth - $width) == $scrollLeft){
      DB.getMoreElements(ammount,address,function(arrayData){
            graphicsCall(arrayData,false);
      });
    }
  },

 listenChanges : function(tableContainer,address,graphicsCall){
    $(window).unbind('scroll');
    $(tableContainer).unbind('scroll');

    if($(document).width()>992){
      //Pantalla grande
      console.log('Gran pantalla');
      DB.getMoreElements(6,address,function(arrayData){
            //Graphics.fillTable(arrayData);
            graphicsCall(arrayData,true);
      });

      $(window).on('scroll',function(){
        ScrollIssues.scrollBig(6,address,graphicsCall);
      });

    }else{
          if($(document).width()>600){
            // Pantalla mediana de tablet
            console.log('Tablet pantalla');

            DB.getMoreElements(6,address,function(arrayData){
                  //Graphics.fillTable(arrayData);
                  graphicsCall(arrayData,true);
            });
            $(tableContainer).on('scroll',function(){
              ScrollIssues.scrollSmall(tableContainer,6,address,graphicsCall);
            });

          }else{
                // Pantalla pequeña celular
                console.log('Celular pantalla');

                DB.getMoreElements(3,address,function(arrayData){
                      //Graphics.fillTable(arrayData);
                      graphicsCall(arrayData,true);
                });
                $(tableContainer).on('scroll',function(){
                  ScrollIssues.scrollSmall(tableContainer,3,address,graphicsCall);
                });

              }
          }
  },

  initDataScroll : function(tableContainer,address,graphicsCall){

    ScrollIssues.listenChanges(tableContainer,address,graphicsCall);

    $(window).resize(function(){
      if($(document).width() != ScrollIssues.CURRENT_WIDTH){
        DB.INDEX =0;
        ScrollIssues.listenChanges(tableContainer,address,graphicsCall);
        ScrollIssues.CURRENT_WIDTH = $(document).width();
      }
    });
  }

}
