
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








mysqli_query($conn, "BEGIN");


 $query1 = "delete from trnpur_deliverychallan_trailer where dct_fincode = $dchfincode and dct_comp_code=$dchcompcode and dct_no = $dchno and dct_type = '$dchtype'";

//echo $query1;
//echo "<br>";
 $result1= mysqli_query($conn, $query1);


 $query2 = "delete from  trnpur_deliverychallan_header where dch_comp_code = $dchcompcode and dch_fincode =  $dchfincode and dch_type = '$dchtype' and dch_no = $dchno";

//echo $query2;
//echo "<br>";

 $result2= mysqli_query($conn, $query2);



if($result1 && $result2)
{
           mysqli_query($conn, "COMMIT");                       
            echo '({"success":"true","dcno":"'.$dchno.'"})';
}
    else
{
            mysqli_rollback($conn);

            
            echo '({"success":"false","dcno":"'.$dchno.'"})';
}   
    

       
 
?>


