//Представление предназначено для наполнения html шаблона данными с сервера и отображения последнего в соответствующем месте приложения. При создании представления на вход передается объект attr со следующими свойствами: attr.rootId - id или class элемента страницы, в котором будет развернуто представление; attr.tmplId - id скрипта, в ктором находится шаблон представления; attr.model - модель содержащая данные для шаблона.//templateMaker - шаблонизаторы предназначены для динамического посторяения html страниц используя данные с сервера. В основе простейшего шаблонизатора лежит принцип динамического построения js функция с использованием конструктора функций new Function("парам1","парам2"..."тело функции") и функции String.prototype.replace, с помощью которой в шаблоне ищется и заменяется данными с сервера определенная(регулярным выражением) часть шаблана.  
"use strict";
const baseView = {
    view(){},
    
    extendView(userView){
        let prot = Object.create(this.view.prototype);
        prot.constructor = userView;
        userView.prototype = prot;  
        return userView;
    }
}
    
baseView.view.prototype.render = function(model){   
    if(this.events != undefined){
        let intEvents = [];
        for (let event in this.events) {
            if (Object.hasOwnProperty.call(this.events, event)){
                const eventTarge = event.split(" ");
                intEvents.push([eventTarge[0],eventTarge[1],this.events[event]]);    
            }
        }
        this.events = intEvents;   
    }
 
    let intModel;
    this.model !=undefined ? intModel =  this.model.getAttr() : intModel = {};
    document.querySelector(this.rootId).insertAdjacentHTML('beforeend',this.tpl(intModel,this.tagClass,this.viewId));
    if(this.events != undefined){
        this.events.forEach(event => {
            Array.from(document.querySelector(this.rootId).lastElementChild.querySelectorAll(event[1])).forEach((node)=>node.addEventListener(event[0],this[event[2]].bind(this)));  
        });
    }  
    return this;
}

baseView.view.prototype.renderTo = function(root){
    if(this.events != undefined){
        let intEvents = [];
        for (let event in this.events) {
            if (Object.hasOwnProperty.call(this.events, event)){
                const eventTarge = event.split(" ");
                intEvents.push([eventTarge[0],eventTarge[1],this.events[event]]);    
            }
        }
        this.events = intEvents;   
    }
    
    root.insertAdjacentHTML('beforeend',this.tpl(this.model.getAttr(),this.tagClass,this.viewId));
    if(this.events != undefined){
        this.events.forEach(event => {
            Array.from(root.querySelectorAll(event[1])).forEach((node)=>node.addEventListener(event[0],this[event[2]].bind(this)));  
        });
    }  
    return this;
}

baseView.view.prototype.remove = function(){
    if(this.events != undefined){
        this.events.forEach(event => {
            Array.from(document.querySelector(event[1])).forEach((node)=>node.removeEventListener(event[0],event[2]));
        });
    }
}


export {baseView};

