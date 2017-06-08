"use strict";
import { eventDispatcher } from "../common/eventDispatcher.js";
    const rController = function(){
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
            
          const doc = document,
                win = window; 

          this.start = function(){
            let bookPosition = bookPositionCalc(),
                pagesAmount = document.querySelectorAll(".pageSection").length;
           
             
            win.addEventListener("orientationchange", function() {
                win.location.reload(false);
            });   
            win.addEventListener("resize", () => {
                bookPosition = bookPositionCalc();
            });   
              
            eventDispatcher.on("addNewPages",()=>setRotateEvent()); 
            eventDispatcher.on("captureNewCurrentPageZindex",()=>{
                if(currentPage){
                    zIndexCurrent = win.getComputedStyle(currentPage).getPropertyValue("z-index");
                    if(deltaX >= 90){
                        positionCurrent = "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)";    
                    }else{
                        positionCurrent = win.getComputedStyle(currentPage).getPropertyValue("transform");  
                    }    
                }
            }); 
            eventDispatcher.on("turnThePage",(pageNum)=>{
                const doc = document;
                const pageSection = doc.querySelectorAll(".coinsSection");
                let pages = Array.prototype.slice.call(pageSection, 0, (pageNum-2));
                 if (pageNum-2 > 0){ 
                     pages.forEach((page)=>{
                          page.classList.toggle("hide");
                     }); 
                     openPage(doc.querySelector(".chaptersSection"),5);
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
                     openPage(doc.querySelector(".chaptersSection"),5); 
                 }   
             });    
            eventDispatcher.on("openPage",(page)=>openPage(page,5));  
            eventDispatcher.on("closePage",(page)=>openPage(page,5,true));  
                
            doc.addEventListener("mousemove", event => {
                let yZoneEn = (0 < mouseY - bookPosition.top &&  mouseY < (bookPosition.top + bookPosition.height));
                mouseX = event.clientX;
                mouseY = event.clientY;
                if((0 < mouseX - bookPosition.left &&  mouseX - bookPosition.left < 75 && leftZoneRestrict) && yZoneEn){
                    leftZone = true;
                    doc.body.setAttribute("style","cursor:move");
                } else if((mouseX < (bookPosition.left + bookPosition.width) && (mouseX > (bookPosition.left + bookPosition.width - 75))) && yZoneEn){
                     rightZone = true;
                     doc.body.setAttribute("style","cursor:move");
                }else{
                  leftZone = false;
                  rightZone = false;
                  doc.body.setAttribute("style","cursor:default");
                }
            });
              
            doc.addEventListener("mousemove",()=>{  
                if((spinLeftZoneEn || spinRightZoneEn)){
                    if(spinRightZoneEn) deltaX = (startX-mouseX)/6;
                    if(spinLeftZoneEn) deltaX = 180 - (mouseX - startX)/6;
                    if(deltaX <= 0) deltaX = 0;
                    if(deltaX >= 180) deltaX = 180; 
                    autoRotate = true;
                    if(deltaX > 90 && openRotateEn) {
                        currentPage.firstElementChild.setAttribute("style","z-index:0");
                        if(positionCurrent == "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)" || positionCurrent =="matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)"){
                            currentPage.setAttribute("style","z-index:"+(zIndexCurrent));
                        }else{
                            currentPage.setAttribute("style","z-index:" + (pagesAmount - (zIndexCurrent-1)));
                        }
                       closeRotateEn =true; 
                       openRotateEn = false;   
                    }else if(deltaX < 90 && closeRotateEn){
                        currentPage.firstElementChild.setAttribute("style","z-index:1");
                        if(positionCurrent != "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)" && positionCurrent !="matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)"){
                             currentPage.setAttribute("style","z-index:"+(zIndexCurrent));
                        }else{
                             currentPage.setAttribute("style","z-index:" + (pagesAmount - (zIndexCurrent-1)));
                        }
                       closeRotateEn =false; 
                       openRotateEn = true; 
                    }
                    currentPage.style.transform = "rotateY("+(-deltaX)+"deg)";     
                }    
           }); 
              
            
            doc.addEventListener("mouseup", () => {
                spinRightZoneEn = false;
                spinLeftZoneEn = false;
                const book = doc.querySelector(".coinsBook");
                if(deltaX < 90 && autoRotate){
                    const rotateYInterval = setInterval(() => {
                        if(deltaX <= 5){
                            currentPage.style.transform = "rotateY(0deg)";
                            clearInterval(rotateYInterval);
                            if(currentPage.className == "col-xs-12 pageSection titleSection"){
                                let deltaTranslate = Math.round(book.getBoundingClientRect().left -bookPosition.left)/2;
                                if (deltaTranslate > 0) {
                                     const rotateXInterval = setInterval(() => {
                                        deltaTranslate = deltaTranslate - 10;
                                        if(deltaTranslate > 0){
                                            book.style.transform = "translateX("+(deltaTranslate)+"px)";
                                        }else{
                                            book.style.transform = "translateX("+(0)+"px)";
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
                                 let deltaTranslate = Math.round(doc.querySelector("#coinEntrance").getBoundingClientRect().right - book.getBoundingClientRect().right);
                                 let translateStart = 0;
                                 if (deltaTranslate > 0) {
                                     const rotateXInterval = setInterval(() => {
                                        translateStart = translateStart + 10;
                                        if(translateStart < deltaTranslate){
                                            book.style.transform = "translateX("+(translateStart)+"px)";
                                        }else{
                                            book.style.transform = "translateX("+(deltaTranslate)+"px)";
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
              
            setRotateEvent();
            openPage(doc.querySelector("#firstPage"));  
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
                doc.dispatchEvent(new Event("mouseup"));
            },800);  
            }else{
                let rotateDeg = 180;
                const rotateInterval = setInterval(() => 
                    {
                        if(rotateDeg > 0){
                            if(rotateDeg < 90){
                                 page.setAttribute("style","z-index:100");
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
                doc.dispatchEvent(new Event("mouseup"));
            },800);
            }     
        }  
          
        const setRotateEvent = function(){
             for (const node of Array.from(doc.getElementsByTagName("section"))) {
                    node.addEventListener("mousedown", event => {
                        if(leftZone || rightZone){
                            currentPage = event.currentTarget;
                            zIndexCurrent = win.getComputedStyle(currentPage).getPropertyValue("z-index");
                            positionCurrent = win.getComputedStyle(currentPage).getPropertyValue("transform");
                            startX = mouseX;
                            leftZone ? spinLeftZoneEn = true : spinRightZoneEn = true;
                        }
                    });      
             }
        }      
        const bookPositionCalc = function(){
            let bookPosition;
            const titlePage = doc.querySelector(".coinsBook").firstElementChild;
            if(win.getComputedStyle(titlePage).getPropertyValue("transform") === "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)" || win.getComputedStyle(titlePage).getPropertyValue("transform") === "matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)"){
                return bookPosition = doc.querySelector("#coinEntrance").getBoundingClientRect();
            }else {
                return bookPosition = titlePage.getBoundingClientRect(); 
            }    
        };
    }
 
const rotateController = new rController();    
export {rotateController};    
