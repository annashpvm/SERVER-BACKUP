<?php 
  require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
 
try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}
$stmt = $pdo->query("SELECT * FROM mas_company");
while ($row = $stmt->fetch()) {
    echo $row['company_name']."<br />\n";
}

?>

