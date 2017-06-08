"use strict";
import { baseView } from "./baseView.js";
import { templateMaker } from "../../common/templateMaker.js";
import { eventDispatcher } from "../../common/eventDispatcher.js";
import { contentPageViewTpl } from "./pageViewsTpl/contentPageViewTpl.js";

const contentPageView = baseView.extendView(function(){
    this.viewId = "view" + Date.now(),  
    this.rootId = "#coinEntrance",
    this.tagClass = "pageContainer", 
    this.tpl = templateMaker(contentPageViewTpl),
        
    this.events = {
        "click .page__nav_item": "turnThePage",
        "click .page__footer_messField": "openPage",
        "click .backPage__footer_messField": "closePage",
    },

    this.turnThePage = function(event){
        const target = event.currentTarget;
        if(!target.firstChild.classList.contains("loadingFog")){
            eventDispatcher.trigger("turnThePage",Math.floor(target.getAttribute("data-num")/2));    
        }
    },
    this.openPage = function(){
         eventDispatcher.trigger("openPage",document.querySelector(".chaptersSection"));    
    },
    this.closePage = function(){
         eventDispatcher.trigger("closePage",document.querySelector(".chaptersSection"));    
    }
});
    
export {contentPageView};
