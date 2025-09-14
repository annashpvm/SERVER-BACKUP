<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$deligriddet = json_decode($_REQUEST['deligriddet'],true);
$rowcnt = $_POST['cnt'];
$delicnt = $_POST['delicnt'];

$ordhcompcode    = $_POST['ordhcompcode'];
$ordhfincode     = $_POST['ordhfincode'];
$ordhfrom        = $_POST['ordhfrom'];
$ordhrefno       = $_POST['ordhrefno'];
$ordhsup_code    = $_POST['ordhsup_code'];
$ordhagent       = $_POST['ordhagent'];
$ordhdate        = $_POST['ordhdate'];
$ordhterms       = $_POST['ordhterms'];
$ordhcarriagetype= $_POST['ordhcarriagetype'];
$ordhorigincountry = $_POST['ordhorigincountry'];
$ordhoriginport    = $_POST['ordhoriginport'];
$ordharrivalport   = $_POST['ordharrivalport'];
$ordhpaymode       = $_POST['ordhpaymode'];
$ordhlcdays        = $_POST['ordhlcdays'];
$ordhnagodays      = $_POST['ordhnagodays'];
$ordhcreditdays    = $_POST['ordhcreditdays'];
$ordhinterstatus   = $_POST['ordhinterstatus'];
$ordhpayterms      = $_POST['ordhpayterms'];
$ordhremarks       = $_POST['ordhremarks'];
$ordhfrttype       = $_POST['ordhfrttype'];
$ordhfrtparty_code = $_POST['ordhfrtparty_code'];
$ordhitemcurvalue  = $_POST['ordhitemcurvalue'];
$ordhexrate        = $_POST['ordhexrate'];
$ordhtotalcurvalue = $_POST['ordhitemcurvalue'];
$ordhitemvalue     = $_POST['ordhitemvalue'];
$ordhroundingoff   = 0;
$ordhtotalvalue    = $_POST['ordhitemvalue'];
$ordhstatus        = $_POST['ordhstatus'];
$ordhamndstatus    = $_POST['ordhamndstatus'];
$ordhamndposeqno   = $_POST['ordhamndposeqno'];
$ordhusr_code      = $_POST['ordhusr_code'];
$ordhentry_date    = $_POST['ordhentry_date'];
$ordhwef_date      = $_POST['ordhwef_date'];
$varty             = $_POST['varty'];

 $query1 = "select IFNULL(max(ordh_seqno),0)+1 as po_seqno from trnirm_order_header";
 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $po_seqno=$rec1['po_seqno'];

 $query2 = "select IFNULL(max(ordh_no),0)+1 as po_no from trnirm_order_header where ordh_fincode = '$ordhfincode' and ordh_compcode='$ordhcompcode'";
 $result2= mysql_query($query2);
 $rec2 = mysql_fetch_array($result2);
 $po_no=$rec2['po_no'];

 mysql_query("BEGIN");
 


 $query3= "call  spirm_ins_orderheader( '$po_seqno','$ordhcompcode','$ordhfincode','$po_no','$ordhfrom','$ordhrefno','$ordhsup_code','$ordhagent','$ordhdate','$ordhterms','$ordhcarriagetype','$ordhorigincountry',
'$ordhoriginport','$ordharrivalport','$ordhpaymode',  '$ordhlcdays',  '$ordhnagodays',  '$ordhcreditdays',  '$ordhinterstatus',  '$ordhpayterms',  '$ordhremarks',  
'$ordhfrttype',  '$ordhfrtparty_code',  '$ordhitemcurvalue',  '$ordhexrate',  '$ordhtotalcurvalue',  '$ordhitemvalue', '$ordhroundingoff',  '$ordhtotalvalue',  
'$ordhstatus', '$ordhamndstatus',  '$ordhamndposeqno',  '$ordhusr_code',  '$ordhentry_date','$ordhwef_date','0' )";
 $result3=mysql_query($query3);




for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;



$po_item_code = $griddet[$i]['itemseq'];
$po_ordqty    = $griddet[$i]['qty'];
$po_itemrate  = $griddet[$i]['unitrate'];
$val          = $griddet[$i]['totvalue'];
$moisper      = $griddet[$i]['moisture'];
$tareper      = $griddet[$i]['tare'];
$outthrow     = $griddet[$i]['outthrow'];
$prohibitive  = $griddet[$i]['prohibitive'];

     
 $query4= "call spirm_ins_ordertrailer('$po_seqno','$sno','$po_item_code','0','0','$po_ordqty','0',0,'$po_ordqty',0,0,'$po_itemrate','$val','0','$moisper','$tareper','$outthrow','$prohibitive','O','$varty','0')";
 $result4=mysql_query($query4);            

}



for ($j=0;$j<$delicnt;$j++)
{
$slno = $j + 1;
$deldate = $deligriddet[$j]['deldate'];
$deliremarks = $deligriddet[$j]['deliremarks'];

     
 $query5= "call spirm_ins_delschedule ('$po_seqno','$slno','$deldate','$deliremarks','0')";
 $result5=mysql_query($query5);            
  
  
}

     
if( $result3 && $result4 && $result5 )
{
            mysql_query("COMMIT");                        
            echo '({"success":"true","pono":"'.$po_no.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false","pono":"' .$po_no. '"})';
        }   
        

       
 
?>
