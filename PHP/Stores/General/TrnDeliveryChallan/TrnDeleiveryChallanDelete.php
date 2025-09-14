
 <?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];
$savetype= $_POST['savetype'];


$dchcompcode = $_POST['dchcompcode'];
$dchfincode = $_POST['dchfincode'];
$dchtype = $_POST['dchtype'];

$dchno = $_POST['dchno'];
$dchdate = $_POST['dchdate'];
$dchparty = $_POST['dchparty'];


//$dchremarks = $_POST['dchremarks'];
//$dchrefno = $_POST['dchrefno'];








mysql_query("BEGIN");


 $query1 = "delete from trnpur_deliverychallan_trailer where dct_fincode = $dchfincode and dct_comp_code=$dchcompcode and dct_no = $dchno and dct_type = '$dchtype'";

//echo $query1;
//echo "<br>";
 $result1= mysql_query($query1);


 $query2 = "delete from  trnpur_deliverychallan_header where dch_comp_code = $dchcompcode and dch_fincode =  $dchfincode and dch_type = '$dchtype' and dch_no = $dchno";

//echo $query2;
//echo "<br>";

 $result2= mysql_query($query2);



if($result1 && $result2)
{
            mysql_query("COMMIT");                        
            echo '({"success":"true","dcno":"'.$dchno.'"})';
}
    else
{
            mysql_query("ROLLBACK");            
            echo '({"success":"false","dcno":"'.$dchno.'"})';
}   
    

       
 
?>


