<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet  = json_decode($_POST['griddet'],true);
$rowcnt      = $_POST['cnt'];
$compcode    = $_POST['compcode'];
$finid       = $_REQUEST['finid'];
$savetype    = $_POST['savetype'];
$gpno        = $_POST['gpno'];
$gpdate      = $_POST['gpdate'];
$transport   = $_POST['transport'];
$destination = $_POST['destination'];
$invnos      = $_POST['invnos'];

if ($savetype === "Add")
{

	 $query1  = "select ifnull(max(gp_no),0)+1 as gp_no from  trnsal_gate_pass where gp_fincode  = $finid  and gp_compcode = $compcode";
	 $result1 = mysql_query($query1);
	 $rec1    = mysql_fetch_array($result1);
	 $gpno    = $rec1['gp_no'];
}
   
 mysql_query("BEGIN");

 if ($gpno > 0 )
 { 
	$inscnt = 0;
	for ($i=0;$i<$rowcnt;$i++)
	{
		$sno = $i + 1;
		$custname = $griddet[$i]['custname'];
		$custcode = $griddet[$i]['custcode'];
		$invno    = $griddet[$i]['invno'];
		$invwt    = $griddet[$i]['invwt'];
		$nos      = $griddet[$i]['nos'];
		$truckno  = $griddet[$i]['truckno'];
		$query2= "insert into trnsal_gate_pass values('$compcode','$finid','$gpno','$gpdate','$truckno','$transport', '$custcode','$destination','$invno','$invno','$invwt','$nos',0,0,0)";
		 $result2=mysql_query($query2);           
  
	}

}

if ($savetype === "Add")
{
	if($result1 && $result2)
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","gpno":"'.$gpno.'"})';
	}
	else
        {
          echo '({"success":"false","gpno":"'.$gpno.'"})';
	  mysql_query("ROLLBACK");            
	} 
}
  
        

       
 
?>
