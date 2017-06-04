//Объект RESTfulAPI предназначен для осущесивления обмена данными с сервером. Обмен с сервером происходи посредством встроенного объекта XMLHttpRequest. RESTfulAPI имеет следующие методы: метод init - для установки метода обмена с сервером (POST,GET,PUT,UPDATE),url с которым происходит обмен и сами данные; метод send - для отправки сообщение на сервер.   
"use strict";
define(function () {
const RESTfulAPI = function(options){}     

RESTfulAPI.prototype.init = function(options,data = {}){
    this.method = options.method,
    this.url = options.url;
    this.data = data;
    return this;
}

RESTfulAPI.prototype.send = function(data=null){
   
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


return new RESTfulAPI();
});