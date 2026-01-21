<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

global $conn;  
$compcode = $_POST['compcode'];
$finid    = $_POST['fincode'];
$slipno   = $_POST['slipno'];


   
$query  = "select count(*) as noofrec  from trnsal_packslip_header where pckh_fincode= $finid   and pckh_comp_code= $compcode and pckh_no = $slipno ";

$result = mysqli_query($conn, $query);
$rec    = mysqli_fetch_array($result);
$noofrec = $rec2['noofrec'];


if ($noofrec == 0) 
{
	mysqli_begin_transaction($conn);

	$query1= "update trnsal_desp_advice,(select  pckh_comp_code,pckh_fincode, pckh_no ,pckh_dano ,pckt_sono ,pckt_size,sum(pckt_wt) as wt from trnsal_packslip_header , trnsal_packslip_trailer  where pckh_no = pckt_no and pckh_fincode = pckt_fincode  and pckh_comp_code =pckt_comp_code and pckh_no = '$slipno' and pckh_fincode = '$finid'   and pckh_comp_code = '$compcode' group by pckh_comp_code,pckh_fincode,pckh_no ,pckh_dano,pckt_sono ,pckt_size ) a1 set da_slipqty = da_slipqty - (wt/1000) where da_no =pckh_dano and da_fincode = pckh_fincode   and   da_comp_code = pckh_comp_code and da_var = pckt_size and da_ackno = pckt_sono and da_no = '$dano' and da_fincode = '$finid'   and   da_comp_code = '$compcode'";
	$result1=mysqli_query($conn, $query1);     

	

	$query2 = "update trnsal_finish_stock,  trnsal_packslip_trailer  set stk_slipno = 0, stk_destag = '' where  stk_var_code = pckt_size and stk_sr_no =    pckt_sr_no and pckt_no = stk_slipno and pckt_srno_fincode = stk_finyear  and pckt_comp_code = stk_comp_code and pckt_sono = stk_sono and pckt_no = '$slipno' and pckt_fincode = '$finid'    and pckt_comp_code = '$compcode'" ;
	$result2= mysqli_query($conn, $query2);

	$query3 = "update trnsal_order_trailer  a ,(select pckt_sono,pckt_size,sum(pckt_wt)/1000 as iwt from  trnsal_packslip_trailer  where pckt_comp_code = '$compcode' and pckt_fincode = '$finid'  and pckt_no = '$slipno' group by  pckt_sono,pckt_size)  b set ordt_inv_wt = ordt_inv_wt - iwt where ordt_sono = pckt_sono and ordt_var_code = pckt_size and ordt_comp_code = '$compcode' and ordt_fincode = '$finid' ";
	$result3= mysqli_query($conn, $query3);

	$query4 = "delete from trnsal_packslip_trailer where pckt_no = '$slipno' and pckt_fincode = '$finid'   and pckt_comp_code = '$compcode'";
	$result4= mysqli_query($conn, $query4);
		
	if ($result1 && $result2 && $result3 && $result4 ) 
	{ 
		mysqli_commit($conn); 
		echo '({"success":"true","slipno":"' . $slipno . '"})';
	} 
			
	else {

	mysqli_rollback($conn);
	echo '({"success":"false","slipno":"' . $slipno . '"})';
	}
} 
else
{

	echo '({"success":"false","slipno":"' . $slipno . '"})';
}
   
?>
