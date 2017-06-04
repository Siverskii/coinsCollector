"use strict";
define(["../common/eventDispatcher"],function (eventDispatcher) {
    const rotateController = function(){
            let mouseX,mouseY,
                currentPage,zIndexCurrent,positionCurrent,
                spinLeftZoneEn,spinRightZoneEn,
                startX,
                deltaX,
                rightZone,leftZone,
                leftZoneRestrict = false,
                autoRotate = false,
                isBookOpen = false,
                closeRotateEn = false,
                openRotateEn = true; 

          this.start = function(){
            let bookPosition = bookPositionCalc(),
                pagesAmount = Array.from(document.querySelectorAll(".pageSection")).length;
           
              
            eventDispatcher.on("addNewPages",()=>setRotateEvent()); 
            
            eventDispatcher.on("captureNewCurrentPageZindex",()=>{
                if(currentPage){
                    zIndexCurrent = window.getComputedStyle(currentPage).getPropertyValue("z-index");
                    if(deltaX >= 90){
                        positionCurrent = "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)";    
                    }else{
                        positionCurrent = window.getComputedStyle(currentPage).getPropertyValue("transform");  
                    }    
                }
            });
              
            window.addEventListener("orientationchange", function() {
                window.location.reload(false);
            });
              
            eventDispatcher.on("turnThePage",(pageNum)=>{
                const pageSection = document.querySelectorAll(".coinsSection");
                let pages = Array.prototype.slice.call(pageSection, 0, (pageNum-2));
                 if (pageNum-2 > 0){ 
                     pages.forEach((page)=>{
                          page.classList.toggle("hide");
                     }); 
                     openPage(document.querySelector(".chaptersSection"),5);
                     setTimeout(()=>{
                         openPage(pageSection[pageNum-2],5)
                         setTimeout(()=>{
                             pages.forEach((page)=>{
                                 page.style.transform = "rotateY(180deg)";
                                 page.classList.toggle("hide");
                            });
                             eventDispatcher.trigger("addNewPages");
                             pages = null;
                         },1000);
                     },650);
                 }else{
                     openPage(document.querySelector(".chaptersSection"),5); 
                 }   
             });  
              
            eventDispatcher.on("openPage",(page)=>openPage(page,5));  
            eventDispatcher.on("closePage",(page)=>openPage(page,5,true));  
                   
            window.addEventListener("resize", () => {
                bookPosition = bookPositionCalc();
            });  
            
            document.addEventListener("mousemove", event => {
                let yZoneEn = (0 < mouseY - bookPosition.top &&  mouseY < (bookPosition.top + bookPosition.height));
                mouseX = event.clientX;
                mouseY = event.clientY;
                if((0 < mouseX - bookPosition.left &&  mouseX - bookPosition.left < 75 && leftZoneRestrict) && yZoneEn){
                    leftZone = true;
                    document.body.setAttribute("style","cursor:move");
                } else if((mouseX < (bookPosition.left + bookPosition.width) && (mouseX > (bookPosition.left + bookPosition.width - 75))) && yZoneEn){
                     rightZone = true;
                     document.body.setAttribute("style","cursor:move");
                }else{
                  leftZone = false;
                  rightZone = false;
                  document.body.setAttribute("style","cursor:default");
                }
            });
              
            document.addEventListener("mousemove",()=>{  
                if((spinLeftZoneEn || spinRightZoneEn)){
                    if(spinRightZoneEn) deltaX = (startX-mouseX)/6;
                    if(spinLeftZoneEn) deltaX = 180 - (mouseX - startX)/6;
                    if(deltaX <= 0) deltaX = 0;
                    if(deltaX >= 180) deltaX = 180; 
                    autoRotate = true;
                    if(deltaX > 90) {
                        if(openRotateEn){
                            //currentPage.firstElementChild.style.zIndex = "0";
                            currentPage.firstElementChild.setAttribute("style","z-index:0");
                            if(positionCurrent == "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)" || positionCurrent =="matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)"){
                                //currentPage.style.zIndex = (zIndexCurrent);
                                currentPage.setAttribute("style","z-index:"+(zIndexCurrent));
                            }else{
                                 //currentPage.style.zIndex = pagesAmount - (zIndexCurrent-1);
                                currentPage.setAttribute("style","z-index:" + (pagesAmount - (zIndexCurrent-1)));
                            }
                           closeRotateEn =true; 
                           openRotateEn = false;  
                        }
                    }else if(deltaX < 90){
                        if(closeRotateEn){
                            //currentPage.firstElementChild.style.zIndex = "1";
                              currentPage.firstElementChild.setAttribute("style","z-index:1");
                            if(positionCurrent != "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)" && positionCurrent !="matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)"){
                                //currentPage.style.zIndex = (zIndexCurrent);
                                 currentPage.setAttribute("style","z-index:"+(zIndexCurrent));
                            }else{
                                 //currentPage.style.zIndex = pagesAmount - (zIndexCurrent-1);
                                 currentPage.setAttribute("style","z-index:" + (pagesAmount - (zIndexCurrent-1)));
                            }
                           closeRotateEn =false; 
                           openRotateEn = true;    
                        }
                    }
                    currentPage.style.transform = "rotateY("+(-deltaX)+"deg)";     
                }    
           }); 
              
            setRotateEvent();
  
            document.addEventListener("mouseup", () => {
                spinRightZoneEn = false;
                spinLeftZoneEn = false;
                if(deltaX < 90 && autoRotate){
                    const rotateYInterval = setInterval(() => {
                        if(deltaX <= 5){
                            currentPage.style.transform = "rotateY(0deg)";
                            clearInterval(rotateYInterval);
                            if(currentPage.className == "col-xs-12 pageSection titleSection"){
                                 let deltaTranslate = Math.round(document.querySelector(".coinsBook").getBoundingClientRect().left -bookPosition.left)/2;
                                if (deltaTranslate > 0) {
                                     const rotateXInterval = setInterval(() => {
                                        deltaTranslate = deltaTranslate - 10;
                                        if(deltaTranslate > 0){
                                            document.querySelector(".coinsBook").style.transform = "translateX("+(deltaTranslate)+"px)";
                                        }else{
                                            document.querySelector(".coinsBook").style.transform = "translateX("+(0)+"px)";
                                            autoRotate = false;
                                            clearInterval(rotateXInterval);
                                            leftZoneRestrict = true;
                                            bookPosition = bookPositionCalc();
                                        }    
                                     },20);
                                 }
                            }else{
                                autoRotate = false;
                                return;
                            }
                        }
                        deltaX = deltaX - 4;
                        if(deltaX <= 0) deltaX = 0;
                        currentPage.style.transform = "rotateY("+(-deltaX)+"deg)";   
                    }, 20);  
                }else if(deltaX >= 90 && autoRotate){
                    const rotateYInterval = setInterval(() => {
                        if(deltaX >= 175 && autoRotate){
                            currentPage.style.transform = "rotateY(180deg)";
                            clearInterval(rotateYInterval);
                            if(currentPage.className == "col-xs-12 pageSection titleSection"){
                                 let deltaTranslate = Math.round(document.querySelector("#coinEntrance").getBoundingClientRect().right - document.querySelector(".coinsBook").getBoundingClientRect().right);
                                 let translateStart = 0;
                                 if (deltaTranslate > 0) {
                                     const rotateXInterval = setInterval(() => {
                                        translateStart = translateStart + 10;
                                        if(translateStart < deltaTranslate){
                                            document.querySelector(".coinsBook").style.transform = "translateX("+(translateStart)+"px)";
                                        }else{
                                            document.querySelector(".coinsBook").style.transform = "translateX("+(deltaTranslate)+"px)";
                                            autoRotate = false;
                                            clearInterval(rotateXInterval);
                                            leftZoneRestrict = true;
                                            bookPosition = bookPositionCalc();
                                            if(!isBookOpen){
                                                eventDispatcher.trigger("bookHaveOpened");
                                                isBookOpen = true;
                                            }
                                        }    
                                     },20);
                                 }
                            }else{
                                autoRotate = false;
                                return;
                            }
                            return;
                        }
                        deltaX = deltaX + 4;
                        if(deltaX >= 180) deltaX = 180;
                        if(currentPage)
                            currentPage.style.transform = "rotateY("+(-deltaX)+"deg)";   
                    }, 20);    
                }
            });
            openPage(document.querySelector("#firstPage"));  
          }
 
        const openPage = function(page,speed = 4,close=false){
            if(!close){
                let rotateDeg = 0;
                const rotateInterval = setInterval(() => 
                    {
                        if(rotateDeg < 180){
                            rotateDeg = rotateDeg + speed;
                            page.style.transform = "rotateY("+(-rotateDeg)+"deg)";

                        }else{
                            eventDispatcher.trigger("addNewPages");
                            page.style.transform = "rotateY(180deg)";     
                            clearInterval(rotateInterval);
                        }    
                    },20); 
            setTimeout(()=>{
                deltaX = 180;
                autoRotate = true;
                currentPage = page;
                document.dispatchEvent(new Event("mouseup"));
            },800);
                
            }else{
                let rotateDeg = 180;
                const rotateInterval = setInterval(() => 
                    {
                        if(rotateDeg > 0){
                            if(rotateDeg < 90){
                                 page.setAttribute("style","z-index:100");
                              // page.style = "z-index:100";
                            }
                            rotateDeg = rotateDeg - speed;
                            page.style.transform = "rotateY("+(-rotateDeg)+"deg)";

                        }else{
                            eventDispatcher.trigger("addNewPages");
                            page.style.transform = "rotateY(0deg)";     
                            clearInterval(rotateInterval);
                        }    
                     },20);
                
            setTimeout(()=>{
                deltaX = 0;
                autoRotate = true;
                currentPage = page;
                document.dispatchEvent(new Event("mouseup"));
            },800);
            }     
        }  
          
        const setRotateEvent = function(){
             for (const node of Array.from(document.getElementsByTagName("section"))) {
                    node.addEventListener("mousedown", event => {
                        if(leftZone || rightZone){
                            currentPage = event.currentTarget;
                            zIndexCurrent = window.getComputedStyle(currentPage).getPropertyValue("z-index");
                            positionCurrent = window.getComputedStyle(currentPage).getPropertyValue("transform");
                            startX = mouseX;
                            leftZone ? spinLeftZoneEn = true : spinRightZoneEn = true;
                        }
                    });      
             }
        }      
        const bookPositionCalc = function(){
            let bookPosition;
            const titlePage = document.querySelector(".coinsBook").firstElementChild;
            if(window.getComputedStyle(titlePage).getPropertyValue("transform") === "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)" || window.getComputedStyle(titlePage).getPropertyValue("transform") === "matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)"){
                return bookPosition = document.querySelector("#coinEntrance").getBoundingClientRect();
            }else {
                return bookPosition = titlePage.getBoundingClientRect(); 
            }    
        };
    }
    return rotateController;
});