<?php
	require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
	session_start();

	$griddet = json_decode($_REQUEST['griddet'],true);
	$rowcnt = $_REQUEST['cnt'];


	$gstFlag = $_REQUEST['gstFlag'];
	$compcode = $_REQUEST['compcode'];
	$finid = $_REQUEST['finid'];
	$rmentryno =$_REQUEST['entryno'];
	$entrydate = $_REQUEST['entrydate'];
	$ticketdate = $_REQUEST['ticketdate'];
	$truckno = $_REQUEST['truckno'];
	$supcode = $_REQUEST['supcode'];
	$areacode = $_REQUEST['areacode'];
	$unloadtime = $_REQUEST['unloadtime'];
	$fsctype    = $_REQUEST['fsctype'];
	$calcyn    = $_REQUEST['calcyn'];

         $today = date("Y-m-d H:i:s"); 

	mysql_query("BEGIN");
        if ($gstFlag === "Add") {
		 $query1 = "select ifnull(max(qc_rm_entryno),0)+1 as qc_rm_entryno from trn_qc_rm_inspection where qc_rm_fincode = '$finid' and qc_rm_compcode ='$compcode'";
		 $result1= mysql_query($query1);
		 $rec2 = mysql_fetch_array($result1);
		 $rmentryno=$rec2['qc_rm_entryno'];

        }
        else
        {

                 $query1 = "update trn_weight_card set wc_process = 'N' where wc_compcode = $compcode and wc_fincode = $finid and wc_ticketno in (select qc_rm_ticketno from trn_qc_rm_inspection where qc_rm_compcode = $compcode and qc_rm_fincode = '$finid' and qc_rm_entryno = $rmentryno)";
		 $result1= mysql_query($query1);


                 $query1 = "delete from trn_qc_rm_inspection where qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $rmentryno";
		 $result1= mysql_query($query1);

        }              
 	
	for ($i=0;$i<$rowcnt;$i++)
	{
		$sno = $i + 1;

    $taxable = 0;


		if ($griddet[$i]['packtype'] == "BUNDLE")
		   $packtype = "B";
		else  
		   $packtype = "L";
         	$slno        = $sno; //  $griddet[$i]['slno'];
		$ticketno    = $griddet[$i]['ticketno'];
		$ticketwt    = $griddet[$i]['ticketwt'];
		$itemcode    = $griddet[$i]['itemcode'];
         	$millboard   = (float)$griddet[$i]['millboard'];
		$moismatrialqty  = (float)$griddet[$i]['moismatrialqty'];
		$moisforqty   = (float)$griddet[$i]['moisforqty'];
		$moisper     = (float)$griddet[$i]['moisper'];
		$moisqty     = (float)$griddet[$i]['moisqty'];
		$lifelessper = (float)$griddet[$i]['lifelessper'];
		$lifelessqty = (float)$griddet[$i]['lifelessqty'];
		$rejectper   = (float)$griddet[$i]['rejectper'];
		$rejectqty   = (float)$griddet[$i]['rejectqty'];
		$degradeqty  = (float)$griddet[$i]['degradeqty'];
		$acceptqty   = (float)$griddet[$i]['acceptqty'];
		$remarks     = $griddet[$i]['remarks'];
		$remarks2    = $griddet[$i]['remarks2'];
		$packtype    = $packtype;
 		$seqno       = $griddet[$i]['seqno'];

  		$itemtype    = $griddet[$i]['itemtype'];

		$acceptqty   = (float)$griddet[$i]['acceptqty'];
		$billwt      = (float)$griddet[$i]['billwt'];
		$millwt      = (float)$griddet[$i]['millwt'];
		$fixedmois   = (float)$griddet[$i]['fixedmois'];
		$rate        = (float)$griddet[$i]['rate'];
		$dedrate     = (float)$griddet[$i]['dedrate'];
		$shortage    = (float)$griddet[$i]['shortage'];
		$bales       = (int)$griddet[$i]['bales'];

		$actmois     = (float)$griddet[$i]['actmois'];
		$moistol     = (float)$griddet[$i]['moistol'];


                if ($itemtype == "F")
                {
                    $dnqty = $ticketwt +  $shortage - $acceptqty - $degradeqty;
//                    if ($acceptqty+$shortage+$degradeqty == $dnqty )
//                        $dnqty = 0;

                } 
                else
                    $dnqty =  $acceptqty;


//$dnqty =  $dnqty / 1000;    

                if ($dedrate >0 && $dnqty > 0)
                   $taxable = round($dnqty/1000 *  $dedrate,3);
                else
                   $taxable = 0;

// New Addion on 20/06/2025 - Start
                if ($rate  >   $dedrate)
                {
         //         $taxable = $taxable + round($ticketwt/1000 *  $dedrate,3);         
                }
 

// New Addion on 20/06/2025 - End

                   
                $query2 = "insert into trn_qc_rm_inspection 
(qc_rm_compcode, qc_rm_fincode, qc_rm_entryno, qc_rm_entrydate, qc_rm_ticketdate, qc_rm_supcode, qc_rm_truck, qc_rm_slno, qc_rm_ticketno, qc_rm_ticketwt, qc_rm_itemcode, qc_rm_millboard, qc_rm_moisper_totalmaterial, qc_rm_moisforqty, qc_rm_moisper, qc_rm_moisqty, qc_rm_llessper, qc_rm_llessqty, qc_rm_rejectper, qc_rm_rejectqty, qc_rm_degradeqty, qc_rm_acceptqty, qc_rm_remarks, qc_rm_packtype, qc_rm_area, qc_rm_unloadingtime,  qc_rm_remarks2, qc_rm_itemtype, qc_rm_fsctype, qc_rm_billqty, qc_rm_millqty,qc_rm_itemmois,qc_rm_rate,qc_rm_calc_need, qc_rm_bales,qc_rm_dataentrydate, qc_rm_shortage ,qc_rm_ded_rate ,qc_rm_ded_qty , qc_rm_taxable,qc_rm_round_need,qc_rm_act_moisure_qty,qc_rm_mois_tolarance ) 
values('$compcode','$finid','$rmentryno','$entrydate' , '$ticketdate', '$supcode', '$truckno','$slno','$ticketno' , '$ticketwt' , '$itemcode','$millboard','$moismatrialqty ','$moisforqty','$moisper','$moisqty', '$lifelessper', '$lifelessqty', '$rejectper', '$rejectqty','$degradeqty', '$acceptqty', '$remarks', '$packtype','$areacode','$unloadtime','$remarks2','$itemtype','$fsctype',$billwt , $millwt,$fixedmois,'$rate','$calcyn',$bales,'$today',$shortage, $dedrate , $dnqty , $taxable , 'N',$actmois,$moistol )";


//echo $query2;

	
                $result2=mysql_query($query2);

 
                $query3 = "update trn_weight_card set wc_process = 'Y' WHERE wc_compcode = '$compcode' and wc_fincode = '$finid' and  wc_ticketno = $ticketno";

//echo $query3;
	
                $result3=mysql_query($query3);

}


if($result1 && $result2 )
{
	mysql_query("COMMIT");                        
	echo '({"success":"true","EntryNo":"' . $rmentryno . '"})';

	    
}
else
{
    mysql_query("ROLLBACK");            
    echo '({"success":"false","EntryNo":"' . $rmentryno . '"})';
}
 
?>
