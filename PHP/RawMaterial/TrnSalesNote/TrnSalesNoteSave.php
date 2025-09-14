<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet = json_decode($_POST['griddet'],true);
$salh_compcode =$_POST['salh_compcode'];
$rowcnt = $_POST['cnt'];
$salh_fincode =$_REQUEST['salh_fincode'];
$salh_date = $_POST['salh_date'];
$salh_party_code =$_POST['salh_party_code'];
$salh_itemvalue =$_POST['salh_itemvalue'];
//$salh_itemvalue ='1000';
$salh_roundingoff= $_POST['salh_roundingoff'];
$salh_totalvalue= $_POST['salh_totalvalue'];
$salh_remarks= $_POST['salh_remarks'];
$salh_vouno= $_POST['salh_vouno'];
$salh_usr_code= $_POST['salh_usr_code'];
$salh_entry_date= $_POST['salh_entry_date'];
$salh_cgst_amount= $_POST['salh_cgst_amount'];
$salh_sgst_amount= $_POST['salh_sgst_amount'];


 $query1 = "select IFNULL(max(salh_seqno),0)+1 as salseqno from trnrm_salenote_header";
 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $salseqno=$rec1['salseqno'];

 $query2 = "select IFNULL(max(salh_no),0)+1 as salh_no from trnrm_salenote_header where salh_fincode = $salh_fincode and salh_compcode='$salh_compcode'";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $salh_no=$rec2['salh_no'];

 mysql_query("BEGIN");

 if ($salseqno > 0  && $salh_fincode > 0 && $salh_compcode>0)
 { 
 $query3= "insert into trnrm_salenote_header values('$salseqno','$salh_compcode','$salh_fincode','$salh_no','$salh_date','$salh_party_code','$salh_itemvalue','0','0','0',
'0','0','0','$salh_roundingoff','$salh_totalvalue','$salh_remarks','$salh_vouno','$salh_usr_code','$salh_entry_date','0','$salh_cgst_amount','$salh_sgst_amount')";
 $result3=mysql_query($query3);

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;
//$po_serialno = $griddet[$i]['slno'];
$itemseq = $griddet[$i]['itemseq'];
$lotseq = $griddet[$i]['lotseq'];
$qty = $griddet[$i]['qty'];
$rate = $griddet[$i]['rate'];
$bagqty = $griddet[$i]['bagqty'];
$itemvalue = $griddet[$i]['itemvalue'];
$cgstper = $griddet[$i]['cgstper'];
$cgstamt = $griddet[$i]['cgstamt'];
$sgstper = $griddet[$i]['sgstper'];
$sgstamt = $griddet[$i]['sgstamt'];
     
 $qry = "select IFNULL(max(salt_seqno),0)+1 as salt_seqno from trnrm_salenote_trailer where salt_hdseqno=$salseqno";
 $res = mysql_query($qry);
 $rec = mysql_fetch_array($res);
 $salt_seqno=$rec['salt_seqno'];

 $query4= "insert into trnrm_salenote_trailer values($salseqno,$salt_seqno,$lotseq,$itemseq,$qty,$rate,$bagqty,$itemvalue,0,0,0,0,0,$cgstper,$cgstamt,$sgstper,$sgstamt)";
 $result4=mysql_query($query4);            
  
}

}
        
if($result3)
{
  mysql_query("COMMIT");                        
  echo '({"success":"true","saleno":"'.$salh_no.'"})';
}
else
       {
echo '({"success":"false","saleno":"'.$salh_no.'"})';
	   


            mysql_query("ROLLBACK");            
            
        }   
        

       
 
?>
