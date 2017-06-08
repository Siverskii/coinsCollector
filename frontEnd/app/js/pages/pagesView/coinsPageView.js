"use strict";
import { baseView } from "./baseView.js";
import { templateMaker } from "../../common/templateMaker.js";
import { eventDispatcher } from "../../common/eventDispatcher.js";
import { coinsPageViewTpl } from "./pageViewsTpl/coinsPageViewTpl.js";

const coinsPageView = baseView.extendView(function(model){
    this.viewId = "view" + Date.now(),   
    this.rootId = ".coinsBook",
    this.tagClass = "",
    this.model = model;
    this.tpl = templateMaker(coinsPageViewTpl),
    this.events ={
        "click .coinsContainer": "getCoinsDescr",
        "click .page__footer_messField": "openPage",
        "click .backPage__footer_messField": "closePage",
    },  
    this.getCoinsDescr = function(event){ 
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
     this.openPage = function(){
         eventDispatcher.trigger("openPage",document.querySelector("#"+this.viewId).firstElementChild);    
     },
     this.closePage = function(){
         eventDispatcher.trigger("closePage",document.querySelector("#"+this.viewId).firstElementChild);    
     }
});

export {coinsPageView};

