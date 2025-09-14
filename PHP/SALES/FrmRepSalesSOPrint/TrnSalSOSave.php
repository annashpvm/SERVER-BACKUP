<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$compcode = $_POST['compcode'];
$finid = $_POST['finid'];
$oddeven = $_POST['oddeven'];
$invno = $_POST['invno'];
$invdt = $_POST['invdt'];
$party = $_POST['party'];
$slipno = $_POST['slipno'];
$rsize1 = $_POST['rsize1'];
$s1 = $_POST['s1'];
$r1 = $_POST['r1'];
$wt1 = $_POST['wt1'];
$d1 = $_POST['d1'];
$s2 = $_POST['s2'];
$r2 = $_POST['r2'];
$wt2 = $_POST['wt2'];
$d2 = $_POST['d2'];  


/*$compcode = 1;
$finid = 21;
$oddeven = 1;
$invno = 2110464;
$invdt = '2021-08-12';
$party = 28;
$slipno = 476;
$rsize1 = 44;
$s1 = 1;
$r1 = 431202;
$wt1 = 345.000;
$d1 = '2021-08-12';
$s2 = 2;
$r2 = 451101;
$wt2 = 358.000;
$d2 = '2021-08-12';  */

//if ($oddeven === 1){
 mysql_query("BEGIN");
$addquery = "insert into tmp_sal_packingslip values ('$compcode' , '$finid' , '$invno' , '$invdt' , '$party' ,'$slipno', '$rsize1','$s1', '$r1' , '$wt1', '$d1' ,'$s2','$r2','$wt2','$d2')";
$resqry = mysql_query($addquery);
			mysql_query("COMMIT");                        
			
//}

/*
if ($oddeven === 1) {    
	if($resqry)
	{
			mysql_query("COMMIT");                        
			echo '({"success":"true","InvNo":"' . $invno . '"})';

		    
	}
	else
	{
	    //mysql_query("ROLLBACK");            
	    //echo '({"success":"false","InvNo":"' . $compcode . '"})';
	}   
}

*/
       
 
?>
