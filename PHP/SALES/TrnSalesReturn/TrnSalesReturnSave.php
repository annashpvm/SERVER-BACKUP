<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$griddet      = json_decode($_REQUEST['griddet'],true);
$rowcnt       = $_REQUEST['cnt'];
$savetype     = $_POST['savetype'];
$rethcompcode = $_POST['rethcompcode'];
$rethfincode = $_POST['rethfincode'];
$rethno      = $_POST['rethno'];
$rethdate    = $_POST['rethdate'];
$rethcust    = $_POST['rethcust'];
$rethnoofreels = $_POST['rethnoofreels'];
$rethtotwt   = $_POST['rethtotwt'];
$rethretwt   = $_POST['rethretwt'];
$rethtaxtag  = $_POST['rethtaxtag'];
$rethinsper  = $_POST['rethinsper'];
$rethinsamt  = $_POST['rethinsamt'];
$rethfrieght = (float)$_POST['rethfrieght'];
$rethroff    = $_POST['rethroff'];
$rethamt     = $_POST['rethamt'];
$rethinvno   = $_POST['rethinvno'];
$rethinvdate = $_POST['rethinvdate'];
$rethvouno   = $_POST['rethvouno'];
$rethvouyear = $_POST['rethvouyear'];
$rethcgstper = $_POST['rethcgstper'];
$rethcgstamt = $_POST['rethcgstamt'];
$rethsgstper = $_POST['rethsgstper'];
$rethsgstamt = $_POST['rethsgstamt'];
$rethigstper = $_POST['rethigstper'];
$rethigstamt = $_POST['rethigstamt'];
$rethslipno  = $_POST['rethslipno'];
$rethtaxable = $_POST['rethtaxable'];
$rethtcs     = (float) $_POST['rethtcs'];

$narration   = "Sales Return";

$salesLedCode = 0;
$cgstLedCode  = 0;
$sgtLedCode   = 0;
$igstLedCode  = 0;

mysql_query("SET NAMES utf8");




mysql_query("BEGIN");



#Find Customer Ledger code

$query103      = "select led_code from acc_ledger_master where led_custcode = $rethcust and led_type = 'C'";

$result103     = mysql_query($query103);
$rec103        = mysql_fetch_array($result103);
$cust_ledger   = $rec103['led_code'];


#Find Insurance Ledger code
$query102    	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'insurance'";
$result102   	= mysql_query($query102);
$rec102      	= mysql_fetch_array($result102);
$ins_ledger	= $rec102['lnk_ledcode'];

#Find Freight Ledger code
if  (substr($rethinvno,0,2) == "TN")
    $query102  	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'TNfreight'";
else
    $query102  	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'OSfreight'";

$result102   	= mysql_query($query102);
$rec102      	= mysql_fetch_array($result102);
$frt_ledger	= $rec102['lnk_ledcode'];

#Find Rounindoff  Ledger code
$query102    	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'roundoff'";
$result102   	= mysql_query($query102);
$rec102      	= mysql_fetch_array($result102);
$round_ledger	= $rec102['lnk_ledcode'];

#Find TCS  Ledger code
$query102    	= "select lnk_ledcode from acc_link_ledger where lnk_system = 'sales' and lnk_name = 'TCS'";
$result102   	= mysql_query($query102);
$rec102      	= mysql_fetch_array($result102);
$TCSledger	= $rec102['lnk_ledcode'];


#Find Sales / GST ledgers
$query102    	= "select * from massal_tax where tax_code ='$rethtaxtag'";
$result102   	= mysql_query($query102);
$rec102      	= mysql_fetch_array($result102);
$salesLedCode   = $rec102['tax_sal_led_code'];
$cgstLedCode    = $rec102['tax_cgst_ledcode'];
$sgstLedCode    = $rec102['tax_sgst_ledcode'];
$igstLedCode    = $rec102['tax_igst_ledcode'];


$voutype ='GSR';

if ($savetype == "Add") {
	$query2 = "select ifnull(max(reth_no),0)+1 as reth_no from trnsal_salret_header where reth_fincode = '$rethfincode' and reth_comp_code= '$rethcompcode';";
	$result2= mysql_query($query2);
	$rec2 = mysql_fetch_array($result2);
	$rethno=$rec2['reth_no'];
	$rethvouno = 'GSR'.trim((String)$rethno);

	 $query1= "insert into trnsal_salret_header values('$rethcompcode', '$rethfincode', '$rethno', '$rethdate', '$rethcust', '$rethnoofreels','$rethtotwt', '$rethtaxtag', '$rethinsper', '$rethinsamt','$rethfrieght', '$rethroff', '$rethamt', '$rethinvno', '$rethinvdate', '$rethtaxable','$rethcgstper',  '$rethcgstamt','$rethsgstper', '$rethsgstamt', '$rethigstper', '$rethigstamt','$rethslipno','', '$rethvouyear','0','$rethdate','N','$rethretwt','$rethtcs' )";
	 $result1=mysql_query($query1); 

//echo $query1;
//echo "<br>";

}
else
{

	 $query1= "update trnsal_salret_header set reth_noofreels =  '$rethnoofreels' ,reth_totwt = '$rethtotwt',reth_insper =  '$rethinsper', reth_insamt = '$rethinsamt' , reth_frieght ='$rethfrieght',reth_roff =  '$rethroff', reth_amt =  '$rethamt', reth_taxable = '$rethtaxable',  reth_cgst_amt = '$rethcgstamt', reth_sgst_amt = '$rethsgstamt', reth_igst_amt = '$rethigstamt',reth_date = '$rethdate' ,reth_return_wt = '$rethretwt' , reth_tcs =  '$rethtcs' where reth_comp_code = '$rethcompcode'  and reth_fincode =  '$rethfincode' and reth_no = '$rethno'";
	 $result1=mysql_query($query1); 

	$query2 = "update trnsal_finish_stock, trnsal_salret_trailer set  stk_retno = 0, stk_rettag = '' , stk_retdt = NULL where rett_var = stk_var_code and rett_sr_no = stk_sr_no and  rett_comp_code = stk_comp_code  and rett_fincode = stk_finyear and rett_comp_code = '$rethcompcode' and rett_fincode = '$rethfincode' and rett_no ='$rethno'";
	 $result2=mysql_query($query2);  

	$query3 = "update trnsal_packslip_trailer, trnsal_salret_trailer set pckt_rettag = 'N' where rett_var = pckt_size and rett_sr_no = pckt_sr_no and  rett_comp_code = pckt_comp_code  and rett_fincode = pckt_fincode and rett_comp_code = '$rethcompcode' and rett_fincode = '$rethfincode' and rett_no ='$rethno'";
	 $result3=mysql_query($query3);

	$query4 = "delete from trnsal_salret_trailer where rett_comp_code = '$rethcompcode' and rett_fincode = '$rethfincode' and rett_no ='$rethno'";
	 $result4=mysql_query($query4);  

}


for ($i=0;$i<$rowcnt;$i++)

{
$retvar         = $griddet[$i]['itemcode'];
$retsrno        = $griddet[$i]['number'];
$retwt          = $griddet[$i]['weight'];
$returate       = $griddet[$i]['unitrate'];
$retsrnofincode = $griddet[$i]['fincode'];
$rethsncode     = $griddet[$i]['hsncode'];
$retretwt      =  $griddet[$i]['retweight'];
$retwtchange   = $griddet[$i]['wtchange'];
$retnewno      = (int) $griddet[$i]['newnumber'];
$diffwt        =  $retwt-$retretwt;

$query3= "insert into trnsal_salret_trailer values('$rethcompcode','$rethfincode','$rethno','$retvar','$retsrno','$retwt','$returate', '$retsrnofincode', '$rethsncode','$retretwt','$retwtchange','$retnewno')";

//echo $query3; 
//echo "<br>";

$result3=mysql_query($query3);       



$query4 = "update trnsal_finish_stock set stk_wt =  $retretwt , stk_destag = '', stk_rettag = 'T' , stk_retno = '$rethno' ,stk_retdt = '$rethdate'  where stk_slipno = '$rethslipno' and  stk_sr_no = '$retsrno' and stk_comp_code = '$rethcompcode' and stk_finyear = '$retsrnofincode'";

//echo $query4; 
//echo "<br>";
$result4=mysql_query($query4);  

  


//$query5 = "update trnsal_packslip_trailer set pckt_wt = $retretwt , pckt_rettag = 'T' where pckt_sr_no = '$retsrno'  and pckt_fincode = '$rethvouyear' and pckt_comp_code = '$rethcompcode'";  

$query5 = "update trnsal_packslip_trailer set pckt_rettag = 'T' where pckt_sr_no = '$retsrno'  and pckt_fincode = '$rethvouyear' and pckt_comp_code = '$rethcompcode'";  

//echo $query5; 
//echo "<br>";

$result5=mysql_query($query5);



if ($retnewno > 0)
{ 
	$query = "select * from trnsal_finish_stock where stk_comp_code = '$rethcompcode' and stk_sr_no = '$retsrno'  ;";
	$result= mysql_query($query);
        while ($row = mysql_fetch_assoc($result)) {
            $proddate = $row['stk_ent_date'];
            $sono     = $row['stk_sono'];
            $yymm     = $row['stk_yymm'];
            $rollno   = $row['stk_rollno'];
            $slipno   = $row['stk_slipno'];
            $shift    = $row['stk_shift'];
            $despdate = $row['stk_desdt'];
        }   

	$query6 = "insert into trnsal_finish_stock  (stk_comp_code,stk_finyear,stk_ent_no,stk_ent_date,stk_var_code,stk_sr_no,stk_wt,stk_sono,stk_source,stk_yymm, stk_rollno, stk_shift, stk_first_wt,stk_slipno,stk_desdt,stk_destag) VALUES ('$rethcompcode','$rethfincode','500','$proddate','$retvar','$retnewno' , '$diffwt','$sono','R' , '$yymm'  ,'$rollno' , '$shift', '$diffwt','$slipno','$despdate','T')";

	//echo $query6; 
	//echo "<br>";
	$result6=mysql_query($query6);  

	$query = "select * from trnsal_packslip_trailer where pckt_fincode = '$rethvouyear'  and  pckt_comp_code = '$rethcompcode' and pckt_no = '$rethslipno';";
	$result= mysql_query($query);
//echo $query; 
//echo "<br>";

        while ($row = mysql_fetch_assoc($result)) {
            $psize    = $row['pckt_size'];
            $psono    = $row['pckt_sono'];
            $psodate  = $row['pckt_sodate'];
            $pfincode = $row['pckt_srno_fincode'];

//echo $psize; 
//echo "<br>";

        }   

	$query7 = "insert into trnsal_packslip_trailer  (pckt_comp_code, pckt_fincode, pckt_no, pckt_size, pckt_sono, pckt_sodate, pckt_sr_no, pckt_wt, pckt_rettag, pckt_srno_fincode) VALUES ('$rethcompcode','$rethvouyear','$rethslipno','$psize','$psono','$psodate','$retnewno', '$diffwt','N', '$pfincode')";

//	echo $query7; 
//	echo "<br>";
	$result7=mysql_query($query7); 
}
}




if ($savetype == "Add") {
	if( $result1  &&  $result3  && $result4  && $result5)
	{
		mysql_query("COMMIT");                        
		echo '({"success":"true","retno":"'. $rethno . '"})';

		    
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","retno":"' . $rethno . '"})';
	} 
}
else
{
	if( $result1  && $result2 && $result3 && $result4)
	{
		mysql_query("COMMIT");                        
		echo '({"success":"true","retno":"'. $rethno . '"})';

		    
	}
	else
	{
	    mysql_query("ROLLBACK");            
	    echo '({"success":"false","retno":"' . $rethno . '"})';
	} 
}

