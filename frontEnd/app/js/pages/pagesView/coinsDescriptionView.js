"use strict";
import { baseView } from "./baseView.js";
import { templateMaker } from "../../common/templateMaker.js";
import { eventDispatcher } from "../../common/eventDispatcher.js";
import { coinsDescriptionViewTpl } from "./pageViewsTpl/coinsDescriptionViewTpl.js";

const coinsDescriptionView = baseView.extendView(function(model){
      this.tagClass = "coinDescription",
      this.tpl = templateMaker(coinsDescriptionViewTpl),
      this.model = model;

      this.events = {
        "click .closeDescription": "closeDescription",
       },

       this.closeDescription = function(){
            eventDispatcher.trigger("closeDescription",this.model); 
       }
});

export {coinsDescriptionView};

