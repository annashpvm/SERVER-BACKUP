<?php
	require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
	session_start();

	$griddet = json_decode($_REQUEST['griddet'],true);
	$rowcnt = $_REQUEST['cnt'];

    $gstFlag   = $_REQUEST['gstFlag'];
	$compcode  = $_REQUEST['compcode'];
	$finid     = $_REQUEST['finid'];
	$cdentryno = $_REQUEST['entryno'];
	$entrydate = $_REQUEST['entrydate'];
	$supcode   = $_REQUEST['supcode'];
	$pono      = $_REQUEST['pono'];
	$podate    = $_REQUEST['podate'];
	$grnno     = $_REQUEST['grnno'];
	$grndate   = $_REQUEST['grndate'];
	$billno    = $_REQUEST['billno'];
	$billdate  = $_REQUEST['billdate'];
    $truckno   = $_REQUEST['truckno'];
	$itemcode  = $_REQUEST['itemcode'];
	$billqty   = $_REQUEST['billqty'];
	$actqty    = $_REQUEST['actqty'];
	mysql_query("BEGIN");





        if ($gstFlag === "Add") {
		 $query1 = "select ifnull(max(qc_cd_entryno),0)+1 as qc_cd_entryno from trn_qc_chemical_inspection where qc_cd_fincode = '$finid' and qc_cd_compcode ='$compcode'";
		 $result1= mysql_query($query1);
		 $rec2 = mysql_fetch_array($result1);
		 $cdentryno=$rec2['qc_cd_entryno'];


        }
        else
        {
         $query1 = "delete from trn_qc_chemical_inspection where qc_cd_compcode = '$compcode' and qc_cd_fincode = '$finid' and qc_cd_entryno = $cdentryno";
		 $result1= mysql_query($query1);

        }              
 	
	for ($i=0;$i<$rowcnt;$i++)
	{
		$sno = $i + 1;


            	$slno          = $sno; 
		$paracode      = (int)$griddet[$i]['paracode'];
		if ($paracode > 0 )
        {
		$specification = $griddet[$i]['specification'];
		$measurecode   = (int)$griddet[$i]['measurecode'];
		$observation   = $griddet[$i]['observation'];
		$status        = substr($griddet[$i]['status'],0,1);
		$remarks       = strtoupper($griddet[$i]['remarks']);

   


             
        $query2 = "INSERT INTO trn_qc_chemical_inspection 
    (qc_cd_compcode, qc_cd_fincode, qc_cd_entryno, qc_cd_entdate, qc_cd_supcode, qc_cd_pono, qc_cd_pondate, qc_cd_grnno, qc_cd_grndate, qc_cd_billno, qc_cd_billdate, qc_cd_truck, qc_cd_itemcode, qc_cd_billqty, qc_cd_actqty,  qc_cd_slno, qc_cd_param_code,qc_cd_specificaton, qc_cd_measuring_code, qc_cd_observation, qc_cd_status, qc_cd_remarks)   VALUES      ('$compcode','$finid','$cdentryno','$entrydate','$supcode','$pono','$podate','$grnno','$grndate','$billno','$billdate','$truckno','$itemcode' , '$billqty' ,'$actqty','$sno','$paracode','$specification','$measurecode','$observation','$status','$remarks')";



//echo $query2;
//echo "<br>";


       $result2=mysql_query($query2);
	} 
}



if( $result2  )
{
	mysql_query("COMMIT");                        
	echo '({"success":"true","EntryNo":"' . $cdentryno . '"})';

	    
}
else
{
    mysql_query("ROLLBACK");            
    echo '({"success":"false","EntryNo":"' . $cdentryno . '"})';
}
 
?>
