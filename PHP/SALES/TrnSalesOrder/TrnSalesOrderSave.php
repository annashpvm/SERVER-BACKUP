<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];
$savetype = $_POST['savetype'];     
$ordhcompcode = $_POST['ordhcompcode'];
$ordhfincode= $_POST['ordhfincode'];
$ordhackno= $_POST['ordhackno'];
$ordhackdate= $_POST['ordhackdate'];
$ordhref= $_POST['ordhref'];
$ordhrefdt= $_POST['ordhrefdt'];
$ordhparty= $_POST['ordhparty'];
$ordhrep= $_POST['ordhrep'];
$ordhtax=$_POST['ordhtax'];
$ordhcustrem= $_POST['ordhcustrem'];
$ordhinsyn= $_POST['ordhinsyn'];
$ordhinsper= $_POST['ordhinsper'];
$ordhdeliveryadd1= $_POST['ordhdeliveryadd1'];
$ordhdeliveryadd2=$_POST['ordhdeliveryadd2'];
$ordhdeliveryadd3= $_POST['ordhdeliveryadd3'];
$ordhdeliverycity=$_POST['ordhdeliverycity'];
$ordhdeliverypin= $_POST['ordhdeliverypin'];
$ordhdeliverygst= $_POST['ordhdeliverygst'];
$ordhcgst= $_POST['ordhcgst'];
$ordhsgst= $_POST['ordhsgst'];
$ordhigst= $_POST['ordhigst'];
$ordhfrt= $_POST['ordhfrt'];
$ordhcrdays= (int) $_POST['ordhcrdays'];
$ordhgracedays=  (int) $_POST['ordhgracedays'];
$ordhapprno= $_POST['ordhapprno'];
$ordhcanstat= $_POST['ordhcanstat'];
$ordhcanreason= $_POST['ordhcanreason'];
$ordhtype = $_POST['ordhtype'];
$ordhcomm = $_POST['ordhcomm'];
$usercode = $_POST['usercode'];

$cust_area_priceType = $_POST['cust_area_priceType'];


$cd30_7days = (float) $_POST['cd30_7days'];


$cd45_7days  = (float) $_POST['cd45_7days'];
$cd45_30days = (float) $_POST['cd45_30days'];


$cd60_7days  = (float) $_POST['cd60_7days'];
$cd60_30days = (float) $_POST['cd60_30days'];
$cd60_45days = (float) $_POST['cd60_45days'];


$ratediff = (float) $_POST['ratediff'];

$custarea = $_POST['custarea'];
$custdest = $_POST['custdest'];


$ordhapprfincode = $_POST['ordhapprfincode'];




if ($custarea != 24)
    $custdest = '';        

$cd90_7days  = (float) $_POST['cd90_7days'];
$cd90_30days = (float) $_POST['cd90_30days'];
$cd90_45days = (float) $_POST['cd90_45days'];
$cd90_60days = (float) $_POST['cd90_60days'];
$cd90_75days = (float) $_POST['cd90_75days'];


mysql_query("BEGIN");


if ($savetype == "Add") {


$query1 = "select ifnull(max(ordh_sono),0)+1 as ordh_sono from trnsal_order_header where  ordh_type =  '$ordhtype' and ordh_comp_code =  $ordhcompcode and ordh_fincode = $ordhfincode";
$result1 = mysql_query($query1);
$rec1 = mysql_fetch_array($result1);

//$ordhackno = $rec1['ordh_sono'];

  if ($ordhackno==1) {
     if ($ordhtype == "F") 
     {
         $ordhackno = "1".$ordhfincode."0001";}
     else
     {
         $ordhackno = "2".$ordhfincode."0001";}

  }
     $ordhackno = $ordhackno;

}
else
{
   $query2 = "delete from trnsal_order_header where ordh_sono = $ordhackno  and ordh_fincode = $ordhfincode and ordh_comp_code = $ordhcompcode";
   $result2=mysql_query($query2); 

   $query3= "delete from trnsal_order_trailer where ordt_sono = $ordhackno  and ordt_fincode = $ordhfincode and ordt_comp_code = $ordhcompcode";
   $result3=mysql_query($query3); 

}

$today  = date("Y-m-d H:i:s");  

$query3 = "insert into trnsal_order_header values('$ordhcompcode','$ordhfincode','$ordhtype','$ordhackno','$ordhackdate','$ordhref','$ordhrefdt',
'$ordhparty','$ordhrep','$ordhtax','$ordhcustrem','$ordhinsyn','$ordhinsper','$ordhdeliveryadd1','$ordhdeliveryadd2',
'$ordhdeliveryadd3','$ordhdeliverycity','$ordhdeliverypin','$ordhdeliverygst','$ordhcgst', '$ordhsgst','$ordhigst','$ordhfrt','$ordhcrdays','$ordhgracedays' ,'$ordhcanstat','$ordhcanreason','$ordhcomm','$usercode', '$ordhapprno','$cust_area_priceType',$cd30_7days,'$cd45_7days','$cd45_30days', '$cd60_7days', $cd60_30days, $cd60_45days, '$cd90_7days', '$cd90_30days', '$cd90_45days', '$cd90_60days','$cd90_75days','$custdest','$ratediff', '$today', '$ordhapprfincode')";




$result3=mysql_query($query3); 


//echo $query3;

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{

	$sno = $i + 1;
	$ordt_var_code = $griddet[$i]['sizecode'];
	$ordt_qty      = $griddet[$i]['qty'];
	$ordt_adv_qty  = 0;
	$ordt_rate     = $griddet[$i]['rate'];

	$ordt_despdt   = $griddet[$i]['despdate'];
	$ordt_crdays   = (int)$griddet[$i]['crdays'];

	$ordt_clo_reason = $griddet[$i]['closereason'];
	$ordt_adv_tag    = '';
	$ordt_des_tag    = '';
	$ordt_approved   = 'Y';
	$ordt_ma_tag     = 'N';
	$cancelflag      = 0;
	$ordt_loss_pmt   = 0;
	$reels           = $griddet[$i]['reels'];

        $reellist         = $griddet[$i]['reellist'];

// New Additions Start 29/08/2024

        if ($reellist != '')
        {

	 $query6 = "select * from  trnsal_finish_stock where stk_comp_code = $ordhcompcode and stk_finyear <= $ordhfincode and  stk_sr_no  in ($reellist)";

	 $result6 = mysql_query($query6);
	 while ($row = mysql_fetch_assoc($result6)) {
               $itemcode = $row['stk_var_code'];
               $reelno   = $row['stk_sr_no'];
               $wt       = $row['stk_wt'];

              $query7 = "insert into trnsal_godown_to_despatchpending (t_compcode, t_date, t_sono, t_sodate, t_customer, t_itemcode, t_reelno, t_weight) values ($ordhcompcode,curdate(),'$ordhackno','$ordhackdate','$ordhparty',$itemcode,$reelno  ,$wt)";

              $result7 = mysql_query($query7);

         }         


	       $query8 = "update trnsal_finish_stock set stk_sono = $ordhackno where stk_comp_code = $ordhcompcode and stk_finyear <= $ordhfincode and  stk_sr_no  in ($reellist)";

//echo $query6;
		   $result8=mysql_query($query8); 

        }     

// New Additions end

	if ($griddet[$i]['soclose'] == "Y")
	{
	   $soclose= "Y";
	} 
	else
	{
	   $soclose= '';
	}

	$finwt      = (float)$griddet[$i]['finwt'];
	$invwt      = (float)$griddet[$i]['invwt'];
	$gdstkwt    = (float) $griddet[$i]['gdstkwt'];
	$gdstkreels = (int) $griddet[$i]['gdstkreels'];

	$entdate    = $griddet[$i]['entrydate'];

	$query4= "insert into trnsal_order_trailer values('$ordhcompcode','$ordhfincode','$ordhackno','$sno','$ordt_var_code','$ordhapprno','$reels','$ordt_qty',
'$ordt_rate','$ordt_despdt','$soclose','$ordt_clo_reason','$ordt_approved','$ordt_ma_tag','$finwt','$invwt','$gdstkwt','$gdstkreels','$entdate')";

	$result4=mysql_query($query4);  
//echo $query4;          
  
}



if ($savetype == "Add") {
	if ($result1 && $result3 && $result4  )  {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $ordhackno . '"})';
		 
	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $ordhackno . '"})';

	}
}
else
 {
	if ($result2 && $result3) {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $ordhackno . '"})';
		 
	} 
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $ordhackno . '"})';

	}
}
  
   
?>
