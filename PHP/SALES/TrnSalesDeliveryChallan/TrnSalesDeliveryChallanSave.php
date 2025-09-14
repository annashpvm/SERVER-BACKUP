<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];                 
$griddet = json_decode($_POST['griddet'],true);
$rowcnt = $_POST['cnt'];

$griddet2 = json_decode($_POST['griddet2'],true);
$rowcnt2 = $_POST['cnt2'];


$compcode = $_POST['compcode'];
$finid = $_POST['fincode'];
$dcno= $_POST['dcno'];
$dcdate = $_POST['dcdate'];
$ordno = $_POST['ordno'];
$orddate = $_POST['orddate'];
$sono = $_POST['sono'];
$sodt = $_POST['sodt'];

$party = $_POST['party'];
$cutter = $_POST['cutter'];

$seqno  = $_POST['seqno'];

$noofreels= $_POST['noofreels'];
$totwt= $_POST['totwt'];

$dctype= $_POST['dctype'];

$truck=   strtoupper(trim($_POST['truck']));


$daddr1=   strtoupper(trim($_POST['daddr1']));
$daddr2=   strtoupper(trim($_POST['daddr2']));
$daddr3=   strtoupper(trim($_POST['daddr3']));
$dcity=   strtoupper(trim($_POST['dcity']));
$dpin=   strtoupper(trim($_POST['dpin']));
$dgst=   strtoupper(trim($_POST['dgst']));



mysql_query("BEGIN");



if ($savetype === "Add") {

   $query1 = "select IFNULL(max(dc_no),0)+1 as dcno from trn_delivery_challan where dc_fincode = $finid and dc_comp_code='$compcode'";
   $result1= mysql_query($query1);

   $rec2 = mysql_fetch_array($result1);
   $dcno=$rec2['dcno'];


   $query1 = "select IFNULL(max(dc_seqno),0)+1 as seqno from trn_delivery_challan where dc_fincode = $finid and dc_comp_code='$compcode'";

   $query1 = "select IFNULL(max(dc_seqno),0)+1 as seqno from trn_delivery_challan";


   $result1= mysql_query($query1);

   $rec2 = mysql_fetch_array($result1);
   $seqno=$rec2['seqno'];




  
  }


else if ($savetype === "Edit")
  {

// $query7 =  "update  trnsal_order_trailer t, (select dc_comp_code,dc_sono,dc_size,sum(dc_wt)  wt from trn_delivery_challan where  dc_fincode = '$finid' and dc_comp_code = '$compcode' and dc_no = '$dcno' group by dc_comp_code,dc_sono,dc_size) a set  ordt_inv_wt = ordt_inv_wt - (wt/1000) where  ordt_sono = dc_sono and ordt_comp_code = dc_comp_code and ordt_var_code = dc_size and ordt_comp_code = '$compcode'";

 $query7 =  "update  trnsal_order_trailer t, (select dc_comp_code,dc_sono,dcs_size,sum(dcs_weight) wt  from trn_delivery_challan , trn_delivery_challan_sizewise where  dcs_seqno = dc_seqno and   dc_fincode = '$finid' and dc_comp_code = '$compcode' and dc_no = '$dcno' group by dc_comp_code,dc_sono,dcs_size) a
set  ordt_inv_wt = ordt_inv_wt - (wt/1000) where  ordt_sono = dc_sono and ordt_comp_code = dc_comp_code and ordt_var_code = dcs_size and ordt_comp_code = '$compcode'";

 $result7= mysql_query($query7);

//echo $query7;

  $query5 = "update trnsal_finish_stock a, trn_delivery_challan b,trn_delivery_challan_reellist c  set stk_slipno = 0, stk_destag = '' where b.dc_seqno = c.dc_seqno and  stk_var_code = dc_size and stk_sr_no = dc_sr_no and dc_no = stk_slipno and dc_srno_fincode = stk_finyear and dc_comp_code = stk_comp_code and dc_sono = stk_sono and dc_no = '$dcno' and dc_fincode = '$finid' and dc_comp_code = '$compcode'" ;

   $result5= mysql_query($query5);

//echo $query5; 



  $query6 = "delete from trn_delivery_challan where dc_no = '$dcno' and dc_fincode = '$finid'   and dc_comp_code = '$compcode'";
   $result6= mysql_query($query6);

//echo $query6; 

  $query6 = "delete from trn_delivery_challan_reellist where dc_seqno = '$seqno'";
  $result6= mysql_query($query6);

//echo $query6; 

  $query6 = "delete from trn_delivery_challan_sizewise where dcs_seqno = '$seqno' and dcs_size > 0  and dcs_receipt = 0";
  $result6= mysql_query($query6);
// echo $query6;

 } 




  $query2= "insert into trn_delivery_challan values('$seqno','$compcode','$finid','$dcno','$dcdate','$cutter', '$party','$truck','$sono','$sodt','$daddr1','$daddr2','$daddr3','$dcity','$dpin','$dgst','$dctype')";
	$result2=mysql_query($query2);   

//echo $query2;
//echo "<br>";



$reccount =0;
for($i=0;$i<$rowcnt;$i++)
{
	$itemname   = $griddet[$i]['varname'];
	$startno    = $griddet[$i]['stksrno'];
	$weight     = $griddet[$i]['stkwt'];
	$itemcode   = $griddet[$i]['varcode'];
	$prdcode    = $griddet[$i]['vargrpcode'];
	$finyear    = $griddet[$i]['stkfinyear'];
	$fincode    = $griddet[$i]['stkfincode'];
	$soentno    = $griddet[$i]['soentno'];
	$soentdate  = $griddet[$i]['soentdate'];


        $reccount = $reccount +1;



//	$query2= "insert into trn_delivery_challan_reellist values('$seqno','$compcode','$finid','$dcno','$dcdate','$cutter', '$party','$truck','$soentno','$soentdate','$itemcode','$startno','$weight','$fincode')";
	$query2= "insert into trn_delivery_challan_reellist values('$seqno','$itemcode','$startno','$weight','$fincode','N')";

//echo $query2;
//echo "<br>";


	$result2=mysql_query($query2);   

	$query3=  "update trnsal_finish_stock set stk_destag = 'B', stk_slipno = '$dcno' , stk_desdt = '$dcdate' where stk_sr_no ='$startno' and stk_finyear = '$fincode' and stk_comp_code = '$compcode' and stk_sono =  '$soentno'";
	$result3=mysql_query($query3);           


	$query4= "update trnsal_order_trailer set ordt_inv_wt =  ordt_inv_wt + ($weight/1000)  where ordt_comp_code = $compcode and ordt_fincode = $fincode   and ordt_sono = $soentno  and ordt_var_code = $itemcode";
	$result4=mysql_query($query4);        

}


$reccount =0;
for($i=0;$i<$rowcnt2;$i++)
{
	$sizecode   = $griddet2[$i]['sizecode'];
	$weight     = $griddet2[$i]['weight'];
	$cutsize    = $griddet2[$i]['cuttingsize'];

        $reccount = $reccount +1;

	$query2= "insert into trn_delivery_challan_sizewise values('$seqno','$sizecode','$cutsize','$weight',0)";
	$result2=mysql_query($query2);   


//  echo $query2;
//echo "<br>";
 


}

if ($savetype === "Add") {

	if ($result2 && $result3  && $result4  ) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","dcno":"' . $dcno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","dcno":"' . $dcno . '"})';
	}
 
 }
else
{

     if ($reccount == 0)
     { 
	if ( $result5 && $result6) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","dcno":"' . $dcno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","dcno":"' . $dcno . '"})';
	}
      }
      else
       { 
	if ($result2 && $result3  && $result4  &&  $result5 && $result6 && $result7) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","dcno":"' . $dcno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","dcno":"' . $dcno . '"})';
	}
      } 
 
 }


  
?>
