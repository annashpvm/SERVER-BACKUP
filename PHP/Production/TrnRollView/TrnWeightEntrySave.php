<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet   = json_decode($_POST['griddet'],true);
$rowcnt    = $_POST['cnt'];
$savetype  = $_POST['savetype'];
$entrydate = $_POST['entdate'];
$compcode  = $_POST['compcode'];
$fincode   = $_POST['fincode'];
$reelno    = $_POST['reelno'];
$weight    = $_POST['weight'];
$sizecode  = $_POST['sizecode'];
$qlycode   = $_POST['qlycode'];
$rollno    = $_POST['rollno'];
$seqno     = $_POST['seqno'];
$oldweight = $_POST['oldweight'];
$sono      = $_POST['sono'];
$custcode  = $_POST['custcode'];
$joints    = $_POST['joints'];
$yymm      = $_POST['yymm'];
$fshift    = $_POST['fshift'];
$cnt1 = 0;

 mysql_query("BEGIN");

if ( $weight > 0)
{

  if ($savetype == "Add")
  {
	   $query1 = "select count(*) as nos from trnsal_finish_stock  WHERE stk_comp_code = $compcode and stk_finyear = $fincode and stk_sr_no = $reelno";
	   $result1= mysql_query($query1);
	   $rec    = mysql_fetch_array($result1);
	   $cnt1   = $rec['nos'];

	   if ( $cnt1 == 0)
	   {
		$query2= "insert into trnsal_finish_stock  (stk_comp_code,stk_finyear,stk_ent_no,stk_ent_date,stk_var_code,stk_sr_no,stk_wt,stk_sono,stk_joints,stk_yymm,stk_rollno,stk_shift) VALUES ('$compcode','$fincode','100','$entrydate','$sizecode','$reelno','$weight',$sono,$joints,$yymm,$rollno,'$fshift')";
		$result2=mysql_query($query2);


		$query3= "update trnsal_order_trailer set ordt_fin_wt =  ordt_fin_wt + ($weight/1000)  where ordt_comp_code = $compcode and ordt_fincode = $fincode   and ordt_sono = $sono  and ordt_var_code = $sizecode";
		$result3=mysql_query($query3); 


	    }


	for ($i=0;$i<$rowcnt;$i++)
	{
        $seqno    = $griddet[$i]['prd_seqno'];
	$pdate    = $griddet[$i]['prd_date'];
	$shift    = $griddet[$i]['prd_shift'];
        $qlycode  = $griddet[$i]['var_groupcode'];
	$rollno   = $griddet[$i]['prd_rollno'];	
	$finwt    = $griddet[$i]['prd_finprod'];

//	$query4= "update trn_dayprod_roll_details set prd_finprod = $finwt + ($weight/1000) , prd_roll_status = 'P' where prd_rollno = $rollno  and prd_date = '$pdate'  and prd_shift = '$shift' and prd_rollno = '$rollno'  and prd_variety = '$qlycode' and prd_seqno = '$seqno' ";

	$query4= "update trn_dayprod_roll_details set prd_finprod = $finwt where prd_rollno = $rollno  and prd_date = '$pdate'  and prd_shift = '$shift' and prd_rollno = '$rollno'  and prd_variety = '$qlycode' and prd_seqno = '$seqno' ";

	$result4=mysql_query($query4);            
	}    


  }
  else
  {
		$query2= "update trnsal_finish_stock set stk_sono = '$sono' , stk_var_code = '$sizecode',stk_wt = '$weight',stk_joints = $joints , stk_shift = '$fshift'  where stk_sr_no =  '$reelno' and stk_comp_code = $compcode  and stk_finyear = $fincode";
		$result2=mysql_query($query2);

		$query3= "update trnsal_order_trailer set ordt_fin_wt =  ordt_fin_wt + ($weight/1000) - ($oldweight/1000)  where ordt_comp_code = $compcode and ordt_fincode = $fincode   and ordt_sono = $sono  and ordt_var_code = $sizecode";
		$result3=mysql_query($query3); 

  }    
    

}  
       

	if ($result2 && $result3  && $result4  &&  $cnt1 ==0 )  {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $reelno . '"})';
     	} 
	else if ($result2)  {
	   mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $reelno . '"})';
     	} 
        else if ($cnt1 > 0) {
           mysql_query("ROLLBACK");
           echo '({"success":"false","cnt":"' . $cnt . '"})';
        }
	
	else {
	    mysql_query("ROLLBACK");
	   echo '({"success":"false","msg":"' . $reelno . '"})';

	}

?>
