"use strict";
define(["../../common/View","../../common/eventDispatcher","../../common/templateMaker","../pages.scss"],function (View,eventDispatcher,templateMaker) {
    const contentPageView = function(model){
      return new View(model).extend({
        viewId: "view" + Date.now(),   
        rootId:".coinsBook",
        tagClass: "", 
        tpl: templateMaker("#coinPage-tpl"),
        events:{
            "click .coinsContainer": "getCoinsDescr",
            "click .page__footer_messField": "openPage",
            "click .backPage__footer_messField": "closePage",
        },  
         getCoinsDescr(event){ 
            const series = ["Города воинской славы","Древние города России","Российская Федерация","Русский балет","Красная книга","70-летие Победы","Памятные монеты"];
             
            const imgSeries = series.indexOf(event.target.getAttribute("data-series"));
            if(imgSeries!= -1){
                eventDispatcher.trigger("pageCtrlGetCoinsDescr",{
                   imgNum: event.target.getAttribute("data-img"),
                   imgPageNum: event.target.getAttribute("data-page"),
                   imgSeries: imgSeries,
                   view: document.querySelector("#"+this.viewId)
               });     
            }   
             
         },
          openPage(){
             eventDispatcher.trigger("openPage",document.querySelector("#"+this.viewId).firstElementChild);    
          },
          closePage(){
             eventDispatcher.trigger("closePage",document.querySelector("#"+this.viewId).firstElementChild);    
          }
      });  
    }
    return contentPageView;
});
