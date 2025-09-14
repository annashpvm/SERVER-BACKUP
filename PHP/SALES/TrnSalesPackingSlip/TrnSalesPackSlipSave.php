<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_POST['griddet'],true);
$savetype = $_POST['savetype'];                 
$rowcnt = $_POST['cnt'];
$compcode = $_POST['compcode'];
$finid = $_POST['fincode'];
$slipno= $_POST['slipno'];
$slipdate = $_POST['slipdate'];
$ordno = $_POST['ordno'];
$orddate = $_POST['orddate'];
$sono = $_POST['sono'];
$sodt = $_POST['sodt'];
$dano = $_POST['dano'];
$dadate = $_POST['dadate'];
$party = $_POST['party'];
$noofbundles= 0;
$noofreels= $_POST['noofreels'];
$totwt= $_POST['totwt'];
$invno= $_POST['invno'];
$invdt= $_POST['invdt'];
$status= $_POST['status'];
$closests= $_POST['closests'];
$cancelflag= $_POST['cancelflag'];
//$truck= $_POST['truck'];
$truck = str_replace(" ","",$_POST['truck']);
$truck = str_replace("  ","",$truck );
$truck = str_replace("   ","",$truck);
$truck = str_replace("-","",$truck);





mysql_query("BEGIN");



if ($savetype === "Add") {

   $query1 = "select IFNULL(max(pckh_no),0)+1 as pckh_no from trnsal_packslip_header where pckh_fincode = $finid and pckh_comp_code='$compcode'";
   $result1= mysql_query($query1);

   $rec2 = mysql_fetch_array($result1);
   $pckhno=$rec2['pckh_no'];

 //   $query2= "insert into trnsal_packslip_header values ('$compcode','$finid','$pckhno','$slipdate','$ordno','$orddate','$sono', '$sodt','$dano','$dadate','$party','$noofreels','$totwt','$invno','$slipdate','$status','$closests','$truck')";


    $query2= "insert into trnsal_packslip_header values 
('$compcode','$finid','$pckhno','$slipdate','$ordno','$orddate','$dano','$dadate','$party','$noofreels','$totwt','$invno','$slipdate','$status','$truck')";


    $result2=mysql_query($query2);
  }


else if ($savetype === "Edit")
  {

   $pckhno=$slipno;



   $query3 = "update trnsal_packslip_header set pckh_date = '$slipdate' , pckh_noofreels ='$noofreels' , pckh_totwt = '$totwt' ,  pckh_truck = '$truck'  where pckh_no = '$slipno' and pckh_fincode ='$finid'  and pckh_comp_code = '$compcode'";
   $result3= mysql_query($query3);


$query4= "update trnsal_desp_advice,(select  pckh_comp_code,pckh_fincode, pckh_no ,pckh_dano ,pckt_sono ,pckt_size,sum(pckt_wt) as wt from trnsal_packslip_header , trnsal_packslip_trailer  where pckh_no = pckt_no and pckh_fincode = pckt_fincode  and pckh_comp_code =pckt_comp_code and pckh_no = '$pckhno' and pckh_fincode = '$finid'   and pckh_comp_code = '$compcode' group by pckh_comp_code,pckh_fincode,pckh_no ,pckh_dano,pckt_sono ,pckt_size ) a1 set da_slipqty = da_slipqty - (wt/1000) where da_no =pckh_dano and da_fincode = pckh_fincode   and   da_comp_code = pckh_comp_code and da_var = pckt_size and da_ackno = pckt_sono and da_no = '$dano' and da_fincode = '$finid'   and   da_comp_code = '$compcode'";
$result4=mysql_query($query4);     

//   $query5 = "update trnsal_finish_stock,  trnsal_packslip_trailer  set stk_slipno = 0, stk_desdt = null,stk_destag = '' where  stk_var_code = pckt_size and stk_sr_no =    pckt_sr_no and pckt_no = stk_slipno and pckt_srno_fincode = stk_finyear  and pckt_comp_code = stk_comp_code and pckt_sono = stk_sono and pckt_no = '$slipno' and pckt_fincode = '$finid'    and pckt_comp_code = '$compcode'" ;

   $query5 = "update trnsal_finish_stock,  trnsal_packslip_trailer  set stk_slipno = 0, stk_destag = '' where  stk_var_code = pckt_size and stk_sr_no =    pckt_sr_no and pckt_no = stk_slipno and pckt_srno_fincode = stk_finyear  and pckt_comp_code = stk_comp_code and pckt_sono = stk_sono and pckt_no = '$slipno' and pckt_fincode = '$finid'    and pckt_comp_code = '$compcode'" ;

   $result5= mysql_query($query5);




   $query11 = "update trnsal_order_trailer,  trnsal_packslip_trailer  set ordt_inv_wt =  ordt_inv_wt - (pckt_wt/1000)   where  ordt_var_code = pckt_size  and pckt_comp_code = ordt_comp_code and pckt_sono = ordt_sono  and pckt_no = '$slipno' and pckt_fincode = '$finid'    and pckt_comp_code = '$compcode'" ;

   $query11 = "update trnsal_order_trailer  a ,(select pckt_sono,pckt_size,sum(pckt_wt)/1000 as iwt from  trnsal_packslip_trailer  where pckt_comp_code = '$compcode' and pckt_fincode = '$finid'  and pckt_no = '$slipno' group by  pckt_sono,pckt_size)  b set ordt_inv_wt = ordt_inv_wt - iwt where ordt_sono = pckt_sono and ordt_var_code = pckt_size and ordt_comp_code = '$compcode' and ordt_fincode = '$finid' ";
 

   $result11= mysql_query($query11);


   $query6 = "delete from trnsal_packslip_trailer where pckt_no = '$slipno' and pckt_fincode = '$finid'   and pckt_comp_code = '$compcode'";
   $result6= mysql_query($query6);


 } 



for($i=0;$i<$rowcnt;$i++)
{
$itemname = $griddet[$i]['varname'];
$startno  = $griddet[$i]['stksrno'];
$weight   = $griddet[$i]['stkwt'];
$itemcode = $griddet[$i]['varcode'];
$prdcode  = $griddet[$i]['vargrpcode'];
$finyear  = $griddet[$i]['stkfinyear'];
$fincode  = $griddet[$i]['stkfincode'];
$soentno  = $griddet[$i]['soentno'];
$soentdate  = $griddet[$i]['soentdate'];

$query7= "insert into trnsal_packslip_trailer values('$compcode','$finid','$pckhno','$itemcode','$soentno','$soentdate','$startno' ,'$weight','N','$fincode')";
$result7=mysql_query($query7);           

     

$query8=  "update trnsal_finish_stock set stk_destag = 'T', stk_slipno = '$pckhno' , stk_desdt = '$slipdate' where stk_sr_no ='$startno' and stk_finyear = '$fincode' and stk_comp_code = '$compcode' and stk_sono =  '$soentno'";
$result8=mysql_query($query8);           

  
$query9= "update trnsal_desp_advice set da_desptag = 'T' , da_slipqty = da_slipqty + ($weight/1000) where da_no = '$dano' and da_fincode = '$finyear'   and da_comp_code = '$compcode' and da_var = '$itemcode' and da_cust = '$party' and da_ackno ='$soentno'";

$result9=mysql_query($query9);      

$query10= "update trnsal_order_trailer set ordt_inv_wt =  ordt_inv_wt + ($weight/1000)  where ordt_comp_code = $compcode and ordt_fincode = $fincode   and ordt_sono = $soentno  and ordt_var_code = $itemcode";
$result10=mysql_query($query10); 
}




if ($savetype === "Add") {
	if ($result2 && $result7 && $result8 && $result9  && $result10 ) 
//	if ($result2 ) 
	{ 
	   mysql_query("COMMIT");
	    echo '({"success":"true","slipno":"' . $pckhno . '"})';
	} 
		
	else {
	   mysql_query("ROLLBACK");
	    echo '({"success":"false","slipno":"' . $pckhno . '"})';
	}
 
 }

else if ($savetype === "Edit") {
        if ($rowcnt > 0)
        {
//		if ($result3 && $result4 && $result5 && $result6 && $result7 && $result8 && $result9 ) 
		if ($result3 && $result4 && $result5 && $result6 && $result10 && $result11) 

		{ 
		mysql_query("COMMIT");                        
		echo '({"success":"true","slipno":"'. $pckhno . '"})';
		}
		
		else
		{
	    		mysql_query("ROLLBACK");            
	    		echo '({"success":"false","slipno":"' . $pckhno . '"})';
		} 
        }   
        else
        {
		if ($result3 && $result4 && $result5 && $result6) 
		{ 
		   mysql_query("COMMIT");
		    echo '({"success":"true","slipno":"' . $pckhno . '"})';
		} 
		
		else {
		   mysql_query("ROLLBACK");
		    echo '({"success":"false","slipno":"' . $pckhno . '"})';
		}
        }   

 
 }   
?>
