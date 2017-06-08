"use strict";
import pagesScss from "./pages.scss";
import { rotateController } from "../rotateCtrl/rotateController.js";
import { coinsCollection } from "../coins/collections/coinsCollection.js";
import { coinModel } from "../coins/models/coinModel.js";
import { eventDispatcher } from "../common/eventDispatcher.js";
import { contentPageView } from "./pagesView/contentPageView.js";
import { coinsPageView } from "./pagesView/coinsPageView.js";
import { endPageView } from "./pagesView/endPageView.js";
import { aboutPageView } from "./pagesView/aboutPageView.js";
import { coinsDescriptionView } from "./pagesView/coinsDescriptionView.js";

const coinsPageController = function(){
   let series = 0;
   let pageNumber;     
   this.showContentPage = function(){
     const view = new contentPageView().render();
     setPageZindex();
     rotateController.start();      
   } 
   this.addNewCoinsSeries = function(){
       return new Promise((resolve,reject) => {
           new coinsCollection({url:"getCoinsSeries", seriesNumber: series++}).fetch({
               success(collection){
                    let modelIndex = 0;
                    collection.forEach((model)=>{
                        model.set({pageNumb: document.querySelectorAll(".contentSection").length*2+1,modelIndex:modelIndex++});
                        new coinsPageView(model).render();
                    });
                    eventDispatcher.trigger("addNewPages");
                    setPageZindex();
                    resolve();   
               },
               error(){reject();}
           });
       });
   }
   eventDispatcher.on("addNewPages",()=>setPageZindex());
   eventDispatcher.on("pageCtrlGetCoinsDescr",(coinsDescr)=>{
       const page = coinsDescr.imgNum > 11 ? 1 : 0; 
       let sectionForDescDisplay = coinsDescr.view.querySelectorAll(".page__body")[page];
       const coinsContainer = sectionForDescDisplay.querySelector(".coinsContainer"); 
       const coinDescription = sectionForDescDisplay.querySelector(".coinDescriptionWrapper");
       let model = new coinModel({
           url: "getCoinDescription"
       });

       model.fetch(coinsDescr,{
           success(response,model){
            let disappear = 0.8;   
            const disappearInterval = setInterval(() => {
                disappear = disappear - 0.1;
                if(disappear > 0){
                     coinsContainer.setAttribute("style","opacity:"+disappear);
                }else{
                     clearInterval(disappearInterval);
                     coinsContainer.setAttribute("style","opacity:0");
                     coinDescription.setAttribute("style","display:block");
                     coinsContainer.setAttribute("style","display:none");

                }   
             },30);
                model.set({coinsContainer:coinsContainer,coinDescription:coinDescription});
                new coinsDescriptionView(model).renderTo(coinDescription); 
           },
           error(){
             eventDispatcher.trigger("showConnectionError");    
           }
       });
   }); 

   eventDispatcher.on("closeDescription",(model)=>{
     model.get("coinsContainer").setAttribute("style","display:flex");
     model.get("coinDescription").setAttribute("style","display:none");
     model.get("coinDescription").innerHTML = "";
   });   

   this.showEndPage = function(){
        new endPageView().render();
        eventDispatcher.trigger("addNewPages");
        setPageZindex();
   }

  this.showAboutPage = function(){
        new aboutPageView().render();
        eventDispatcher.trigger("addNewPages");
        setPageZindex();
   }

  const setPageZindex = function(){
         const pages = document.querySelectorAll(".pageSection"),
             maxIndex = pages.length,
             win = window;
         for(let i = 0; i < maxIndex; i++){
            let transform = win.getComputedStyle(pages[i]).getPropertyValue("transform");
            let deg = Math.acos(transform.split(",")[0].split("(")[1])*180/Math.PI;
            if(transform == "none" || ((Math.acos(transform.split(",")[0].split("(")[1])*180/Math.PI) < 90)){
                if(transform == "none"){
                     pages[i].setAttribute("style", "z-index:" + (maxIndex - i));   
                }else{
                     pages[i].setAttribute("style", "transform:rotateY("+(-deg)+"deg); z-index:" + (maxIndex - i));    
                }
            }else{
                if (deg != 180) deg = -deg;
                pages[i].setAttribute("style","transform:rotateY("+(deg)+"deg); z-index:"+ (2 - (maxIndex - i - 1)));
            }
         }
     eventDispatcher.trigger("captureNewCurrentPageZindex");
  }
}

const pageController = new coinsPageController();
export {pageController};