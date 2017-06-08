"use strict";
import { baseView } from "./baseView.js";
import { templateMaker } from "../../common/templateMaker.js";
import { aboutPageViewTpl } from "./pageViewsTpl/aboutPageViewTpl.js";

const aboutPageView = baseView.extendView(function(){
      this.rootId = ".coinsBook",
      this.tpl = templateMaker(aboutPageViewTpl)
});

export {aboutPageView};
