//Объект RESTapi предназначен для осущесивления обмена данными с сервером. Обмен с сервером происходи посредством встроенного объекта XMLHttpRequest. RESTapi имеет следующие методы: метод init - для установки метода обмена с сервером (POST,GET,PUT,UPDATE),url с которым происходит обмен и сами данные; метод send - для отправки сообщение на сервер.   
"use strict";

const RESTapi = function(options){}     

RESTapi.prototype.init = function({method,url}){
    this.method = method,
    this.url = url;
    return this;
}

RESTapi.prototype.send = function(data=null){
    return new Promise((resolve,reject) => {
        let req = new XMLHttpRequest(),
            resp;
        req.open(this.method, this.url, true);
        req.setRequestHeader("Content-Type", 'application/json');
        req.addEventListener("load", () => {
            resolve({
                    status: req.status, 
                    data: req.responseText
                   });
        });
        req.send(JSON.stringify(data));
    });
}

const RESTfulAPI = new RESTapi();
export {RESTfulAPI};