//Модель  coinModel - контейнер, со встроенными методами, предназначенный для хранения информации о каждой монете. Модель имеет следующие методы: set/get - для установки и получения атрибутов модели; fetch/save - для получения/загрузки информации на сервер, методы fetch/save принимают на вход функции success и error, которые срабатывают в зависимости от результата взаимодействия с сервером(success-успеха,error-ошибки). Обмен с сервером происходит посредством объекта RESTfulAPI, который после инициализации и вызова метода send, возвразщает promise, при срабатывании которого методы fetch/save получают ответ от сервера и вызывают соответсвущие callback функции.    
"use strict";
import { RESTfulAPI } from "../../common/RESTfulAPI.js";

  const coinModel = function(attributes = {}){
    this.url = attributes.url || "test"; 
    delete attributes.url;
    this._coinAttr = attributes; 
  }
   
  coinModel.prototype.set = function(attrs = {}){
    for (let attr in attrs) {
        this._coinAttr[attr] = attrs[attr];    
    } 
      return this;
  },
  coinModel.prototype.getAttr = function(){
    let intModel = {}; 
    for (let prop in this._coinAttr) {
            intModel[prop] = this._coinAttr[prop];
    }  
    return intModel;    
  },
      
  coinModel.prototype.get = function(attr){
        return this._coinAttr[attr];    
  },
  
  coinModel.prototype.fetch = function(data,callbacks = {}){
    let responsePromise = RESTfulAPI.init({method: "GET", url: this.url+"?imgNum="+data.imgNum+"&imgPageNum="+data.imgPageNum+"&imgSeries="+data.imgSeries}).send();
    responsePromise.then(serverResponse => {
        serverResponse.status == "200" ? callbacks.success(serverResponse, this.set(JSON.parse(serverResponse.data))) : callbacks.error(serverResponse) 
        return;    
     },()=>{});  
  }
  
  coinModel.prototype.save = function(callbacks = {}){
    let method;  
    this._coinAttr['id'] !=undefined ? method = "PUT" : method = "POST";
    let responsePromise = RESTfulAPI.init({method: method, url: this.url}).send(this._coinAttr);
    responsePromise.then(serverResponse => {
        serverResponse.status == "200" ? callbacks.success(serverResponse) : callbacks.error(serverResponse) 
        return;    
     },()=>{});  
  } 
  
  export {coinModel};
