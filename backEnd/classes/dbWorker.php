<?php
class dbWorker{
private $db;


function __construct(){
    try{ 
        $dbParam = parse_ini_file('config.ini');
        $this->db = new PDO($dbParam['db.conn'],$dbParam['db.user'],$dbParam['db.pass']);
        $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    }catch (PDOException $e){
        return false;
    }

}

function getCoinsDescription($coin,$imgSeries){
    $query = "SELECT year, name, date FROM series".(int)$imgSeries." WHERE coinsNum = :coinsNum";
    try{
        $stmt = $this->db -> prepare($query);
        $stmt->bindParam(':coinsNum',$coin);
        $stmt->execute();
        $coinsDescript = $stmt->fetch();
        $avers = base64_encode(@file_get_contents("frontEnd/app/img/coins/".(int)$imgSeries."/big/coin".(int)$coin."b.png"));
        $revers = base64_encode(@file_get_contents("frontEnd/app/img/coins/".(int)$imgSeries."/year/".$coinsDescript["year"].".png"));
        if(!$avers || !$revers) return false;
        $coinsDescript["avers"] = $avers;
        $coinsDescript["revers"] = $revers;
        return $coinsDescript;
     }catch (PDOException $e){
         return false;
    }   
}
}
