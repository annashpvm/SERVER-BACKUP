<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$saveflag   = $_POST['saveflag'];

$supname = $_POST['supname'];
$bankname = $_POST['bankname'];
$bankbranch = $_POST['bankbranch'];
$bankifsc = $_POST['bankifsc'];
$bankacno = $_POST['bankacno'];

	$qry = "select count(*) as cnt from maspur_supplier_bank where sup_name = '$supname'";
	$res  = mysql_query($qry);
	$recvar = mysql_fetch_array($res);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into maspur_supplier_bank 
( sup_name, sup_bank_bankname, sup_bank_branch, sup_bank_ifsc, sup_bank_bank_acno)
values(upper('$supname'),upper('$bankname'),upper('$bankbranch'),upper('$bankifsc'),'$bankacno' )"; 

	  $result1 = mysql_query($query1);
	}
        else
         {
	  $query1="update maspur_supplier_bank set sup_name  = upper('$supname'), sup_bank_bankname = upper('$bankname'), sup_bank_branch = upper('$bankbranch'), sup_bank_ifsc = upper('$bankifsc'), sup_bank_bank_acno = upper('$bankacno')  where sup_name  = upper('$supname')"; 

//echo $query1;
	  $result1 = mysql_query($query1);

         }   



	  if ($result1 ) {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $supname . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $supname . '"})';
	}
   
?>
