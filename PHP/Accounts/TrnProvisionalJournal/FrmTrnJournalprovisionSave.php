<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $flagtype = strtoupper($_REQUEST['flagtype']);
    $griddet = json_decode($_REQUEST['griddet'],true);
    $rowcnt = $_REQUEST['cnt'];
    $voudate = $_REQUEST['voudate'];
    $refno = $_REQUEST['refno'];
    $refdate = $_REQUEST['refdate'];
    $narration = $_REQUEST['narration'];
    $finid = $_REQUEST['finid'];
    $compcode = $_REQUEST['compcode'];

        $query1 = "select ifnull(max(accref_seqno),0) + 1 as accref_seqno from accrefprovision;";
        $result1 = mysql_query($query1);
        $rec1 = mysql_fetch_array($result1);
        $ginaccrefseq=$rec1['accref_seqno'];

        $query2 = "select ifnull(max(convert(substring(accref_vouno,4),signed)),0) +1 as vou_no from accrefprovision where  accref_finid = '$finid' and accref_comp_code = '$compcode';";
        $result2 = mysql_query($query2);
        $rec2 = mysql_fetch_array($result2);
        $conval=$rec2['vou_no'];
        $vouno='PJV'.$conval;

        mysql_query("BEGIN");

        $querya2 = "insert into accrefprovision values('$ginaccrefseq','$vouno','$compcode','$finid','$voudate','$narration')";
        $resulta2 = mysql_query($querya2);
        
        $inscnt = 0;
        for($i=0;$i<$rowcnt;$i++){
            $slno = $i+1;
            $ledseq = $griddet[$i]['ledseq'];
            $dbamt = $griddet[$i]['dbamt'];
            $cramt = $griddet[$i]['cramt'];
            $totamt = $griddet[$i]['totamt'];

            if($ledseq>0){
            $querya4 = "insert into acctranprovision values('$ginaccrefseq','$slno','$ledseq','$dbamt','$cramt','$totamt');";
            $resulta4 = mysql_query($querya4);
	   
            if($resulta4){
                $inscnt = $inscnt + 1;
            }
	  }
        }
        
        if($resulta2 && ($inscnt == $rowcnt))
        {
            mysql_query("COMMIT");
            echo '({"success":"true","vouno":"'.$vouno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");
            
            echo '({"success":"false","vouno":"'.$vouno.'"})';
        }
  
?>
