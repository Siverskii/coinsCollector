//Коллекция coinsCollection - контейнер моделей монет. Коллекция имеет метод fetch для информации о моделях с сервера и создания массива моделей coinsModel. Обмен с сервером происходит аналогично методу fetch модели coinsModel. 
"use strict";

import { RESTfulAPI } from "../../common/RESTfulAPI.js";
import { coinModel } from "../models/coinModel.js";

  const coinsCollection = function(attr = {}){
   this.url = attr.url+"?series="+attr.seriesNumber;
   this.seriesNumber = attr.seriesNumber;  
   this.collection = [];
  }

  coinsCollection.prototype.pop = function(){
    return this.collection.pop();    
  },

  coinsCollection.prototype.fetch = function(callbacks = {}){
    let responsePromise = RESTfulAPI.init({method: "GET", url: this.url}).send(null);
    responsePromise.then(serverResponse => {
        if (serverResponse.status == "200"){
            const modelCollect = JSON.parse(serverResponse.data);
            Object.keys(modelCollect).forEach(modelIndex =>{
                this.collection.push(new coinModel(modelCollect[modelIndex]));
            });
            callbacks.success(this.collection);
        }else callbacks.error(serverResponse);  
     }); 
  }
  
  export {coinsCollection};

  
