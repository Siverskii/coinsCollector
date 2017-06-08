const contentPageViewTpl = `<div class = "col-xs-6 coinsBook">
    <section id = "firstPage" class="col-xs-12 pageSection titleSection">
        <div class="page page_titlePage frontPage">
            <div class="col-xs-10 col-xs-offset-1 page__titleForTitlePage">
                <p>
                   Коллекционер
                </p>
           </div>
        </div>
        <div class="page page_titlePage backPage">
            <div class="col-xs-10 col-xs-offset-1 page__titleForTitlePage">
                <p>
                    &nbsp Интерес к монетам возник ещё в эпоху Возрождения. Итальянский поэт Франческо Петрарка был большим любителем античных монет. К середине XVI века, по подсчётам 
                    В.Гольциуса, в Европе было уже 950 мюнцкабинетов.<br>&nbsp  Наука нумизматика оформилась лишь в XIX веке. Большой вклад в это внес Г.Гроте, который объединил нумизматику и науку о деньгах, что явилось началом трансформации нумизматики в общественно-историческую науку.
                </p>
           </div>
        </div>  
    </section>
    <section class="col-xs-12 pageSection contentSection chaptersSection">
        <div class="page frontPage">
            <header class="page__header">
                <h1> Содержание </h1>
                <hr>
            </header>
            <div class="page__body">
                <nav class = "col-xs-10 col-xs-offset-1 page__nav">
                    <div id="chap0" class = "loadingFog page__chapter"> <span>Серии монет</span> <span>3</span></div>
                    <ul class = "col-xs-11 col-xs-offset-1">
                        <li class = "page__nav_item" data-num = "3"><span id="chap1" class="loadingFog">Города воинской славы</span> <span class="">3<span/></li>
                        <li class = "page__nav_item" data-num = "7"><span id="chap2" class="loadingFog">Древние города России</span> <span class="">7<span/></li>
                        <li class = "page__nav_item" data-num = "11"><span id="chap3" class="loadingFog">Российская Федерация</span>  <span class="">11<span/></li>
                        <li class = "page__nav_item" data-num = "15"><span id="chap4" class="loadingFog">Русский балет</span>         <span class="">15<span/></li>
                        <li class = "page__nav_item" data-num = "17"><span id="chap5" class="loadingFog">Красная книга</span>         <span class="">17<span/></li>
                        <li class = "page__nav_item" data-num = "19"><span id="chap6" class="loadingFog">70-летие Победы</span>      <span class="">19<span/> </li>
                        <li class = "page__nav_item" data-num = "21"><span id="chap7" class="loadingFog">Памятные монеты</span>       <span class="">21<span/> </li>
                    </ul>
                    <div class = "col-xs-12">
                         <!--<div class = "page__chapter"> <span>Профиль</span> <span>25</span> </div> --> 
                        <div id="chap8" class = "page__nav_item loadingFog page__chapter" data-num = "25"><span class="">О сайте</span><span>25</span> </div>
                    </div>   
                </nav>
            </div>
            <footer class="col-xs-10 col-xs-offset-1 page__footer">
                <hr>

                <div class="col-xs-10 col-xs-offset-1 page__footer_messField"></div>
                <span class="pageNum">1</span>
            </footer>
        </div>
        <div class="page backPage">
            <header class="page__header">
                    <h1> Количество монет в сериях </h1>
                    <hr>
            </header>
             <div class="page__body">
                <div class = "col-xs-10 col-xs-offset-1 page__nav">
                    <ul class = "col-xs-12">
                        <li class=""><span>Города воинской славы</span> <span>37 шт.<span/> </li>
                        <li class=""><span>Древние города России</span> <span>34 шт.<span/></li>
                        <li class=""><span>Российская Федерация</span>  <span>39 шт.<span/></li>
                        <li class=""><span>Русский балет</span>         <span>12 шт.<span/></li>
                        <li class=""><span>Красная книга</span>         <span>3 шт.<span/></li>
                        <li class="" ><span>70-летие Победы</span>       <span>3 шт.<span/> </li>
                        <li class=""><span>Памятные монеты</span>       <span>26 шт.<span/> </li>
                    </ul>   
                </div>
            </div>
            <footer class="col-xs-10 col-xs-offset-1 page__footer">
                <hr>
                <span class="pageNum">2</span>
                <div class="col-xs-10 col-xs-offset-1 backPage__footer_messField"></div>

            </footer>
        </div>
    </section> 
</div>`;

export {contentPageViewTpl};