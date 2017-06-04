<?php
require 'backEnd/vendor/autoload.php';
spl_autoload_register(function ($classname) {
    require ("backEnd/classes/" . $classname . ".php");
});
$app = new Slim\App();
$container = $app->getContainer();
$container['view'] = new \Slim\Views\PhpRenderer("frontEnd/");
$container['db'] = new dbWorker();

$app->get('/', function ($request, $response, $args) {
    $response = $this->view->render($response, "index.phtml");
    return $response;
});

$app->get('/getCoinsSeries', function ($request, $response, $args) {
    $seriesName = ["Города воинской славы","Древние города России","Российская Федерация","Русский балет","Красная книга","70-летие Победы","Памятные монеты"];
    $modelIndex = 0;
    $coinsSeries[$modelIndex] = [];
    $series = $request->getQueryParams()["series"];
    $imgIndexInt = 0;
    
    $coinsSeries[$modelIndex]["series"] = $seriesName[$series];
    for($imageIndex=0; $imageIndex<100; $imageIndex++){
        if($imageIndex % 24 == 0 && $imageIndex!=0){
            $modelIndex++;
            $imgIndexInt = 0;
            $coinsSeries[$modelIndex]["series"] = $seriesName[$series];
        }
        if(!$img = base64_encode(@file_get_contents("frontEnd/app/img/coins/".$series."/small/".$imageIndex.".png"))) break;
        $coinsSeries[$modelIndex]["img"][$imgIndexInt] = $img;
        $imgIndexInt++;     
    }  
    if($coinsSeries){
        return  $newResponse = $response -> withJson($coinsSeries, 200);    
    }else{
        return  $newResponse = $response -> withJson("inernalError", 500);
    }
    
});

$app->get('/getCoinDescription', function ($request, $response, $args) {
    $imgNum = $request->getQueryParams()["imgNum"];
    $imgPageNum = $request->getQueryParams()["imgPageNum"];
    $imgSeries = $request->getQueryParams()["imgSeries"];
    
    $coinDescription = $this->db -> getCoinsDescription($imgNum + ($imgPageNum*24),$imgSeries);
    if(!$coinDescription){
        return  $newResponse = $response -> withJson("inernalError", 500);    
    }
    return  $newResponse = $response -> withJson($coinDescription, 200);
});
$app->run();