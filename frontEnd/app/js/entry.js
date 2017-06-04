"use strict";
import gridScss from "../scss/grid.scss";
import commonScss from "../scss/common.scss";

require(["./common/eventDispatcher","./pages/pageController","./common/messageController/messageController"], function (eventDispatcher,pageController,messageController) {
    pageController.showContentPage();
    
    eventDispatcher.on("bookHaveOpened",()=>{
        pageController.addNewCoinsSeries()
        .then(() => {
            document.querySelector("#chap0").classList.remove("loadingFog");
            document.querySelector("#chap1").classList.remove("loadingFog");
             return pageController.addNewCoinsSeries()
        })
        .then(() => {
            document.querySelector("#chap2").classList.remove("loadingFog");
             return pageController.addNewCoinsSeries()
        })
        .then(() => {
            document.querySelector("#chap3").classList.remove("loadingFog");
             return pageController.addNewCoinsSeries()
        })
        .then(() => {
            document.querySelector("#chap4").classList.remove("loadingFog");
             return pageController.addNewCoinsSeries()
        })
        .then(() => {
            document.querySelector("#chap5").classList.remove("loadingFog");
             return pageController.addNewCoinsSeries()
        })
        .then(() => {
            document.querySelector("#chap6").classList.remove("loadingFog");
             return pageController.addNewCoinsSeries()
        })
        .then(() => {
            document.querySelector("#chap7").classList.remove("loadingFog");
            pageController.showAboutPage();
            messageController.showCollectionHasLoaded();
        })  
        .then(() => {
            document.querySelector("#chap8").classList.remove("loadingFog");
            pageController.showEndPage();
        }).catch(() => messageController.showConnectionError());    
    });
    
    eventDispatcher.on("showConnectionError",()=>messageController.showConnectionError());  
    
    

});