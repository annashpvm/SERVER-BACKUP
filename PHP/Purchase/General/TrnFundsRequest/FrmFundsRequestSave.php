<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$saveflag   = $_POST['saveflag'];
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$savetype   = $_POST['saveflag'];
$compcode   = $_POST['compcode'];
$finid	    = $_POST['finid'];
$entno      = $_POST['entno'];
$entdate    = $_POST['entdate'];


mysql_query("BEGIN");

if ($savetype == "Add") {

       $query = "select ifnull(max(f_frm_no),0)+1 as f_frm_no from trn_frm where f_fincode='$finid' and f_compcode='$compcode'";
       $result = mysql_query($query);
       $rec = mysql_fetch_array($result);
       $entno=$rec['f_frm_no'];

}
else
{
       $query = "delete from trn_frm where f_fincode='$finid' and f_compcode='$compcode' and f_frm_no = $entno";
       $result = mysql_query($query);
       
}

for ($i=0;$i<$rowcnt;$i++)
{

$slno		   =$griddet[$i]['slno'];
$suppliername	   = strtoupper($griddet[$i]['sup_name']);
$bank      	   = strtoupper($griddet[$i]['sup_bank']);
$sup_bank_bankname = strtoupper($griddet[$i]['sup_bank_bankname']);
$sup_bank_branch   = strtoupper($griddet[$i]['sup_bank_branch']);
$sup_bank_ifsc	   = strtoupper($griddet[$i]['sup_bank_ifsc']);
$sup_bank_bank_acno= strtoupper($griddet[$i]['sup_bank_bank_acno']);
$amount            =(float)$griddet[$i]['amount']; 
$reason            = $griddet[$i]['reason'];




$query1= "insert into trn_frm (
f_compcode, f_fincode, f_frm_no, f_frm_date,f_sno,  f_supplier,f_bank, f_bankname, f_bankbranch, f_bankifsc, f_bankacno, f_amount,f_reason) values ('$compcode','$finid','$entno','$entdate','$slno','$suppliername','$bank ','$sup_bank_bankname','$sup_bank_branch','$sup_bank_ifsc','$sup_bank_bank_acno','$amount','$reason')";

$result1 = mysql_query($query1);
// echo $query1;

}



if($result1) 
{
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $indno . '"})';
} 
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $indno . '"})';
}
  

   
?>
