

var ScrollIssues = (function(){

    var SCROLL_FLAG = true;
    var SCROLL_ACTIVE = true;
    var CURRENT_WIDTH = $(document).width();
    var SCROLL_CONTAINER = null;
    var scroll_graphicCall = null;
    var scroll_failback = null;
    var scroll_ammount_by_call = null;
    var scroll_isNew = false;

  return{
      initScrollIssues : function(ammount,cont,graphic,failback){
          SCROLL_CONTAINER = cont;
          scroll_graphicCall = graphic;
          scroll_failback = failback;
          scroll_ammount_by_call = ammount;
      },

      scrollBig : function(ammount,address,graphicsCall){

        var scrollHeight = $(document).height() - $('footer').innerHeight();
        var scrollPosition = $(window).height() + $(window).scrollTop();

        if ((scrollHeight - scrollPosition) / scrollHeight <= 0) {
            // when scroll to bottom of the page
            if(ScrollIssues.SCROLL_FLAG){
              ScrollIssues.SCROLL_FLAG=false;
              DB.getMoreElements(ammount,address,function(arrayData){

                    if(arrayData.data.length==0){
                      ScrollIssues.exitEvent(window);
                      alert('vacio');
                      return;
                    }
                    graphicsCall(arrayData.data,false);
                    ScrollIssues.SCROLL_FLAG = true;
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

      scrollCall : function(ammount,newData,isNew){

          if(SCROLL_FLAG){

            SCROLL_FLAG = false;
            scroll_isNew = isNew;
            if(isNew){
              DB.restartGetMoreCall();
            }
            DB.getMoreElements(ammount,newData,function(arrayData){
                  //Graphics.fillTable(arrayData);
                  //console.log(arrayData,null,'\t');
                  if(arrayData.data.length==0){
                    ScrollIssues.exitEvent();
                    return;
                  }

                  scroll_graphicCall(arrayData.data,scroll_isNew);
            },scroll_failback);
          }
          SCROLL_FLAG = true;
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
            if(ScrollIssues.SCROLL_FLAG){
              ScrollIssues.scrollBig(6,address,graphicsCall);
            }
          });

        }else{
              if($(document).width()>600){
                // Pantalla mediana de tablet
                console.log('Tablet pantalla');

                ScrollIssues.scrollCall(6,address,true,graphicsCall);

                $(tableContainer).on('scroll',function(){
                  if(ScrollIssues.SCROLL_FLAG){
                      ScrollIssues.scrollBig(tableContainer,6,address,graphicsCall);
                  }
                });

              }else{
                    // Pantalla pequeña celular

                    ScrollIssues.scrollCall(6,address,true,graphicsCall);

                    $(tableContainer).on('scroll',function(){
                      if(ScrollIssues.SCROLL_ACTIVE){
                        ScrollIssues.scrollBig(tableContainer,6,address,graphicsCall);
                      }
                    });
                  }
              }
      },

      /* Existe aqui */
      initScrollDownOnly : function(newData,graphicsCall,failCall){

        if(SCROLL_CONTAINER==null || scroll_graphicCall==null||scroll_ammount_by_call==null){
          console.log('<Error>: Objeto ScrollIssues no ha sido inicializado');
          return;
        }

            ScrollIssues.scrollCall(scroll_ammount_by_call,newData,true);

          $(window).on('scroll',function(){

            if(SCROLL_ACTIVE){



              var scrollHeight = $(document).height() - $('footer').innerHeight();
              var scrollPosition = $(window).height() + $(window).scrollTop();

              if ((scrollHeight - scrollPosition) / scrollHeight <= 0) {
                  // when scroll to bottom of the page

                      ScrollIssues.scrollCall(scroll_ammount_by_call,newData,false);

            }
          };

        });
      },
      restartScrollDownOnly :  function(newData,address,graphicsCall,failCall){
          $(window).unbind('scroll');
          ScrollIssues.activeEvent();
          ScrollIssues.initScrollDownOnly(newData,address,graphicsCall,failCall);
      },

      exitEvent(){
        SCROLL_ACTIVE = false;
        //$(container).unbind('scroll');
      },
      activeEvent(){
        SCROLL_ACTIVE = true;
      }
    }

})();
