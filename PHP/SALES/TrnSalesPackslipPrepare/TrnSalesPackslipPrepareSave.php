<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$gridPslip = json_decode($_POST['gridPslip'],true);
$cnt = $_POST['cnt'];
$gstFlag = $_POST['gstFlag'];
$compcode = $_POST['compcode'];
$finid = $_POST['finid'];
$slipno = $_POST['slipno'];
$slipdt = $_POST['slipdt'];
$socno = $_POST['socno'];
$socdt = $_POST['socdt'];
$advno = $_POST['advno'];
$advdt = $_POST['advdt'];
$nofreel = $_POST['nofreel'];
$totwt = $_POST['totwt'];
$slipnow = $_POST['slipnow'];
$slipstat = $_POST['slipstat'];
$vehicleno = $_POST['vehicleno'];


if ($gstFlag === "Add")
{

 mysql_query("BEGIN");
	 $query1 = "insert into trnware_packslip_header (wpckh_comp_code, wpckh_fincode, wpckh_no, wpckh_date,
	 		wpckh_socno, wpckh_socdt, wpckh_dano, wpckh_dadt, wpckh_noofbun, wpckh_noofreels, wpckh_totwt,
	 		wpckh_slipno, wpckh_slipstat, wpckh_vehicleno) Values ( '$compcode', '$finid','$slipno','$slipdt','$socno', 
	 		'$socdt', '$advno' , '$advdt', 0,'$nofreel','$totwt', '$slipnow', '$slipstat',UPPER('$vehicleno'))";
	$result1=mysql_query($query1);

	for ($i=0;$i<$cnt;$i++)
	{
	$sno = $i + 1;
	
	$icode = $gridPslip[$i]['icode'];
	$num = $gridPslip[$i]['num'];
	$unitcode = $gridPslip[$i]['unitcode'];
	$weight = $gridPslip[$i]['weight'];
	$fincode = $gridPslip[$i]['fincode'];


	 $query2= "insert into trnware_packslip_trailer (wpckt_comp_code, wpckt_fincode, wpckt_no, wpckt_var, wpckt_sr_no, wpckt_unit,
	 		wpckt_wt, wpckt_selected, wpckt_srno_fincode) values ('$compcode', '$finid', '$slipno', '$icode', '$num','$unitcode',
	 		'$weight','N', '$fincode' )";
	 $result2=mysql_query($query2);      

	}
	
	$query3 = "call spsal_upd_packslip ( '$compcode', '$finid', '$socno', '$advno')";
                  
	$result3= mysql_query($query3);

	
}
     
if ($gstFlag === "Add")
{
	if($result1 && $result2 && $result3)
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","PSNo":"'.$slipno.'"})';
	}
	else
	       {
		echo '({"success":"false","PSNo":"'.$slipno.'"})';
		mysql_query("ROLLBACK");            
		    
		} 
}

  
        

       
 
?>
