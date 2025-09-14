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
$dchdept = $_POST['dchdept'];
$dchtotqty =  (float) $_POST['dchtotqty'];
$dchtotval = (float) $_POST['dchtotval'];
$dchtruck = strtoupper($_POST['dchtruckno']);
$dchdespthro = strtoupper($_POST['dchdespthro']);
$dchfreight = (float) $_POST['dchfreight'];
$dchfreighttype = $_POST['dchfreighttype'];
$dchdays = (int)$_POST['dchdays'];

//$dchremarks = $_POST['dchremarks'];
//$dchrefno = $_POST['dchrefno'];


$dchrefno = strtoupper(trim($_POST['dchrefno']));
$dchremarks = strtoupper(trim($_POST['dchremarks']));



$dchremarks = str_replace("'","", $dchremarks );
$dchtruck = str_replace("'","", $dchtruck );

$dchrefdate = $_POST['dchrefdate'];





mysql_query("BEGIN");
if ($savetype == "Add") {
    $query2 = "select IFNULL(max(dch_no),0)+1 as dcno from trnpur_deliverychallan_header where dch_fincode = $dchfincode and dch_comp_code=$dchcompcode and dch_type = $dchtype'";
    $result2= mysql_query($query2);
    $rec2 = mysql_fetch_array($result2);
    $dcno=$rec2['dcno'];


    $query3= "insert into  trnpur_deliverychallan_header values('$dchcompcode', '$dchfincode', '$dchno', '$dchdate', '$dchtype','$dchparty', '$dchdept', '$dchtotqty', '$dchtotval', '$dchtruck','$dchfreighttype', '$dchfreight', '$dchdays', '$dchremarks', '$dchrefno', '$dchrefdate', '$dchdespthro')";
     $result3=mysql_query($query3);

//echo  $query3;
//echo "<br>";

}
else
{
 $query2 = "update trnpur_deliverychallan_header set  dch_date = '$dchdate', dch_party = '$dchparty',dch_dept ='$dchdept',dch_totqty ='$dchtotqty',dch_freight = '$dchfreight', dch_freight_type = '$dchfreighttype',dch_return_days='$dchdays',dch_remarks ='$dchremarks',dch_refno ='$dchrefno',dch_refdate = '$dchrefdate',dch_truck = '$dchtruck' , dch_despthro = '$dchdespthro'  where dch_fincode = $dchfincode and dch_comp_code=$dchcompcode and dch_no = $dchno and dch_type = '$dchtype'";
    $result2= mysql_query($query2);

 $query3 = "delete from trnpur_deliverychallan_trailer where dct_fincode = $dchfincode and dct_comp_code=$dchcompcode and dct_no = $dchno and dct_type = '$dchtype'";
 $result3= mysql_query($query3);

}

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;

$itemcode = $griddet[$i]['itemcode'];
$issqty   = (float) $griddet[$i]['qty'];
$rate     = (float) $griddet[$i]['rate'];
//$spec     = $griddet[$i]['specification'];
//$purpose  = $griddet[$i]['purpose'];

$spec     = strtoupper($griddet[$i]['specification']);
$purpose  = strtoupper($griddet[$i]['purpose']);


$hsn      = $griddet[$i]['hsn'];

$spec = str_replace("'","", $spec );
$purpose = str_replace("'","", $purpose );

$query4= "insert into  trnpur_deliverychallan_trailer values('$dchcompcode', '$dchfincode', '$dchno', '$dchdate','$dchtype', '$itemcode','$sno', '$issqty', '0', '$rate','$spec','$purpose', '$hsn')";
$result4=mysql_query($query4);  

//echo  $query4;
//echo "<br>";

}


if ($savetype == "Add") 
{
        if($result3 && $result4)
        {
            mysql_query("COMMIT");                        
            echo '({"success":"true","dcno":"'.$dcno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
            echo '({"success":"false","dcno":"'.$dcno.'"})';
        }   
}
else
{
        if($result2 && $result3 && $result4)
        {
            mysql_query("COMMIT");                        
            echo '({"success":"true","dcno":"'.$dcno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
            echo '({"success":"false","dcno":"'.$dcno.'"})';
        }   

}        

       
 
?>
