<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


session_start();
$griddet     = json_decode($_POST['griddet'],true);
$savetype    = $_POST['savetype'];
$rowcnt      = $_POST['cnt'];
$isscompcode = $_POST['isscompcode'];
$issfincode  = $_POST['issfincode'];
$issdate     = $_POST['issdate'];
$isshno      = $_POST['isshno'];


mysql_query("BEGIN");

if ($savetype == "Add") 
{
   $query1 = "select IFNULL(max(iss_no),0)+1 as issh_no from trn_dayprod_chemicals_cons where iss_fin_code = '$issfincode' and iss_comp_code= '$isscompcode' ";
   $result1= mysql_query($query1);
   $rec2   = mysql_fetch_array($result1);
   $isshno  =$rec2['issh_no'];
}

else
{

     
  $query1 = "delete from trn_dayprod_chemicals_cons where iss_comp_code = '$isscompcode' and iss_no = $isshno and iss_fin_code = '$issfincode' ";
   $result1= mysql_query($query1);

}

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{




    if ($griddet[$i]['issqty'] > 0 ) {
	$sno = $i + 1;

	$issitemcode = $griddet[$i]['itemcode'];
	$issqty      = (float) $griddet[$i]['issqty'];
	$issval      = (float) $griddet[$i]['issval'];
	$issrate     = (float) $griddet[$i]['rate'];
	$issslno     = $sno;



	$query1= "insert into trn_dayprod_chemicals_cons values ('$isscompcode','$issfincode','$isshno','$issdate',  '$issslno' , '$issitemcode','$issqty' ,'$issrate','$issval')";


	$result1=mysql_query($query1);   
//echo $query1;   
//echo "<br>";





 
    } //END IF
  
}




if($result1)
{
  	mysql_query("COMMIT");                        
  	echo '({"success":"true","IssNo":"'. $isshno . '"})';
}
else
{
	echo '({"success":"false","IssNo":"' . $isshno . '"})';
	mysql_query("ROLLBACK");            
            
}   
        
   
 
?>
