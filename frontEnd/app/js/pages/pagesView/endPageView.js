"use strict";
import { baseView } from "./baseView.js";
import { templateMaker } from "../../common/templateMaker.js";
import { endPageViewTpl } from "./pageViewsTpl/endPageViewTpl.js";

const endPageView = baseView.extendView(function(){
      this.rootId = ".coinsBook",
      this.tpl = templateMaker(endPageViewTpl)
});

export {endPageView};

