"use strict";
import mControllerScss from "./messageController.scss";

const mController = function (){
    this.showConnectionError = function(){
        let footters = Array.from(document.querySelectorAll(".page__footer_messField,.backPage__footer_messField"));
        footters.forEach((node)=>{
            node.classList.remove("completeMessage");
            node.classList.add("errorMessage");
            node.innerHTML = "Сбой при загрузке, <br> проверьте соединение с интернетом.";
        }); 
        setTimeout(()=>{
                footters.forEach((node)=>{
                node.classList.remove("errorMessage");
                node.innerHTML = "";
            });
            footters = null;    
        },6000);
    }
    this.showCollectionHasLoaded = function(){
        let footters = Array.from(document.querySelectorAll(".page__footer_messField,.backPage__footer_messField"));
        footters.forEach((node)=>{
            node.classList.add("completeMessage");
            node.innerHTML = "Все коллекции успешно загружены.";
        }); 
        setTimeout(()=>{
                footters.forEach((node)=>{
                node.classList.remove("completeMessage");
                node.innerHTML = "<span class='arrow'>&#10150</span>";
            });
            footters = null;    
        },4000);  
    }
}

const messageController = new mController();
export {messageController};
