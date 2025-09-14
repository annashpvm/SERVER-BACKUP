<?php
	require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
	session_start();

	$griddet = json_decode($_REQUEST['griddet'],true);
	$rowcnt = $_REQUEST['cnt'];


	$gstFlag = $_REQUEST['gstFlag'];
	$compcode = $_REQUEST['compcode'];
	$finid = $_REQUEST['finid'];
	$fuelentryno =$_REQUEST['entryno'];
	$entrydate = $_REQUEST['entrydate'];
	$ticketdate = $_REQUEST['ticketdate'];
	$truckno = $_REQUEST['truckno'];
	$supcode = $_REQUEST['supcode'];
	$areacode = $_REQUEST['areacode'];

	$itemcode = $_REQUEST['itemcode'];
	$weight = $_REQUEST['weight'];
        $ticketno  = $_REQUEST['ticketno'];

        $vessel  = $_REQUEST['vessel'];


        $totaldedqty  =  (float) $_REQUEST['totaldedqty'];
        $acceptedqty  =  (float) $_REQUEST['acceptedqty'];
        $partyqty     =  (float) $_REQUEST['partyqty'];
        $millqty      =  (float) $_REQUEST['millqty'];

        $itemrate      =  (float) $_REQUEST['itemrate'];
        $otherdedqty   =  (int) $_REQUEST['otherdedqty'];


        $degradeqty      =  (float) $_REQUEST['degradeqty'];
        $degradeitemcode =  (int) $_REQUEST['degradeitemcode'];
        $degradeitemrate =  (float) $_REQUEST['degradeitemrate'];


         $today = date("Y-m-d H:i:s"); 

	mysql_query("BEGIN");
        if ($gstFlag === "Add") {
		 $query1 = "select ifnull(max(qc_fuel_entryno),0)+1 as entryno from trn_qc_fuel_inspection where qc_fuel_fincode = '$finid' and qc_fuel_compcode ='$compcode'";
		 $result1= mysql_query($query1);
		 $rec2 = mysql_fetch_array($result1);
		 $fuelentryno=$rec2['entryno'];

                 $query1 = "insert into trn_qc_fuel_inspection (qc_fuel_compcode,qc_fuel_fincode,qc_fuel_entryno, qc_fuel_entrydate ,qc_fuel_ticketdate,qc_fuel_supcode,qc_fuel_area,qc_fuel_truck,qc_fuel_ticketno,qc_fuel_itemcode,
qc_fuel_ticketwt,qc_fuel_tot_ded_qty,qc_fuel_acceptqty,qc_fuel_billqty,qc_fuel_millqty,qc_fuel_vessel_name,qc_fuel_itemrate,
qc_fuel_otherdedqty ,qc_fuel_degrade_item, qc_fuel_degrade_qty, qc_fuel_degrade_rate,qc_fuel_dataentrydate) values ('$compcode','$finid','$fuelentryno', '$entrydate' ,'$ticketdate','$supcode','$areacode', '$truckno', '$ticketno' , '$itemcode','$weight', '$totaldedqty','$acceptedqty', '$partyqty','$millqty', '$vessel', '$itemrate','$otherdedqty','$degradeitemcode','$degradeqty','$degradeitemrate','$today')";
	 $result1= mysql_query($query1);

//echo $query1;

 
                $query3 = "update trn_weight_card set wc_process = 'Y' WHERE wc_compcode = '$compcode' and wc_fincode = '$finid' and wc_date = '$ticketdate' and  wc_ticketno = $ticketno";

//echo $query3;
	
                $result3=mysql_query($query3);

        }
        else
        {

                $query1 = "update trn_qc_fuel_inspection set  qc_fuel_itemcode = $itemcode ,
qc_fuel_tot_ded_qty = $totaldedqty , qc_fuel_ticketwt = $weight , qc_fuel_acceptqty ='$acceptedqty' , qc_fuel_vessel_name = '$vessel', qc_fuel_itemrate = '$itemrate' , qc_fuel_supcode = '$supcode' , qc_fuel_otherdedqty = '$otherdedqty',  qc_fuel_degrade_item = '$degradeitemcode' , qc_fuel_degrade_qty = '$degradeqty', qc_fuel_degrade_rate = '$degradeitemrate', qc_fuel_modifydate = '$today' where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $fuelentryno";

//echo $query1;
	 $result1= mysql_query($query1);


        }   




	for ($i=0;$i<$rowcnt;$i++)
	{
		$sno = $i + 1;
         	$parameter = $griddet[$i]['parameter'];
         	$qcchk     = $griddet[$i]['qcchk'];
		$fixed     = (float) $griddet[$i]['fixed'];
		$actual    = (float) $griddet[$i]['actual'];
		$diff      = (float) $griddet[$i]['differ'];
		$qty       = (float) $griddet[$i]['dedqty'];


                if ($parameter == "TOTAL MOISTURE")
                {
                $query2 = "update trn_qc_fuel_inspection set qc_fuel_mois_arb_debit_yn = '$qcchk',
qc_fuel_mois_arb_fixed = $fixed , qc_fuel_mois_arb_actual = $actual , qc_fuel_mois_arb_diff = $diff, qc_fuel_mois_arb_qty = $qty where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $fuelentryno ";
          
//     echo $query2;
                $result2=mysql_query($query2);
                }   



                if ($parameter == "INHERENT MOISTURE")
                {
                $query2 = "update trn_qc_fuel_inspection set qc_fuel_mois_adb_debit_yn = '$qcchk',
qc_fuel_mois_adb_fixed = $fixed , qc_fuel_mois_adb_actual = $actual , qc_fuel_mois_adb_diff = $diff, qc_fuel_mois_adb_qty = $qty where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $fuelentryno ";
                $result2=mysql_query($query2);

  //   echo $query2;


                }   



                if ($parameter == "ASH")
                {
                $query2 = "update trn_qc_fuel_inspection set qc_fuel_ash_debit_yn = '$qcchk',
qc_fuel_ash_fixed = $fixed , qc_fuel_ash_actual = $actual , qc_fuel_ash_diff = $diff, qc_fuel_ash_qty = $qty where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $fuelentryno ";
                $result2=mysql_query($query2);

 //    echo $query2;
                }
   

                if ($parameter == "VOLATILE MATTER")
                {
                $query2 = "update trn_qc_fuel_inspection set  qc_fuel_volatile_debit_yn = '$qcchk',
qc_fuel_volatile_fixed = $fixed , qc_fuel_volatile_actual = $actual , qc_fuel_volatile_diff = $diff, qc_fuel_volatile_qty = $qty where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $fuelentryno ";
                $result2=mysql_query($query2);
   //  echo $query2;
                }   


                if ($parameter == "FIXED CARBON")
                {
                $query2 = "update trn_qc_fuel_inspection set  qc_fuel_fixedcarbon_debit_yn = '$qcchk',
qc_fuel_fixedcarbon_fixed = $fixed , qc_fuel_fixedcarbon_actual = $actual , qc_fuel_fixedcarbon_diff = $diff, qc_fuel_fixedcarbon_qty = $qty where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $fuelentryno ";
//  echo $query2;
                $result2=mysql_query($query2);
                }   

                if ($parameter == "FINES")
                {
                $query2 = "update trn_qc_fuel_inspection set  qc_fuel_fines_debit_yn = '$qcchk',
qc_fuel_fines_fixed = $fixed , qc_fuel_fines_actual = $actual , qc_fuel_fines_diff = $diff, qc_fuel_fines_qty = $qty where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $fuelentryno ";
                $result2=mysql_query($query2);

  //echo $query2;
                }   


                if ($parameter == "SAND")
                {
                $query2 = "update trn_qc_fuel_inspection set  qc_fuel_sand_debit_yn = '$qcchk',
qc_fuel_sand_fixed = $fixed , qc_fuel_sand_actual = $actual , qc_fuel_sand_diff = $diff, qc_fuel_sand_qty = $qty where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $fuelentryno ";
    // echo $query2;
                $result2=mysql_query($query2);
                }  


                if ($parameter == "IRON")
                {
                $query2 = "update trn_qc_fuel_inspection set  qc_fuel_iron_debit_yn = '$qcchk',
qc_fuel_iron_fixed = $fixed , qc_fuel_iron_actual = $actual , qc_fuel_iron_diff = $diff, qc_fuel_iron_qty = $qty where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $fuelentryno ";
                $result2=mysql_query($query2);
//     echo $query2;
                }  



                if ($parameter == "GCV(KCAL/KG)")
                {
                $query2 = "update trn_qc_fuel_inspection set  qc_fuel_gcv_adb_debit_yn = '$qcchk',
qc_fuel_gcv_adb_fixed = $fixed , qc_fuel_gcv_adb_actual = $actual , qc_fuel_gcv_adb_diff = $diff, qc_fuel_gcv_adb_qty = $qty where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $fuelentryno ";

  //   echo $query2;
                $result2=mysql_query($query2);
                }  



                if ($parameter == "GCV(KCAL /KG)")
                {
                $query2 = "update trn_qc_fuel_inspection set  qc_fuel_gcv_arb_debit_yn = '$qcchk',
qc_fuel_gcv_arb_fixed = $fixed , qc_fuel_gcv_arb_actual = $actual , qc_fuel_gcv_arb_diff = $diff, qc_fuel_gcv_arb_qty = $qty where qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and  qc_fuel_entryno = $fuelentryno ";
                $result2=mysql_query($query2);
//     echo $query2;
                }  




}
if($result1 && $result2 )
{
	mysql_query("COMMIT");                        
	echo '({"success":"true","EntryNo":"' . $fuelentryno . '"})';

	    
}
else
{
    mysql_query("ROLLBACK");            
    echo '({"success":"false","EntryNo":"' . $fuelentryno . '"})';
}
 
?>
