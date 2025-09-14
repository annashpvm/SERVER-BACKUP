<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$savetype = $_POST['savetype'];                 
$rowcnt = $_POST['cnt'];
$compcode = $_POST['compcode'];
$finid = $_POST['fincode'];
$whslipno= $_POST['whslipno'];
$slipno= $_POST['slipno'];
$slipdate = $_POST['slipdate'];
$invtype = $_POST['invtype'];
$ordno = $_POST['ordno'];
$orddate = $_POST['orddate'];
$socno = $_POST['socno'];
$socdt = $_POST['socdt'];
$dano = $_POST['dano'];
$dadate = $_POST['dadate'];
$party = $_POST['party'];
$type = $_POST['type'];
$repr= $_POST['repr'];
$noofbundles= $_POST['noofbundles'];
$noofreels= $_POST['noofreels'];
$totwt= $_POST['totwt'];
$invno= $_POST['invno'];
$invdt= $_POST['invdt'];
$status= $_POST['status'];
$closests= $_POST['closests'];
$cancelflag= $_POST['cancelflag'];
$pckhno= 0;
mysql_query("BEGIN");



if ($savetype == "Add") {

   $query1 = "select IFNULL(max(pckh_no),0)+1 as pckh_no from trnsal_packslip_header where pckh_fincode = $finid and pckh_comp_code='$compcode'";
   $result1= mysql_query($query1);

   $rec2 = mysql_fetch_array($result1);
   $pckhno=$rec2['pckh_no'];

    $query2= "insert into trnsal_packslip_header values  ('$compcode','$finid','$pckhno','$slipdate','$invtype','$ordno','$orddate','$socno','$socdt','$dano','$dadate','$party','$type',
'$repr','$noofbundles','$noofreels','$totwt','$invno','$invdt','$status','$closests','$cancelflag')";
    $result2=mysql_query($query2);


    $query3 = "update trnware_packslip_header set wpckh_slipno  = $pckhno , wpckh_slipdt =  '$slipdate'  where wpckh_fincode  = $finid and wpckh_comp_code = '$compcode' and wpckh_no = $whslipno";
    $result3=mysql_query($query3);


  }





else
  {
   $pckhno=$slipno;
   $query1 = "update trnsal_packslip_header set pckh_date = '$slipdate' , pckh_noofbun =$noofbundles, pckh_noofreels =$noofreels , pckh_totwt = '$totwt' where pckh_no = $slipno and pckh_fincode =$finid  and pckh_comp_code = '$compcode'";
   $result1= mysql_query($query1);


$query2= "update trnsal_desp_advice,(select  pckh_comp_code,pckh_fincode, pckh_no ,pckh_dano ,pckh_ackno ,pckt_var,sum(pckt_wt) as wt from trnsal_packslip_header , 
trnsal_packslip_trailer  where pckh_no = pckt_no and pckh_fincode = pckt_fincode  and pckh_comp_code =pckt_comp_code and pckh_no = $pckhno and pckh_fincode = $finid   and pckh_comp_code = '$compcode' group by pckh_comp_code,pckh_fincode,pckh_no ,pckh_dano,pckh_ackno ,pckt_var ) a1 set da_slipqty = da_slipqty - (wt/1000)
where da_no =pckh_dano and da_fincode = pckh_fincode   and   da_comp_code = pckh_comp_code and da_var = pckt_var and da_ackno =pckh_ackno and da_no = $dano and da_fincode = $finid   and   da_comp_code = '$compcode'";
$result2=mysql_query($query2);     

   $query3 = "update trnsal_finish_stock,  trnsal_packslip_trailer  set stk_slipno = 0, stk_desdt = 0,stk_destag = '' where  stk_var_code = pckt_var and stk_sr_no =    pckt_sr_no and pckt_no = stk_slipno and pckt_srno_fincode = stk_finyear  and pckt_comp_code = stk_comp_code  and pckt_no = $slipno and pckt_fincode = $finid    and pckt_comp_code = '$compcode'" ;
   $result3= mysql_query($query3);


   $query4 = "delete from trnsal_packslip_trailer where pckt_no = $slipno and pckt_fincode = $finid   and pckt_comp_code = '$compcode'";
   $result4= mysql_query($query4);

 } 



for($i=0;$i<$rowcnt;$i++)
{
$itemname = $griddet[$i]['itemname'];
$unit     = $griddet[$i]['unit'];
$startno  = $griddet[$i]['stksrno'];
$weight   = $griddet[$i]['stkwt'];
$itemcode = $griddet[$i]['varcode'];
$unitcode = $griddet[$i]['varunit'];
$prdcode  = $griddet[$i]['stkvarcode'];
$finyear  = $griddet[$i]['stkfinyear'];
$fincode  = $griddet[$i]['stkfincode'];
$rettag   = '';
$desposal = '';

$query4= "insert into trnsal_packslip_trailer values('$compcode','$finid','$pckhno','$itemcode' ,'$startno' ,'$unitcode','$weight','','$desposal','$finyear','N')";
$result4=mysql_query($query4);           

      

$query5=  "update trnsal_finish_stock set stk_destag = 'T', stk_slipno = '$pckhno' , stk_desdt = '$slipdate' where stk_sr_no =$startno and stk_units = $unitcode
and stk_finyear = $finyear and stk_comp_code = '$compcode'";
$result5=mysql_query($query5);           

  
$query6= "update trnsal_desp_advice set da_desptag = 'T' , da_slipqty = da_slipqty + ($weight/1000) where da_no = $dano and da_fincode = $finyear   and
da_comp_code = '$compcode' and da_var = '$itemcode' and da_cust = $party and da_ackno =$socno";

$result6=mysql_query($query6);      

$query7=  "update trnware_packslip_trailer set wpckt_selected = 'Y' where wpckt_fincode  =  $finyear  and wpckt_comp_code = '$compcode' and wpckt_no = $whslipno and wpckt_sr_no =  $startno  and wpckt_srno_fincode = $finyear ";
$result7=mysql_query($query7);           


}



if ($result1 && $result2 && $result3) 
{ 
   mysql_query("COMMIT");
    echo '({"success":"true","slipno":"' . $pckhno . '"})';
} 
	
else {
   mysql_query("ROLLBACK");
    echo '({"success":"false","slipno":"' . $pckhno . '"})';
}
  
   
?>
