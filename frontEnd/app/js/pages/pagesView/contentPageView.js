"use strict";
define(["../../common/View","../../common/eventDispatcher","../../common/templateMaker","../pages.scss"],function (View,eventDispatcher,templateMaker) {
    const contentPageView = function(model){
      return new View(model).extend({
          viewId: "view" + Date.now(),  
          rootId:"#coinEntrance",
          tagClass: "pageContainer", 
          tpl: templateMaker("#startPage-tpl"),
          events:{
            "click .page__nav_item": "turnThePage",
            "click .page__footer_messField": "openPage",
            "click .backPage__footer_messField": "closePage",
          },
          
          turnThePage(event){
            const target = event.currentTarget;
            if(!target.firstChild.classList.contains("loadingFog")){
                eventDispatcher.trigger("turnThePage",Math.floor(target.getAttribute("data-num")/2));    
            }
          },
          openPage(){
             eventDispatcher.trigger("openPage",document.querySelector(".chaptersSection"));    
          },
          closePage(){
             eventDispatcher.trigger("closePage",document.querySelector(".chaptersSection"));    
          }
      });  
    }
    return contentPageView;
});
