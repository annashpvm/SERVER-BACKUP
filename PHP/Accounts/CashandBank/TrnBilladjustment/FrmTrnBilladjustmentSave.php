<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$gridadjdet = json_decode($_REQUEST['gridadjdet'], true);
$rowcnt = $_REQUEST['adjcnt'];
$ref_docseqno = $_REQUEST['accrefseq'];
//$vouno = $_REQUEST['vouno'];
$vouno = substr(trim($_POST['vouno']),0,29);

$accvoudate = $_REQUEST['accvoudate'];


$ledcode = $_REQUEST['ledcode'];
$totadjamt = $_REQUEST['totadjamt'];
$finid = $_REQUEST['finid'];
$compcode = $_REQUEST['compcode'];

$narration = $_REQUEST['narration'];

$adjtype = $_REQUEST['adjtype'];

if ($adjtype == "R")
{
   $doctype_selected = "C";
   $doctype_adjusted = "D";
}
else
{
   $doctype_selected = "D";
   $doctype_adjusted = "C";
}

   

mysql_query("BEGIN");

$inscnt = 0;
for ($i = 0; $i < $rowcnt; $i++) {



    $ginrefslno = $ginrefslno + 1;
    $adjvouno  = $gridadjdet[$i]['accrefvouno'];
    $invno = $gridadjdet[$i]['invno'];
    $invdate = $gridadjdet[$i]['invdate'];
    $invnonew = $gridadjdet[$i]['invno'];
    $adjamt = $gridadjdet[$i]['adjamt'];
    $accadjseqno = $gridadjdet[$i]['accrefseqno'];
    $recpayamt = $gridadjdet[$i]['recpayamt'];
    $voutype = $gridadjdet[$i]['voutype'];
    $Year = $gridadjdet[$i]['Year'];

    $payterms    = (int)$gridadjdet[$i]['payterms'];

    $dbcramt = $gridadjdet[$i]['invamt'];

    $adjvouno = substr(trim($adjvouno),0,29);
    $invno    = substr(trim($invno),0,29);

/*
    if ($gridadjdet[$i]['dbcramt'] > 0) {
        $dbcramt = $gridadjdet[$i]['dbcramt'];
    } else {
        $dbcramt = 0;
    }
*/


    if ($adjamt > 0) {


    $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
    $result = mysql_query($query);
    $rec = mysql_fetch_array($result);
    $ginrefslno = $rec['refslno'];
//echo $ginrefslno;
//echo "<br>";

      $ginrefslno = $ginrefslno + 1;

		$querydate = "select datediff('$accvoudate','$invdate') as daysin";
		$resultdate = mysql_query($querydate);
		$recdatenew = mysql_fetch_array($resultdate);
		$adjdays=$recdatenew['daysin'];



        $query1 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid','$ref_docseqno','$vouno', '$accvoudate', '$accadjseqno','$adjvouno','$invno','$invdate','$adjamt',$adjdays,'BA',curdate(),$payterms,'$ledcode','$voutype' );";

        $result1 = mysql_query($query1);

//echo $query1;
//echo "<br>";


        $query2 = "call acc_sp_trn_updacc_trail_seq_no_New('$ref_docseqno','$vouno','$adjamt','$ledcode' , '$doctype_selected')";
        $result2 = mysql_query($query2);


//echo $query2;
//echo "<br>";
        $query3 = "call acc_sp_trn_updacc_trail_seq_no_New('$accadjseqno','$invno','$adjamt','$ledcode' , '$doctype_adjusted')";
        $result3 = mysql_query($query3);
//echo $query3;
//echo "<br>";


    }
}


if ( $result1 && $result2 && $result3 ) {
    mysql_query("COMMIT");
    echo '({"success":"true","vouno":"' . $ginrefslno . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","vouno":"' . $ginrefslno . '"})';
}
?>

