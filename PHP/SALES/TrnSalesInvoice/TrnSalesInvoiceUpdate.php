<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$invhcompcode   = $_POST['invhcompcode'];
$invhfincode    = $_POST['invhfincode'];
$invhrefno      = $_POST['invhrefno'];
$invhcrddays    =  (int)$_POST['invhcrddays'];
$invhgracedays  = (int)$_POST['invhgracedays'];
$invhparty      = $_POST['invhparty'];
$ewaybillno     = $_POST['ewaybillno'];
$accseqno       = $_POST['accseqno'];

$crdays = $invhgracedays + $invhcrddays;

$invhvehino = $_POST['invhvehino'];

$invhslipno = $_POST['invhslipno'];
$invhslipdt = $_POST['invhslipdt'];




$query1= "update trnsal_invoice_header set invh_crd_days = '$invhcrddays' ,  invh_grace_days = '$invhgracedays'  where invh_invrefno = '$invhrefno'  and invh_fincode = '$invhfincode'  and invh_comp_code = '$invhcompcode'";

//$query1= "update trnsal_invoice_header set invh_crd_days = '$invhcrddays',invh_ewaybillno = '$ewaybillno',U_EWayBillNo = '$ewaybillno'  where invh_invrefno = '$invhrefno'  and invh_fincode = '$invhfincode'  and invh_comp_code = '$invhcompcode'";

$result1=mysql_query($query1);            

//echo $query1;
//echo "<br>";
         


$query2= "update  acc_trail set acctrail_crdays = '$invhcrddays' , acctrail_gracedays =  '$invhgracedays'  where  acctrail_accref_seqno =$accseqno";
$result2=mysql_query($query2);   
 

$query5= "update trnsal_packslip_header set pckh_truck = '$invhvehino' Where pckh_no = $invhslipno  and pckh_fincode = '$invhfincode'  and pckh_comp_code = '$invhcompcode'";
	      
	$result5=mysql_query($query5);    


//Accounts Updation --- End




if ($result1 && $result2)
{
   mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $invhrefno . '"})';
} 
	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $invhrefno . '"})';
}
  
   
?>
