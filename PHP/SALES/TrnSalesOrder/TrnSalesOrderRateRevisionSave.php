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

mysqli_query($conn, "BEGIN");

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
	 $result1=mysqli_query($conn, $query1); 

         $query2 = "update trnsal_order_trailer set ordt_rate = $newrate where ordt_sono = '$ordhackno' and ordt_comp_code = $ordhcompcode and ordt_fincode = $ordhfincode and ordt_var_code = $itemcode";
//echo $query2;
	 $result2=mysqli_query($conn, $query2); 

        }   

}


if ($result1 &&  $result2)  {
    mysqli_begin_transaction($conn);
    echo '({"success":"true","msg":"' . $ordhackno . '"})';
	 
} 

else {
    mysqli_rollback($conn);


   echo '({"success":"false","msg":"' . $ordhackno . '"})';

}
   
?>
