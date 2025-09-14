<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];
$griddet      = json_decode($_REQUEST['griddet'],true);
$rowcnt       = $_POST['cnt'];
$invseqno     = $_POST['invseqno'];
$invhno       = $_POST['invhno'];
$invhcompcode = $_POST['compcode'];
$invhfincode  = $_POST['finid'];
$bcd          = (float)$_POST['bcd'];
$acd          = (float)$_POST['acd'];
$sws          = (float)$_POST['sws'];
$cvd          = (float)$_POST['cvd'];
$otherdurty   = (float)$_POST['otherdurty'];
$interest     = (float)$_POST['interest'];
$penalty      = (float)$_POST['penalty'];
$fine         = (float)$_POST['fine'];
$igst         = (float)$_POST['igst'];
$totduty      = (float)$_POST['totduty'];
$totclearing  = (float)$_POST['totclearing'];



 $query3= "update trnirm_invoice_header set invh_BCD = '$bcd',invh_ACD = '$acd', invh_SWS = '$sws', invh_CVD = '$cvd', invh_IGST = '$igst' , invh_otherduty = '$otherdurty', invh_interest ='$interest', invh_penalty = '$penalty', invh_fine = '$fine' , invh_totduty = '$totduty', invh_clearing = '$totclearing' where invh_compcode = '$invhcompcode' and  invh_fincode = '$invhfincode'  and invh_seqno = '$invseqno'";


 $result3=mysql_query($query3);

//  echo  $query3;

  $query4= "delete from trnirm_invoice_expenses where invc_hdcode = '$invseqno'";
  $result4=mysql_query($query4);

//  echo  $query4;




for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;

$parycode = $griddet[$i]['parycode'];
$invno    = $griddet[$i]['invno'];
$invdate  = $griddet[$i]['invdate'];
$handling = (float)$griddet[$i]['handling'];
$maint    = (float)$griddet[$i]['maint'];
$usage    = (float)$griddet[$i]['usage'];
$admin    = (float)$griddet[$i]['admin'];
$clearing = (float)$griddet[$i]['clearing'];
$additional = (float)$griddet[$i]['additional'];
$custduty = (float)$griddet[$i]['custduty'];
$demurrage = (float)$griddet[$i]['demurrage'];
$service = (float)$griddet[$i]['service'];
$others = (float)$griddet[$i]['others'];
$taxable = (float)$griddet[$i]['taxable'];
$cgstper = (float)$griddet[$i]['cgstper'];
$cgstamt = (float)$griddet[$i]['cgstamt'];
$sgstper = (float)$griddet[$i]['sgstper'];
$sgstamt = (float)$griddet[$i]['sgstamt'];
$igstper = (float)$griddet[$i]['igstper'];
$igstamt = (float)$griddet[$i]['igstamt'];
$invamt  = (float)$griddet[$i]['invamt'];

 $query4= "insert into trnirm_invoice_expenses values (
'$invseqno', '$sno', '$parycode','$invno','$invdate','$handling','$maint','$usage','$admin','$clearing', '$additional', '$custduty','$demurrage','$service','$others','$taxable','$cgstper','$cgstamt','$sgstper','$sgstamt','$igstper','$igstamt','$invamt')";
 $result4=mysql_query($query4);            
  
//echo  $query4;

}



if( $result3 && $result4 )
{
            mysql_query("COMMIT");                        
            echo '({"success":"true","ino":"'.$invhno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false","ino":"' .$invhno. '"})';
        }   
        

   
?>
