<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadFinishedGoodsEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){

		case "loadcustomer":
		getcustomer();
		break;
		case "loadslipno":
		getslipno();
		break;
		case "loadslipdet":
		getslipdetails();
		break;
		case "loadslipdiscount":
		getslipdiscount();
		break;
		case "loadslipalldetails":
		getslipalldetails();
		break;
		case "loadslipinsurance":
		getslipinsurance();
		break;
        	case "findTaxCode":
		getTaxCode();
		break;
		case "loadhsnlist":
		gethsnlist();
		break;
		case "loadstates":
		getstatelist();
		break;
		case "loadInvoiceNoList":
		getInvoiceNolist();
		break;
		case "loadInvoiceNoDetails":
		getInvoiceNoDetails();
		break;
		case "loadslipdetInv":
		getslipdetailsInv();
		break;
		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        if (version_compare(PHP_VERSION,"5.2","<"))
        {    
            require_once("./JSON.php");   //if php<5.2 need JSON class
            $json = new Services_JSON();  //instantiate new json object
            $data=$json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }


 function getInvoiceNoList()
    {
        mysql_query("SET NAMES utf8");
	$fincode    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invhdate = $_POST['invhdate'];

/*
        $r= "select *   from trnsal_invoice_header where invh_fincode=  $fincode  and invh_comp_code= $compcode and invh_date = '$invhdate' and E_inv_confirm = 'N'  and invh_seqno in (select  max(invh_seqno) from trnsal_invoice_header where invh_fincode=  $fincode and invh_comp_code= $compcode and invh_date = '$invhdate' and invh_invrefno = 'OS/146/23-24')";

echo $r;
*/

        $r=mysql_query("select *   from trnsal_invoice_header where invh_fincode=  $fincode  and invh_comp_code= $compcode and invh_date = '$invhdate' and E_inv_confirm = 'N'  and invh_seqno in (select  max(invh_seqno) from trnsal_invoice_header where invh_fincode=  $fincode and invh_comp_code= $compcode and invh_date = '$invhdate')");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getInvoiceNoDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno = $_POST['invno'];

        $r=mysql_query("select * from trnsal_invoice_header a , massal_customer b where invh_party = cust_code and invh_fincode= $finid  and invh_comp_code= $compcode and invh_seqno = $invno ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

   function getTaxCode()
    {
        mysql_query("SET NAMES utf8");
	$taxcode = $_POST['taxcode'];
        $r=mysql_query("select tax_code,tax_cgst,tax_sgst,tax_igst,tax_sal_led_code,tax_cgst_ledcode,tax_sgst_ledcode,tax_igst_ledcode from massal_tax where tax_code = '$taxcode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



   function getstatelist()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select state_code,state_name from mas_state order by state_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getcustomer()
    {
        mysql_query("SET NAMES utf8");
	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $invno    = $_POST['invno'];
 

if ($invno === "0")
{
        $r=mysql_query("select cust_code,cust_ref ,cust_phone from trnsal_packslip_header a, trnsal_packslip_trailer b, massal_customer c where a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_invstat <> 'T'and a.pckh_party = c.cust_code and a.pckh_fincode = $fincode and a.pckh_comp_code =$compcode  group by cust_code,cust_ref order by cust_code,cust_ref");
}
else
{
        $r=mysql_query("select cust_code,cust_ref ,cust_phone from trnsal_invoice_header , massal_customer  where invh_party = cust_code and  invh_fincode= '$fincode'  and invh_comp_code= '$compcode' and invh_seqno = $invno ");

}


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function getslipno()
    {
        mysql_query("SET NAMES utf8");
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
        $r=mysql_query("select pckh_no from trnsal_packslip_header where pckh_invstat <> 'T' and pckh_party = $custcode and 
pckh_fincode =$fincode  and pckh_comp_code = $compcode and pckh_totwt > 0 group by pckh_no order by pckh_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
  
  }


function getslipdetails()
    {
     mysql_query("SET NAMES utf8");
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
	$slipno = $_POST['slipno'];
	$a4 = $_POST['a4'];
/*
if ($a4 == "Y") 
  {
        $r=mysql_query("select type_name,type_code,sum(pckt_wt) as weight,count(pckt_sr_no)  as nos, pckh_ordno,pckh_orddate,pckh_ackno,pckh_ackdt,pckh_noofreels,pckh_noofbun,pckh_noofreels+pckh_noofbun as nos,case when pckt_unit = 1 then 'Reels' else 'Bundles' end as unit,case when pckt_unit = 1 then var_size2 else concat(convert(var_size1,char), 'X' ,convert(var_size2,char))   end as size,
pckh_date,var_grpcode as varcode ,var_name,var_tariffno as hsncode,pckt_var as sizecode,var_size1,var_size2 , round(ordt_rate /112.1 *100,2) as rate, round(sum(pckt_wt)/1000* ordt_rate,2) as amount, ordt_cash_dis as cashdisc,ordt_cashtag as cashflg,ordt_dealer_dis as dealdisc, ordt_dealertag as dealflg, ordt_reel_dis as reeldisc,ordt_reeltag as reelflg,ordt_reg_dis as regdisc,ordt_regtag as regflg,ordt_addnl_dis as adddisc,ordt_addnltag as addflg, ordt_qcdev_yn as qcdev,ordt_loss_pmt as losspmt ,ordt_crdays,ordt_comm from trnsal_packslip_header a,  trnsal_packslip_trailer b, massal_variety d , trnsal_order_trailer e, massal_invtype f where  a.pckh_invtype = f.type_code and a.pckh_ackno = e.ordt_ackno and a.pckh_fincode = e.ordt_fincode and a.pckh_comp_code = e.ordt_comp_code and b.pckt_var = e.ordt_var_code  and a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_no = $slipno and pckh_party = $custcode and b.pckt_var = d.var_code and b.pckt_fincode = $fincode  and a.pckh_comp_code = $compcode group by type_name,type_code,pckh_ordno,pckh_orddate, pckh_ackno,pckh_ackdt,pckh_noofreels,pckh_noofbun,pckt_unit, var_grpcode, var_name, var_tariffno,pckt_var,pckh_date, var_size1,var_size2,ordt_rate,ordt_cash_dis,ordt_cashtag,ordt_dealer_dis,ordt_dealertag,ordt_reel_dis,ordt_reeltag,ordt_reg_dis,ordt_regtag,ordt_addnl_dis,ordt_addnltag,ordt_qcdev_yn,ordt_loss_pmt,ordt_crdays,ordt_comm");
 }
else
 {
        $r=mysql_query("select type_name,type_code,sum(pckt_wt) as weight,count(pckt_sr_no)  as nos, pckh_ordno,pckh_orddate,pckh_ackno,pckh_ackdt,pckh_noofreels,pckh_noofbun,pckh_noofreels+pckh_noofbun as nos,case when pckt_unit = 1 then 'Reels' else 'Bundles' end as unit,case when pckt_unit = 1 then var_size2 else concat(convert(var_size1,char), 'X' ,convert(var_size2,char))   end as size,
pckh_date,var_grpcode as varcode ,var_name,var_tariffno as hsncode,pckt_var as sizecode,var_size1,var_size2 , ordt_rate as rate, round(sum(pckt_wt)/1000* ordt_rate,2) as amount, ordt_cash_dis as cashdisc,ordt_cashtag as cashflg,ordt_dealer_dis as dealdisc, ordt_dealertag as dealflg, ordt_reel_dis as reeldisc,ordt_reeltag as reelflg,ordt_reg_dis as regdisc,ordt_regtag as regflg,ordt_addnl_dis as adddisc,ordt_addnltag as addflg, ordt_qcdev_yn as qcdev,ordt_loss_pmt as losspmt ,ordt_crdays,ordt_comm from trnsal_packslip_header a,  trnsal_packslip_trailer b, massal_variety d , trnsal_order_trailer e, massal_invtype f where  a.pckh_invtype = f.type_code and a.pckh_ackno = e.ordt_ackno and a.pckh_fincode = e.ordt_fincode and a.pckh_comp_code = e.ordt_comp_code and b.pckt_var = e.ordt_var_code  and a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_no = $slipno and pckh_party = $custcode and b.pckt_var = d.var_code and b.pckt_fincode = $fincode  and a.pckh_comp_code = $compcode group by type_name,type_code,pckh_ordno,pckh_orddate, pckh_ackno,pckh_ackdt,pckh_noofreels,pckh_noofbun,pckt_unit, var_grpcode, var_name, var_tariffno,pckt_var,pckh_date, var_size1,var_size2,ordt_rate,ordt_cash_dis,ordt_cashtag,ordt_dealer_dis,ordt_dealertag,ordt_reel_dis,ordt_reeltag,ordt_reg_dis,ordt_regtag,ordt_addnl_dis,ordt_addnltag,ordt_qcdev_yn,ordt_loss_pmt,ordt_crdays,ordt_comm");
 }
*/

if ($a4 == "Y") 
  {
        $r=mysql_query("select type_name,type_code,sum(pckt_wt) as weight,count(pckt_sr_no)  as nos, pckh_ordno,pckh_orddate,pckh_ackno,pckh_ackdt,pckh_noofreels,pckh_noofbun,case when pckt_unit = 1 then 'Reels' else 'Bundles' end as unit,case when pckt_unit = 1 then var_size2 else concat(convert(var_size1,char), 'X' ,convert(var_size2,char))   end as size,
pckh_date,var_grpcode as varcode ,var_name,var_tariffno as hsncode,pckt_var as sizecode,var_size1,var_size2 , round(ordt_rate /112.1 *100,2) as rate, round(sum(pckt_wt)/1000* ordt_rate,2) as amount, ordt_cash_dis as cashdisc,ordt_cashtag as cashflg,ordt_dealer_dis as dealdisc, ordt_dealertag as dealflg, ordt_reel_dis as reeldisc,ordt_reeltag as reelflg,ordt_reg_dis as regdisc,ordt_regtag as regflg,ordt_addnl_dis as adddisc,ordt_addnltag as addflg, ordt_qcdev_yn as qcdev,ordt_loss_pmt as losspmt ,ordt_crdays,ordt_comm from trnsal_packslip_header a,  trnsal_packslip_trailer b, massal_variety d , trnsal_order_trailer e, massal_invtype f where  a.pckh_invtype = f.type_code and a.pckh_ackno = e.ordt_ackno and a.pckh_fincode = e.ordt_fincode and a.pckh_comp_code = e.ordt_comp_code and b.pckt_var = e.ordt_var_code  and a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_no = $slipno and pckh_party = $custcode and b.pckt_var = d.var_code and b.pckt_fincode = $fincode  and a.pckh_comp_code = $compcode group by type_name,type_code,pckh_ordno,pckh_orddate, pckh_ackno,pckh_ackdt,pckh_noofreels,pckh_noofbun,pckt_unit, var_grpcode, var_name, var_tariffno,pckt_var,pckh_date, var_size1,var_size2,ordt_rate,ordt_cash_dis,ordt_cashtag,ordt_dealer_dis,ordt_dealertag,ordt_reel_dis,ordt_reeltag,ordt_reg_dis,ordt_regtag,ordt_addnl_dis,ordt_addnltag,ordt_qcdev_yn,ordt_loss_pmt,ordt_crdays,ordt_comm");
 }
else
 {
        $r=mysql_query("select type_name,type_code,sum(pckt_wt) as weight,count(pckt_sr_no)  as nos, pckh_ordno,pckh_orddate,pckh_ackno,pckh_ackdt,pckh_noofreels,pckh_noofbun,case when pckt_unit = 1 then 'Reels' else 'Bundles' end as unit,case when pckt_unit = 1 then var_size2 else concat(convert(var_size1,char), 'X' ,convert(var_size2,char))   end as size,
pckh_date,var_grpcode as varcode ,var_name,var_tariffno as hsncode,pckt_var as sizecode,var_size1,var_size2 , ordt_rate as rate, round(sum(pckt_wt)/1000* ordt_rate,2) as amount, ordt_cash_dis as cashdisc,ordt_cashtag as cashflg,ordt_dealer_dis as dealdisc, ordt_dealertag as dealflg, ordt_reel_dis as reeldisc,ordt_reeltag as reelflg,ordt_reg_dis as regdisc,ordt_regtag as regflg,ordt_addnl_dis as adddisc,ordt_addnltag as addflg, ordt_qcdev_yn as qcdev,ordt_loss_pmt as losspmt ,ordt_crdays,ordt_comm from trnsal_packslip_header a,  trnsal_packslip_trailer b, massal_variety d , trnsal_order_trailer e, massal_invtype f where  a.pckh_invtype = f.type_code and a.pckh_ackno = e.ordt_ackno and a.pckh_fincode = e.ordt_fincode and a.pckh_comp_code = e.ordt_comp_code and b.pckt_var = e.ordt_var_code  and a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_no = $slipno and pckh_party = $custcode and b.pckt_var = d.var_code and b.pckt_fincode = $fincode  and a.pckh_comp_code = $compcode group by type_name,type_code,pckh_ordno,pckh_orddate, pckh_ackno,pckh_ackdt,pckh_noofreels,pckh_noofbun,pckt_unit, var_grpcode, var_name, var_tariffno,pckt_var,pckh_date, var_size1,var_size2,ordt_rate,ordt_cash_dis,ordt_cashtag,ordt_dealer_dis,ordt_dealertag,ordt_reel_dis,ordt_reeltag,ordt_reg_dis,ordt_regtag,ordt_addnl_dis,ordt_addnltag,ordt_qcdev_yn,ordt_loss_pmt,ordt_crdays,ordt_comm");
 }

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getslipdiscount()
    {
        mysql_query("SET NAMES utf8");
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$varcode = $_POST['varcode'];
	$slipno = $_POST['slipno'];
        $r=mysql_query("select * from trnsal_order_trailer where ordt_fincode = $fincode and ordt_ackno = $slipno and ordt_var_code = $varcode and ordt_comp_code = $compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getslipalldetails()
    {
        mysql_query("SET NAMES utf8");
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$ordno = $_POST['ordno'];
//	$orddate = $_POST['orddate'];
//        $r=mysql_query("select * from trnsal_order_header, massal_tax where ordh_ackno = $ordno
//and ordh_ackdate = '$orddate' and ordh_fincode = $fincode and ordh_comp_code = $compcode and ordh_tax = tax_code ");

        $r=mysql_query("select cust_ref as agentname,ordh_agent as agentcode,ordh_tax, 
tax_name,ordh_sgst,ordh_cgst,ordh_igst,ordh_ins_yn ,ordh_insper,ordh_gracedays ,ordh_docu,ordh_dest,ordh_delivery_add1,
ordh_delivery_add2,ordh_delivery_add3,ordh_delivery_city,ordh_delivery_pin,ordh_delivery_gst,ordh_cust_rem,
ordh_our_rem,ordh_bank, sup_refname as transport,ordh_trans,ordh_odiper,ordh_frt from trnsal_order_header,massal_tax , massal_customer, maspur_supplier_master where ordh_trans = sup_code and ordh_comp_code =  $compcode and ordh_fincode = $fincode and ordh_ackno = $ordno and ordh_tax = tax_code and ordh_agent =cust_code");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getslipinsurance()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
        $r=mysql_query("select * from massal_default1 where def_comp_code = $compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function gethsnlist()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select tariff_code,tariff_name from massal_tariff ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getslipdetailsInv()
    {
     mysql_query("SET NAMES utf8");
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
	$slipno = $_POST['slipno'];
	$r=mysql_query("select sum(pckt_wt) as weight,count(pckt_sr_no)  as nos,pckh_noofreels, 
var_size2 as size,pckh_date,var_grpcode as varcode ,var_name,var_tariffno as hsncode,pckt_size as sizecode,var_size1,var_size2 , ordt_rate as rate, round(sum(pckt_wt)/1000* ordt_rate,2) as amount,pckh_truck  from trnsal_packslip_header a,  trnsal_packslip_trailer b, massal_variety d , trnsal_order_trailer e where  b.pckt_sono = e.ordt_sono and a.pckh_fincode >= e.ordt_fincode and a.pckh_comp_code = e.ordt_comp_code and b.pckt_size = e.ordt_var_code  and a.pckh_no = b.pckt_no and a.pckh_comp_code = b.pckt_comp_code and a.pckh_fincode = b.pckt_fincode and pckh_no =$slipno  and pckh_party = $custcode and b.pckt_size = d.var_code and a.pckh_no = b.pckt_no and b.pckt_fincode =$fincode   and a.pckh_comp_code = $compcode group by  pckh_noofreels, var_grpcode,var_name,var_tariffno,pckt_size,pckh_date,var_size1,var_size2, ordt_rate,pckh_truck");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
