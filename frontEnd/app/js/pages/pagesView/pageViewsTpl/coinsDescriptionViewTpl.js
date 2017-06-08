const coinsDescriptionViewTpl = `
<div class="coinImage_descriptionWrapper">
<div class="coinImage_descriptionIntWrapper">
        <img class = "coinImage coinImage_description" src="data:png;base64,<%=model.avers%>">
   </div>
   <div class="coinImage_descriptionIntWrapper">
    <img class = "coinImage coinImage_description" src="data:png;base64,<%=model.revers%>">
    </div>
</div>
<div class = "page__nav">
    <ul>
        <li class=""><span>Наименование: </span> <span class="description__coinsName"><%=model.name%><span/> </li>
        <li class=""><span>Дата выпуска: </span> <span><%=model.date%><span/></li>
        <li class=""><span></span> <span class="closeDescription">Закрыть<span/></li>
    </ul>   
</div>`;

export {coinsDescriptionViewTpl};