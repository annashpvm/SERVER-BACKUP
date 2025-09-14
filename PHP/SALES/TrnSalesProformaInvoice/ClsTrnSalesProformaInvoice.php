<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadFinishedGoodsEntryNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "loadInvoiceNo":
		getInvoiceNo();
		break;
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
		case "loadShade":
		getShades();
		break;
		case "findShadecode":
		getShadecode();
		break;

        	case "loadcustomer_GST":
		getcustomer_GST();
		break;
		case "findHSNcode":
		getHSNcode();
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
    

 function getInvoiceNo()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select ifnull(max(invh_no),0)+1 as invno from trnsal_proforma_invoice where invh_fincode= $finid  and invh_comp_code= $compcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getInvoiceNoList()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	
        $r=mysql_query("select invh_no  from trnsal_proforma_invoice where invh_fincode= '$finid'  and invh_comp_code= '$compcode'  group by invh_no  order by invh_no desc");
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
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invno    = $_POST['invno'];
        $r=mysql_query("select * from trnsal_proforma_invoice  , massal_customer , masprd_variety where  var_groupcode = invh_variety and invh_party = cust_code and  invh_fincode= $finid  and invh_comp_code= $compcode and invh_no = $invno ");

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
        $r=mysql_query("select tax_code,tax_cgst,tax_sgst,tax_igst from massal_tax where tax_code = '$taxcode'");
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

        $r=mysql_query("select cust_code,cust_ref from  massal_customer group by cust_code,cust_ref order by cust_code,cust_ref");
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
pckh_fincode =$fincode  and pckh_comp_code = $compcode and pckh_totwt > 0 group by pckh_no order by pckh_no");
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

        $r=mysql_query("select cust_ref as agentname,ordh_agent as agentcode,ordh_tax as taxcode, tax_name,ordh_sgst,ordh_cgst,ordh_igst,ordh_ins_yn ,ordh_insper,
ordh_gracedays ,ordh_docu,ordh_dest,ordh_delivery_add1,ordh_delivery_add2,ordh_delivery_add3,ordh_delivery_city,ordh_delivery_pin,ordh_delivery_gst,ordh_cust_rem,
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

        $r=mysql_query("select vargrp_type_hsncode hsncode from masprd_type group by vargrp_type_hsncode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getShades()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select  * from massal_shade order by shade_code");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

    }

 function getShadecode()
    {
        mysql_query("SET NAMES utf8");
     	$shadecode = $_POST['shadecode'];
        $r=mysql_query("select  * from massal_shade where shade_code =  '$shadecode'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getcustomer_GST()
    {
        mysql_query("SET NAMES utf8");

 	$custcode = $_POST['custcode'];
        $r=mysql_query("select cust_taxtag from  massal_customer where cust_code = $custcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getHSNcode()
    {
        mysql_query("SET NAMES utf8");

 	$varcode = $_POST['varcode'];
        $r=mysql_query("select * from masprd_variety , masprd_type where var_typecode = vargrp_type_code and var_groupcode = $varcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
