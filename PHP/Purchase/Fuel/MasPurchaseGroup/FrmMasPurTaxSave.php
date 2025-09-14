<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$saveflag       = $_POST['saveflag'];
$purledcode     = $_POST['purledcode'];
$purledname        = $_POST['purledname'];
$totgst         = $_POST['taxgst'];
$taxsgst_ledcode= (int)$_POST['taxsgst_ledcode'];
$taxcgst_ledcode= (int)$_POST['taxcgst_ledcode'];
$taxigst_ledcode= (int)$_POST['taxigst_ledcode'];
$taxsgst        = (float)$_POST['taxsgst'];
$taxcgst        = (float)$_POST['taxcgst'];
$taxigst        = (float)$_POST['taxigst'];

$taxsgst_ledger = $_POST['taxsgst_ledger'];
$taxcgst_ledger = $_POST['taxcgst_ledger'];
$taxigst_ledger = $_POST['taxigst_ledger'];

$purtype        = 'FU';


if ($saveflag   == "Add")
{


	$qry = "select count(*) as cnt from mas_RMFU_purchasetax where tax_purname = '$purledname'";
	$res  = mysql_query($qry);
	$recvar = mysql_fetch_array($res);
	$cnt=$recvar['cnt'];

//echo $cnt;

	if($cnt==0)
	{
	  $query1="insert into mas_RMFU_purchasetax values($purledcode,upper('$purledname') , '$taxcgst', '$taxsgst','$taxigst',	'$taxcgst_ledcode','$taxsgst_ledcode','$taxigst_ledcode','$taxcgst_ledger','$taxsgst_ledger','$taxigst_ledger','$totgst','$purtype',1)"; 

//echo $query1;

	  $result1 = mysql_query($query1);
	}

	  if ($result1 && $cnt==0) {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $purledname . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $purledname . '"})';
	}
}

else
{

	  $query1="update mas_RMFU_purchasetax set tax_purname = upper('$purledname') ,tax_cgstper = '$taxcgst' , tax_sgstper = '$taxsgst' , tax_igstper = '$taxigst', tax_cgstledcode = '$taxcgst_ledcode', tax_sgstledcode = '$taxsgst_ledcode', tax_igstledcode = '$taxigst_ledcode' , tax_cgstledger = '$taxcgst_ledger' , tax_sgstledger = '$taxsgst_ledger', tax_igstledger = '$taxigst_ledger' , tax_gst = $totgst where  tax_purcode = $purledcode"; 

//echo $query1;
	  $result1 = mysql_query($query1);

	  if ($result1 ) {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $purledname . '"})';
	
	}else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $purledname . '"})';
	}
} 
   
?>
