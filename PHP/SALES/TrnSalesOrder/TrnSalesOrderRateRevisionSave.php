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
$ordhparty= $_POST['ordhparty'];
$userid= $_POST['userid'];

mysql_query("BEGIN");

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{

	$sno = $i + 1;
	$itemcode = $griddet[$i]['sizecode'];
	$oldrate  = (float)$griddet[$i]['oldrate'];
	$newrate  = (float)$griddet[$i]['newrate'];
        if ($griddet[$i]['revise'] == 'Y')
        {
         $query1 = "insert into trnsal_so_rate_revision ( r_date,r_compcode, r_sono, r_sodate, r_socust, r_item, r_olddate, r_newrate, r_userid) values (curdate(),$ordhcompcode,'$ordhackno','$ordhackdate','$ordhparty',$itemcode,$oldrate  ,$newrate,$userid)";
	 $result1=mysql_query($query1); 

         $query2 = "update trnsal_order_trailer set ordt_rate = $newrate where ordt_sono = '$ordhackno' and ordt_comp_code = $ordhcompcode and ordt_fincode = $ordhfincode and ordt_var_code = $itemcode";
//echo $query2;
	 $result2=mysql_query($query2); 

        }   

}


if ($result1 &&  $result2)  {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $ordhackno . '"})';
	 
} 

else {
    mysql_query("ROLLBACK");
   echo '({"success":"false","msg":"' . $ordhackno . '"})';

}
   
?>
