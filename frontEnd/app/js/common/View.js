//Представление предназначено для наполнения html шаблона данными с сервера и отображения последнего в соответствующем месте приложения. При создании представления на вход передается объект attr со следующими свойствами: attr.rootId - id или class элемента страницы, в котором будет развернуто представление; attr.tmplId - id скрипта, в ктором находится шаблон представления; attr.model - модель содержащая данные для шаблона.//templateMaker - шаблонизаторы предназначены для динамического посторяения html страниц используя данные с сервера. В основе простейшего шаблонизатора лежит принцип динамического построения js функция с использованием конструктора функций new Function("парам1","парам2"..."тело функции") и функции String.prototype.replace, с помощью которой в шаблоне ищется и заменяется данными с сервера определенная(регулярным выражением) часть шаблана.  
"use strict";
define([],function () {
const view = function(model){
    this.model = model;
}     

view.prototype.render = function(model){
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

view.prototype.renderTo = function(root){
    root.insertAdjacentHTML('beforeend',this.tpl(this.model.getAttr(),this.tagClass,this.viewId));
    if(this.events != undefined){
        this.events.forEach(event => {
            Array.from(root.querySelectorAll(event[1])).forEach((node)=>node.addEventListener(event[0],this[event[2]].bind(this)));  
        });
    }  
    return this;
}

view.prototype.extend = function(obj){
    for (let prop in obj) {
        if (Object.hasOwnProperty.call(obj, prop))
            this[prop] = obj[prop];
    }
    
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
    return this;
}

view.prototype.remove = function(){
    if(this.events != undefined){
        this.events.forEach(event => {
            Array.from(document.querySelector(event[1])).forEach((node)=>node.removeEventListener(event[0],event[2]));
        });
    }
}

return view;
});


