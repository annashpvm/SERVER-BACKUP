<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$wohcompcode = $_POST['wohcompcode'];
$wohfincode = $_POST['wohfincode'];
$wohdate = $_POST['wohdate'];
$wohdept = $_POST['wohdept'];
$wohtype = $_POST['wohtype'];
$wohsupcode = $_POST['wohsupcode'];
$wohref = $_POST['wohref'];
$wohrefdate = $_POST['wohrefdate'];
$wohwocode = $_POST['wohwocode'];
$wohvalue = $_POST['wohvalue'];
$wohlabourtype = $_POST['wohlabourtype'];
$wohlabouramt = $_POST['wohlabouramt'];
$wohdiscount = $_POST['wohdiscount'];
$wohdiscsttype = $_POST['wohdiscsttype'];
$wohsertax = $_POST['wohsertax'];
$wohsertaxamt = $_POST['wohsertaxamt'];

$woheduper = $_POST['woheduper'];
$woheduamt = $_POST['woheduamt'];
$wohsheper = $_POST['wohsheper'];
$wohsheamt = $_POST['wohsheamt'];
$wohtransrate = $_POST['wohtransrate'];
$wohtransamt = $_POST['wohtransamt'];
$wohotheramt = $_POST['wohotheramt'];
$wohamount = $_POST['wohamount'];
$wohlessamt = $_POST['wohlessamt'];
$wohcgstper = $_POST['wohcgstper'];
$wohcgstamt = $_POST['wohcgstamt'];
$wohsgstper = $_POST['wohsgstper'];
$wohsgstamt = $_POST['wohsgstamt'];
$wohigstper = $_POST['wohigstper'];
$wohigstamt = $_POST['wohigstamt'];
$wohlabcgstper = $_POST['wohlabcgstper'];
$wohlabcgstamt = $_POST['wohlabcgstamt'];
$wohlabsgstper = $_POST['wohlabsgstper'];
$wohlabsgstamt = $_POST['wohlabsgstamt'];
$wohlabigstper = $_POST['wohlabigstper'];
$wohlabigstamt = $_POST['wohlabigstamt'];
$wohpriceterms = $_POST['wohpriceterms'];
$wohpayterms = $_POST['wohpayterms'];
$wohcreditdays = $_POST['wohcreditdays'];
$wohremarks = $_POST['wohremarks'];
$wohdcneeded = $_POST['wohdcneeded'];
$wohstartdate = $_POST['wohstartdate'];
$wohenddate = $_POST['wohenddate'];
$cancelflag = $_POST['cancelflag'];
 

 $query1 = "select IFNULL(max(woh_no),0)+1 as woh_no from trnpur_workorder_header where woh_fin_code = 27 and woh_comp_code=1";
 $result1 = mysql_query($query1);
 $rec1 = mysql_fetch_array($result1);
 $wohno=$rec1['woh_no'];

 $query = "select IFNULL(max(woh_seqno),0)+1 as woh_seqno from trnpur_workorder_header";
 $result = mysql_query($query);
 $rec = mysql_fetch_array($result);
 $wohseqno=$rec['woh_seqno'];
 mysql_query("BEGIN");
 
 $query3= "insert into trnpur_workorder_header values('$wohcompcode','$wohfincode','$wohno','$wohseqno','$wohdate','$wohdept','$wohtype','$wohsupcode','$wohref','$wohrefdate,'$wohwocode',
'$wohvalue','$wohlabourtype','$wohlabouramt','$wohdiscount','$wohdiscsttype','$wohsertax','$wohsertaxamt','$woheduper','$woheduamt','$wohsheper',
'$wohsheamt','$wohtransrate','$wohtransamt','$wohotheramt','$wohlessamt','$wohamount','$wohcgstper','$wohcgstamt','$wohsgstper','$wohsgstamt',
'$wohigstper','$wohigstamt','$wohlabcgstper','$wohlabcgstamt','$wohlabsgstper','$wohlabsgstamt','$wohlabigstper','$wohlabigstamt','$wohpriceterms',
'$wohpayterms','$wohcreditdays','$wohremarks','$wohdcneeded','$wohstartdate','$wohenddate','$cancelflag')";
 $result3=mysql_query($query3);

//$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{

$wotslno= $rowcnt;
$wotitemcode= $griddet[$i]['wotitemcode'];
$wotunit= $griddet[$i]['wotunit'];
$wotrate= $griddet[$i]['wotrate'];
$wotqty = $griddet[$i]['wotqty'];
$wotdcraised= $griddet[$i]['wotdcraised'];
$wotrecd= $griddet[$i]['wotrecd'];
$wotvalue= $griddet[$i]['wotvalue'];
$wotdisper= $griddet[$i]['wotdisper'];
$wotdisamt= $griddet[$i]['wotdisamt'];
$wotedper= $griddet[$i]['wotedper'];
$wotedamt= $griddet[$i]['wotedamt'];
$wotecessper= $griddet[$i]['wotecessper'];
$wotecessamt= $griddet[$i]['wotecessamt'];
$wotshecessper= $griddet[$i]['wotshecessper'];
$wotshecessamt= $griddet[$i]['wotshecessamt'];
$wotvatper= $griddet[$i]['wotvatper'];
$wotcstper= $griddet[$i]['wotcstper'];
$wottaxamt= $griddet[$i]['wottaxamt'];
$wototheramt= $griddet[$i]['wototheramt'];
$wotcenvat= $griddet[$i]['wotcenvat'];
$wotvat= $griddet[$i]['wotvat'];
$wotcgstper= $griddet[$i]['wotcgstper'];
$wotcgstamt= $griddet[$i]['wotcgstamt'];
$wotsgstper= $griddet[$i]['wotsgstper'];
$wotsgstamt= $griddet[$i]['wotsgstamt'];
$wotigstper= $griddet[$i]['wotigstper'];
$wotigstamt= $griddet[$i]['wotigstamt'];
$wotamount= $griddet[$i]['wotamount'];
$cancelflag= $griddet[$i]['cancelflag'];

     
 $query4= "insert into trnpur_workorder_trailer values('$wohseqno','$wotslno','$wotitemcode','$wotunit','$wotrate','$wotqty' ,'$wotdcraised',
'$wotrecd','$wotvalue','$wotdisper','$wotdisamt','$wotedper','$wotedamt','$wotecessper','$wotecessamt','$wotshecessper','$wotshecessamt',
'$wotvatper','$wotcstper','$wottaxamt','$wototheramt','$wotcenvat','$wotvat','$wotcgstper','$wotcgstamt','$wotsgstper','$wotsgstamt','$wotigstper',
'$wotigstamt','$wotamount','$cancelflag'"; 
$result4=mysql_query($query4);            
  
}

//}
        
if($result4 && $result3)
//if($result3)
{
            mysql_query("COMMIT");                        
            echo '({"success":"true","wono":"'.$wohno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false","wono":"' . $wohno . '"})';
        }   
        

       
 
?>
