"use strict";
define(["../../common/View","../../common/templateMaker"],function (View,templateMaker) {
    const aboutPageView = function(model){
      return new View(model).extend({ 
          rootId:".coinsBook",
          tpl: templateMaker("#aboutPage-tpl"),
      });  
    }
    return aboutPageView;
});
