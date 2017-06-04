"use strict";
define(["../../common/View","../../common/templateMaker"],function (View,templateMaker) {
    const endPageView = function(model){
      return new View(model).extend({
          rootId:".coinsBook",
          tpl: templateMaker("#endPage-tpl"),
      });  
    }
    return endPageView;
});
