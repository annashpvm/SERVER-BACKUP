<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$saveflag   = $_POST['saveflag'];
$taxseq   = $_POST['taxseq'];

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

if ($saveflag   == "Add")
{
	$query  = "select ifnull(max(tax_code),0)+1 as taxseq from mas_purchasetax";
	$result = mysql_query($query);
	$rec    = mysql_fetch_array($result);
        $taxseq = $rec['taxseq'];


	$qry = "select count(*) as cnt from mas_purchasetax where tax_name = '$taxname'";
	$res  = mysql_query($qry);
	$recvar = mysql_fetch_array($res);
	$cnt=$recvar['cnt'];

	if($cnt==0)
	{
	  $query1="insert into mas_purchasetax values($taxseq,upper('$taxname') , '$taxcgst', '$taxsgst','$taxigst',
	'$taxcgst_ledcode','$taxsgst_ledcode', '$taxigst_ledcode','$taxcgst_ledger','$taxsgst_ledger','$taxigst_ledger','$totgst')"; 


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

	  $query1="update mas_purchasetax set tax_name = upper('$taxname') ,tax_cgstper = '$taxcgst' , tax_sgstper = '$taxsgst' , tax_igstper = '$taxigst', tax_cgstledcode = '$taxcgst_ledcode', tax_sgstledcode = '$taxsgst_ledcode', tax_igstledcode = '$taxigst_ledcode' , tax_cgstledger = '$taxcgst_ledger' , tax_sgstledger = '$taxsgst_ledger', tax_igstledger = '$taxigst_ledger' , tax_gst = $totgst where  tax_code = $taxseq"; 

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
