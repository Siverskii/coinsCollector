"use strict";
define(["../../common/View","../../common/templateMaker","../../common/eventDispatcher"],function (View,templateMaker,eventDispatcher) {
    const coinsDescription = function(model){
      return new View(model).extend({ 
          tagClass: "coinDescription",
          tpl: templateMaker("#coinsDescription-tpl"),
          
           events:{
            "click .closeDescription": "closeDescription",
           },
          
           closeDescription(){
                eventDispatcher.trigger("closeDescription",this.model); 
           }
      });  
    }
    return coinsDescription;
});
