const  coinsPageViewTpl = `
<section class="col-xs-12 pageSection contentSection coinsSection">
    <div class="page frontPage">
        <header class="page__header">
            <h1> <%= model.series%> </h1>
            <hr>
        </header>
        <div class="col-xs-10 col-xs-offset-1 page__body">
            <div class="coinDescriptionWrapper"></div>
            <div class="row coinsContainer">
                <% for(let i = 0; i<12; i++){%>
                    <div class="col-xs-3 coinImageContainer"> 
                        <div data-img = "<%=i%>" data-page="<%=model.modelIndex%>" data-series="<%=model.series%>" class = "coinImageContainerInner">
                            <% if(model.img[i]){%> 
                                <img class = "coinImage" src="data:png;base64,<%=model.img[i]%>">
                            <%}%> 
                        </div>
                    </div>  
                <%}%>
            </div>   
        </div>
        <footer class="col-xs-10 col-xs-offset-1 page__footer">
            <hr>
            <div class="col-xs-10 col-xs-offset-1 page__footer_messField"></div>
            <span class="pageNum"><%=model.pageNumb++%></span>
        </footer>
    </div>
    <div class="page backPage">
        <header class="page__header">
                <h1> <%= model.series%> </h1>
                <hr>
        </header>
         <div class="col-xs-10 col-xs-offset-1 page__body">
            <div class="coinDescriptionWrapper"></div>
            <div class="row coinsContainer">
                <% for(let i = 12; i<24; i++){%>
                    <div class="col-xs-3 coinImageContainer">
                        <div data-img = "<%=i%>" data-page="<%=model.modelIndex%>" data-series="<%=model.series%>" class = "coinImageContainerInner">
                            <% if(model.img[i]){%> 
                                <img class = "coinImage" src="data:png;base64,<%=model.img[i]%>">
                            <%}%>
                         </div>     
                    </div>  
                <%}%>
            </div>    
        </div>
        <footer class="col-xs-10 col-xs-offset-1 page__footer">
            <hr>
            <span class="pageNum"><%=model.pageNumb%></span>
            <div class="col-xs-10 col-xs-offset-1 backPage__footer_messField"></div>
        </footer>
    </div>
</section> `;


export {coinsPageViewTpl};