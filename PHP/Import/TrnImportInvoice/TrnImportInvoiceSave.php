<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$savetype = $_POST['savetype'];

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];
$invseqno        = $_POST['invseqno'];
$invhcompcode    = $_POST['compcode'];
$invhfincode     = $_POST['finid'];
$invhslno        = $_POST['invslno'];
$invhno          = $_POST['invno'];
$invhdate        = $_POST['invdate'];
$invhrefno       = $_POST['refno'];
$invhrefdate     = $_POST['refdate'];
$poseqno         = $_POST['poseqno'];
$invhsup_code    = $_POST['party'];
$invhagent       = $_POST['agent'];
$payterms       = $_POST['payterms'];
$delyterms       = $_POST['delyterms'];
$shipdetails    = $_POST['shipdetails'];
$country       = $_POST['country'];
$loadingport= $_POST['loadingport'];
$discharport = $_POST['discharport'];

$bankacno       = $_POST['bankacno'];
$bankname       = $_POST['bankname'];
$bankcode       = $_POST['bankcode'];
$branchcode       = $_POST['branchcode'];
$swiftcode       = $_POST['swiftcode'];
$bankadd1       = $_POST['bankadd1'];
$bankadd2       = $_POST['bankadd2'];
$bankadd3       = $_POST['bankadd3'];
$blno     = $_POST['blno'];
$bldate   = $_POST['bldate'];
$beno     = $_POST['beno'];
$bedate   = $_POST['bedate'];
$vessal   = $_POST['vessal'];
$totvalue = $_POST['totvalue'];
$exrate   = $_POST['exrate'];
$con_20feet   =  (int) $_POST['con_20feet'];
$con_40feet   =  (int)$_POST['con_40feet'];
//$deliremakrs   = $_POST['deliremakrs'];

$invhlcdays   = 0;
$invhnagodays   = 0;
$invhcreditdays   = 0;



if ($savetype === "Add")
{

	 $query1 = "select IFNULL(max(invh_seqno),0)+1 as invseqno from trnirm_invoice_header";
	 $result1 = mysql_query($query1);
	 $rec1 = mysql_fetch_array($result1);
	 $invseqno =$rec1['invseqno'];

	 $query2 = "select IFNULL(max(invh_invoiceno),0)+1 as invhno from trnirm_invoice_header where invh_fincode = '$invhfincode' and invh_compcode='$invhcompcode'";
	 $result2= mysql_query($query2);
	 $rec2   = mysql_fetch_array($result2);
	 $invhslno = $rec2['invhno'];
//echo  $query2;
          mysql_query("BEGIN");

    $query3= "insert into trnirm_invoice_header ( invh_seqno, invh_compcode, invh_fincode, invh_invoiceno, invh_invoicerefno, invh_date, invh_refno, invh_refdate, invh_poseqno, invh_sup_code, invh_agent, invh_payterms, invh_deliveryterms, invh_shiftment, invh_origincountry, invh_originport, invh_arrivalport, invh_bankacno, invh_bankname, invh_bankcode, invh_branchcode, invh_swiftcode, invh_bankadd1, invh_bankadd2, invh_bankadd3,  invh_billladingno, invh_billladingdate, invh_billentryno, invh_billentrydate, invh_exchangerate, invh_invoicevalue,invh_vesselname,invh_20feet_container,invh_40feet_container ) values  ('$invseqno','$invhcompcode','$invhfincode','$invhslno','$invhno','$invhdate','$invhrefno','$invhrefdate','$poseqno','$invhsup_code', '$invhagent','$payterms','$delyterms','$shipdetails','$country','$loadingport','$discharport','$bankacno','$bankname','$bankcode', '$branchcode','$swiftcode','$bankadd1','$bankadd2','$bankadd3','$blno','$bldate','$beno','$bedate','$exrate','$totvalue','$vessal', '$con_20feet','$con_40feet')";

 $result3=mysql_query($query3);
//echo  $query3;
}

else
{

 $query3= "update trnirm_invoice_header set invh_invoicerefno = '$invhno',invh_date = '$invhdate', invh_refno = '$invhrefno', invh_refdate = '$invhrefdate', invh_payterms = '$payterms' , invh_deliveryterms = '$delyterms', invh_shiftment ='$shipdetails', invh_origincountry = '$country', invh_originport = '$loadingport' , invh_arrivalport = '$discharport', invh_bankacno = '$bankacno', invh_bankname = '$bankname', invh_bankcode = '$bankcode', invh_branchcode = '$branchcode', invh_swiftcode = '$swiftcode', invh_bankadd1 = '$bankadd1', invh_bankadd2 = '$bankadd2', invh_bankadd3 = '$bankadd3',  invh_billladingno = '$blno', invh_billladingdate = '$bldate', invh_billentryno = '$beno', invh_billentrydate = '$bedate', invh_exchangerate = '$exrate', invh_invoicevalue = '$totvalue' ,invh_vesselname = '$vessal' ,invh_20feet_container = '$con_20feet',invh_40feet_container = '$con_40feet' where invh_compcode = '$invhcompcode' and  invh_fincode = '$invhfincode'  and invh_invoiceno = '$invhslno'";
 


 $result3=mysql_query($query3);

//  echo  $query3;

 $query4  = "call spirm_del_invqty ('$poseqno','$invseqno')";
 $result4 = mysql_query($query4);


//  $query4= "delete from trnirm_invoice_trailer where invt_hdseqno = '$invseqno'";
//  $result4=mysql_query($query4);

//  echo  $query4;

//   $query= "call spirm_upd_invqty ('$poseqno','$itemcode',('$degradeqty'+'$grnqty'),0,'$invseqno')";
//   $result5=mysql_query($query7);

}



for ($i=0;$i<$rowcnt;$i++)
{
$sno = $i + 1;



$itemcode = $griddet[$i]['itemcode'];
$invqty   = $griddet[$i]['qty'];
$invrate  = $griddet[$i]['rate'];
$exrate   = $griddet[$i]['exrate'];
$invvalue = $griddet[$i]['value'];

$moisper      = 0;
$tareper      = 0;
$outthrow     = 0;
$prohibitive  = 0;
 $query4= "insert into trnirm_invoice_trailer values (
'$invseqno', '$sno', '$itemcode' , '$invqty','0', '0', 0, '$moisper', '$outthrow' , '$tareper', '$invrate' , '$exrate' ,'$invvalue')";
 $result4=mysql_query($query4);            
//echo  $query4;


  $query5  = "call spirm_upd_invqty ('$poseqno','$itemcode',$invqty,'$invseqno')";
 $result5 = mysql_query($query5);

//  echo  $query5;

}



if( $result3 && $result4 )
{
            mysql_query("COMMIT");                        
            echo '({"success":"true","ino":"'.$invhno.'"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false","ino":"' .$invhno. '"})';
        }   
        

   
?>
