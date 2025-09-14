<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$saveflag   = $_POST['saveflag'];
$taxledcode   = $_POST['taxledcode'];

$taxname        = $_POST['taxname'];

$taxsgst_ledcode= (int)$_POST['taxsgst_ledcode'];
$taxcgst_ledcode= (int)$_POST['taxcgst_ledcode'];
$taxigst_ledcode= (int)$_POST['taxigst_ledcode'];
$taxsgst        = (float)$_POST['taxsgst'];
$taxcgst        = (float)$_POST['taxcgst'];
$taxigst        = (float)$_POST['taxigst'];

//$totgst = $taxcgst + $taxsgst + $taxigst;

$totgst = $taxcgst + $taxsgst;

$taxsgst_ledger = $_POST['taxsgst_ledger'];
$taxcgst_ledger = $_POST['taxcgst_ledger'];
$taxigst_ledger = $_POST['taxigst_ledger'];

$state          = $_POST['state'];

if ($saveflag   == "Add")
{

	$qry = "select count(*) as cnt from maspur_gsttax where tax_pur_ledname = '$taxname'";
	$res  = mysql_query($qry);
	$recvar = mysql_fetch_array($res);
	$cnt=$recvar['cnt'];

	$qry2 = "select count(*) as cnt2 from massal_customer where cust_name = '$taxname'";
	$res  = mysql_query($qry2);
	$recvar = mysql_fetch_array($res);
	$cnt2=$recvar['cnt2'];

//echo $qry;
	if($cnt==0 && $cnt2 > 0 )
	{


	  $query1="insert into maspur_gsttax values($taxledcode,upper('$taxname'), $taxcgst_ledcode,$taxsgst_ledcode,$taxigst_ledcode,'$taxcgst', '$taxsgst','$taxigst','$taxcgst_ledger','$taxsgst_ledger', '$taxigst_ledger', '$totgst','$state')"; 


	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $taxname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $taxname . '"})';
	}
}

else
{




	  $query1="update maspur_gsttax set tax_cgst_per = '$taxcgst' , tax_sgst_per = '$taxsgst' , tax_igst_per = '$taxigst', tax_cgst_ledcode = '$taxcgst_ledcode', tax_sgst_ledcode = '$taxsgst_ledcode', tax_igst_ledcode = '$taxigst_ledcode' , tax_cgst_ledname = '$taxcgst_ledger' , tax_sgst_ledname = '$taxsgst_ledger', tax_igst_ledname = '$taxigst_ledger' ,tax_state = '$state' where  tax_pur_ledcode = $taxledcode"; 

//echo  $query1;
	  $result1 = mysql_query($query1);

	  if ($result1 ) {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $taxname . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $taxname . '"})';
	}
} 
   
?>
