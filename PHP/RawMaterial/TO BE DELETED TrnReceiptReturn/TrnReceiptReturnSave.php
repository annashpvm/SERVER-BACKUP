<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet = json_decode($_REQUEST['fabricgriddet'],true);
$rowcnt = $_POST['cnt'];
$rerh_compcode = $_POST['rerh_compcode'];
$rerh_fincode = $_POST['rerh_fincode'];

$rerh_no = $_POST['rerh_no'];
$rerh_grnseqno = $_POST['rerh_grnseqno'];
$rerh_date = $_POST['rerh_date'];
$rerh_itemvalue = $_POST['rerh_itemvalue'];
$rerh_servicecharge = $_POST['rerh_servicecharge'];
$rerh_roundingoff = $_POST['rerh_roundingoff'];
$rerh_totalvalue = $_POST['rerh_totalvalue'];
$rerh_lorryno = $_POST['rerh_lorryno'];
$rerh_remarks = $_POST['rerh_remarks'];
$rerh_vouno = $_POST['rerh_vouno'];
$rerh_usr_code = $_POST['rerh_usr_code'];
$rerh_cgst_per =  $_POST['rerh_cgst_per'];
$rerh_sgst_per =  $_POST['rerh_sgst_per'];
$rerh_igst_per =  $_POST['rerh_igst_per'];
$rerh_cgst_amt =  $_POST['rerh_cgst_amt'];
$rerh_sgst_amt =  $_POST['rerh_sgst_amt'];
$rerh_igst_amt =  $_POST['rerh_igst_amt'];
$rerh_entry_date =  $_POST['rerh_entry_date'];


 $query1 = "select IFNULL(max(rerh_seqno),0)+1 as rech_seqno from trnrm_receiptret_header";
 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $rech_seqno=$rec1['rech_seqno'];

 $query2 = "select IFNULL(max(rerh_no),0)+1 as rech_no from trnrm_receiptret_header where rerh_fincode = '$rerh_fincode' and rerh_compcode='$rerh_compcode'";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $rech_no=$rec2['rech_no'];

 $query5 = "select IFNULL(max(rert_seqno),0)+1 as rect_no from trnrm_receiptret_trailer where rert_hdseqno=$rech_seqno";
 $result5= mysql_query($query5);
 $rec5 = mysql_fetch_array($result5);
 $rect_no=$rec5['rect_no'];

 mysql_query("BEGIN");


 if ($rech_seqno > 0 && $rech_no > 0 && $rerh_fincode > 0 && $rerh_compcode > 0)
 { 
 $query3= "insert into trnrm_receiptret_header values('$rech_seqno','$rerh_compcode','$rerh_fincode','$rech_no','$rerh_grnseqno','$rerh_date','$rerh_itemvalue','0','0','0',
'0','$rerh_servicecharge','0','$rerh_roundingoff','$rerh_totalvalue','$rerh_lorryno','$rerh_remarks','$rerh_vouno','0','$rerh_cgst_per',
'$rerh_sgst_per','$rerh_igst_per','$rerh_cgst_amt','$rerh_sgst_amt','$rerh_igst_amt','$rerh_entry_date','0')";
 $result3=mysql_query($query3);

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
//$po_serialno = $griddet[$i]['slno'];
$itmh_name = $griddet[$i]['itmh_name'];
$lotcode = $griddet[$i]['lotcode'];
$itmh_code = $griddet[$i]['itmh_code'];
$billqty = $griddet[$i]['billqty'];
$grnrate = $griddet[$i]['grnrate'];
$retbags = $griddet[$i]['retbags'];
$rect_itemvalue = $griddet[$i]['rect_itemvalue'];
$rech_freight = $griddet[$i]['rech_freight'];
$retbags = $griddet[$i]['rect_costvalue'];
     
 $query4= "insert into trnrm_receiptret_trailer values($rech_seqno,$rect_no,$lotcode,'0','$itmh_code','$billqty','$grnrate','$retbags','$rect_itemvalue','0','0','$rech_freight','$rect_itemvalue','0','0')";
 $result4=mysql_query($query4);            
  
}

}
        
	if($result3) 
	{
            mysql_query("COMMIT");                        
            echo '({"success":"true","msg":"'.$rech_no.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
            echo '({"success":"false","msg":"'.$rech_no.'"})';
        }   

?>
