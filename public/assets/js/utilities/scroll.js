

var ScrollIssues = {
  FLAG : true,
  ACTIVE : true,
  CURRENT_WIDTH : $(document).width(),

  scrollBig : function(ammount,address,graphicsCall){

    var scrollHeight = $(document).height() - $('footer').innerHeight();
    var scrollPosition = $(window).height() + $(window).scrollTop();

    if ((scrollHeight - scrollPosition) / scrollHeight <= 0) {
        // when scroll to bottom of the page
        if(ScrollIssues.FLAG){
          ScrollIssues.FLAG=false;
          DB.getMoreElements(ammount,address,function(arrayData){

                if(arrayData.data.length==0){
                  ScrollIssues.exitEvent(window);
                  return;
                }
                graphicsCall(arrayData.data,false);
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
            if(arrayData.data.length==0){
              ScrollIssues.exitEvent();
              return;
            }
            graphicsCall(arrayData.data,false);
      });
    }
  },

  initResizeEvent : function(tableContainer,address,graphicsCall){

    ScrollIssues.initScrollState(tableContainer,address,graphicsCall);

    $(window).resize(function(){
      if($(document).width() != ScrollIssues.CURRENT_WIDTH){
        DB.INDEX =0;
        ScrollIssues.initScrollState(tableContainer,address,graphicsCall);
        ScrollIssues.CURRENT_WIDTH = $(document).width();
      }
    });
  },

  scrollCall : function(ammount,address,newData,graphicsCall){
    DB.getMoreElements(ammount,address,function(arrayData){
          //Graphics.fillTable(arrayData);
          //console.log(arrayData,null,'\t');
          if(arrayData.data.length==0){
            ScrollIssues.exitEvent();
            return;
          }
          graphicsCall(arrayData.data,newData);
    });
  },

  initScrollState : function(tableContainer,address,graphicsCall){
    $(window).unbind('scroll');
    $(tableContainer).unbind('scroll');


    if($(document).width()>992){
      //Pantalla grande

      ScrollIssues.scrollCall(6,address,true,graphicsCall);

      $(window).on('scroll',function(){
        ScrollIssues.scrollBig(6,address,graphicsCall);
      });

    }else{
          if($(document).width()>600){
            // Pantalla mediana de tablet
            console.log('Tablet pantalla');

            ScrollIssues.scrollCall(6,address,true,graphicsCall);

            $(tableContainer).on('scroll',function(){
              ScrollIssues.scrollSmall(tableContainer,6,address,graphicsCall);
            });

          }else{
                // Pantalla pequeña celular
                console.log('Celular pantalla');

                ScrollIssues.scrollCall(3,address,true,graphicsCall);

                $(tableContainer).on('scroll',function(){
                  ScrollIssues.scrollSmall(tableContainer,3,address,graphicsCall);
                });
              }
          }
  },
  initScrollClient : function(tableContainer,address,graphicsCall){
    /*$(window).unbind('scroll');
    $(tableContainer).unbind('scroll');*/


    if($(document).width()>992){
      //Pantalla grande

      ScrollIssues.scrollCall(6,address,true,graphicsCall);

      $(window).on('scroll',function(){
        if(ScrollIssues.ACTIVE){
          ScrollIssues.scrollBig(6,address,graphicsCall);
        }
      });

    }else{
          if($(document).width()>600){
            // Pantalla mediana de tablet
            console.log('Tablet pantalla');

            ScrollIssues.scrollCall(6,address,true,graphicsCall);

            $(tableContainer).on('scroll',function(){
              if(ScrollIssues.ACTIVE){
                  ScrollIssues.scrollBig(tableContainer,6,address,graphicsCall);
              }
            });

          }else{
                // Pantalla pequeña celular

                ScrollIssues.scrollCall(6,address,true,graphicsCall);

                $(tableContainer).on('scroll',function(){
                  if(ScrollIssues.ACTIVE){
                    ScrollIssues.scrollBig(tableContainer,6,address,graphicsCall);
                  }
                });
              }
          }
  },
  exitEvent(container){
    ScrollIssues.ACTIVE = false;
    //$(container).unbind('scroll');
  }


}
