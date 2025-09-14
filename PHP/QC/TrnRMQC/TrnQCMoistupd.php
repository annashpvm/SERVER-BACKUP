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
	$grnno    = $_REQUEST['grnno'];


         $today = date("Y-m-d H:i:s"); 

	mysql_query("BEGIN");

	for ($i=0;$i<$rowcnt;$i++)
	{
		$sno = $i + 1;
		if ($griddet[$i]['packtype'] == "BUNDLE")
		   $packtype = "B";
		else  
		   $packtype = "L";
         	$slno        = $sno; //  $griddet[$i]['slno'];
         	$slno        = $griddet[$i]['slno'];

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



                $query1 = "update trn_qc_rm_inspection set qc_rm_act_moisure_qty = $actmois,  qc_rm_mois_tolarance = $moistol , qc_rm_moisper = $moisper   where qc_rm_compcode = $compcode and qc_rm_fincode = '$finid' and qc_rm_entryno = '$rmentryno' and qc_rm_slno = $slno and  qc_rm_itemcode =$itemcode";
                $result1=mysql_query($query1);

//echo $query1;
//echo "<br>";
                   
                $query2 = "update trnrm_receipt_header ,trnrm_receipt_trailer  set rect_act_mois = $actmois , rect_mois_tolarance = $moistol  , rect_moisper = $moisper  where rech_seqno = rect_hdseqno and  rech_compcode =  $compcode and rech_fincode = '$finid' and rech_no = '$grnno' and rect_item_code = $itemcode";


//echo $query2;
//echo "<br>";	
                $result2=mysql_query($query2);


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
