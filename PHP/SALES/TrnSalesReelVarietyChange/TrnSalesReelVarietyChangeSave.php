<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet  = json_decode($_POST['griddet'],true);
$rowcnt   = $_POST['cnt'];
$compcode = $_POST['compcode'];
$finid    = $_POST['finid'];
$savetype = $_POST['savetype'];
$docno    = $_POST['docno'];
$docdate  = $_POST['docdate'];

if ($savetype === "Add")
{
   $query1 = "select IFNULL(max(ent_no),0)+1 as no from trn_sal_variety_change where  comp_code ='$compcode' and fin_code ='$finid'";
   $result1= mysql_query($query1);
   $rec1 = mysql_fetch_array($result1);
   $docno=$rec1['no'];
   mysql_query("BEGIN");

   $inscnt = 0;
   for ($i=0;$i<$rowcnt;$i++)
   {
	$sno = $i + 1;
	$oldname = $griddet[$i]['oldname'];
	$oldcode = $griddet[$i]['oldcode'];
	$number  = $griddet[$i]['number'];
	$newname = $griddet[$i]['newname'];
	$newcode = $griddet[$i]['newcode'];
	$weight  = $griddet[$i]['weight'];
        $query2  = "insert into trn_sal_variety_change values('$compcode','$finid','$docno','$docdate','$oldcode', '$newcode','$number','$weight')";
        $result2 = mysql_query($query2);           

        $query3  = "update trnsal_finish_stock set stk_var_code = '$newcode' where  stk_comp_code =  '$compcode' and stk_finyear = '$finid' and stk_var_code ='$oldcode'  and  stk_sr_no ='$number'"; 
        $result3 = mysql_query($query3);           
  
  }
}
	if($result1 && $result2 && $result3)
	{
	  mysql_query("COMMIT");                        
	  echo '({"success":"true","docno":"'.$docno.'"})';
	}
	else
        {
            echo '({"success":"false","docno":"'.$docno.'"})';
	    mysql_query("ROLLBACK");            
        }      

       
 
?>
