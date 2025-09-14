<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();


$reelgriddet = json_decode($_POST['reelgriddet'],true);
$bundlegriddet = json_decode($_POST['bundlegriddet'],true);
$reelcnt = $_POST['reelcnt'];
$bundlecnt = $_POST['bundlecnt'];
$compcode =$_POST['compcode'];
$fincode =$_REQUEST['fincode'];
$stkyear =$_REQUEST['stkyear'];

$docno = $_POST['docno'];
$docdate = $_POST['docdate'];
$saveflag =$_REQUEST['saveflag'];


//if ($saveflag == "Add") {

	 $query1  = "select IFNULL(max(tr_entno),0)+1 as tr_entno from trnsal_whouse_stock_remove where  tr_compcode ='$compcode' and tr_finyear ='$fincode'";
	 $result1 = mysql_query($query1);
	 $rec1    = mysql_fetch_array($result1);
	 $docno   = $rec1['tr_entno'];
//}


 mysql_query("BEGIN");

 if ($docno > 0 )
 { 
    $inscnt = 0;
    if ($reelcnt > 0) {

	for ($i=0;$i<$reelcnt;$i++)
	{
		$sno = $i + 1;
		$sizecode  = $reelgriddet[$i]['sizecode'];
		$sizename  = $reelgriddet[$i]['sizename'];
		$rbno      = $reelgriddet[$i]['rbno'];
		$weight    = $reelgriddet[$i]['weight'];
		$tag       = $reelgriddet[$i]['tag'];
		$mill      = $reelgriddet[$i]['mill'];
		$stockfrom = $reelgriddet[$i]['stockfrom'];
		$finyear   = $reelgriddet[$i]['finyear'];
		$rg1date   = $reelgriddet[$i]['rg1date'];
		if ( $tag  == "T") {
                      $query2 = "call spsal_move_wip('$compcode','$fincode','$docno','$docdate','$sizecode','1','$rbno', '$weight', '$mill' ,'$stockfrom','$finyear','$rg1date');";
                      $result2 = mysql_query($query2);
//echo $query2;                      
		} 
	}
   }
   else {
	for ($i=0;$i<$bundlecnt;$i++)
	{
		$sno = $i + 1;
		$sizecode  = $bundlegriddet[$i]['sizecode'];
		$sizename  = $bundlegriddet[$i]['sizename'];
		$rbno      = $bundlegriddet[$i]['rbno'];
		$weight    = $bundlegriddet[$i]['weight'];
		$tag       = $bundlegriddet[$i]['tag'];
		$mill      = $bundlegriddet[$i]['mill'];
		$stockfrom = $bundlegriddet[$i]['stockfrom'];
		$finyear   = $bundlegriddet[$i]['finyear'];
		$rg1date   = $bundlegriddet[$i]['rg1date'];

		if ( $tag  == "T") {
                      $query2 = "call spsal_move_wip('$compcode','$fincode','$docno','$docdate','$sizecode','2','$rbno', '$weight', '$mill' ,'$stockfrom','$finyear','$rg1date');";
                      $result2 = mysql_query($query2);
//echo $query2;

		} 
	}

   } 
   
}
  
if($result2)
{
mysql_query("COMMIT");                        
echo '({"success":"true","msg":"'.$docno.'"})';
}
else
{
echo '({"success":"false","msg":"'.$docno.'"})';
mysql_query("ROLLBACK");            
    
} 
        

       
 
?>
