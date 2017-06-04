//Шаблонизаторы предназначены для динамического посторяения html страниц используя данные с сервера. В основе простейшего шаблонизатора лежит принцип динамического построения js функция с использованием конструктора функций new Function("парам1","парам2"..."тело функции") и функции String.prototype.replace, с помощью которой в шаблоне ищется и заменяется данными с сервера определенная(регулярным выражением) часть шаблана.
"use strict";
define(function () {
const templateMaker = function (idOrClass){
    const htmlTpl = document.querySelector(idOrClass).innerHTML;
    return new Function("model, tagClass, viewId","let source = " + JSON.stringify('<div id="<%=viewId%>" class="<%=tagClass%>">'+htmlTpl+'</div>').replace(/<%=(.+?)%>/g, (match,p1)=>{
        return '"+'+p1.replace(/[&<>[](){}"']/g, "")+'+"';    
    }).replace(/<%(.+?)%>/g,'";$1 source+="') +";return source;"
    );
}   
return templateMaker;
});