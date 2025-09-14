<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsupplier":
		getsupplier();
		break;
		case "loadthird":
		getthird();
		break;
		case "loadgrnno":
		getgrnno();
		break;
		case "loadpono":
		getpono();
		break;
		case "loadpoitem":
		getpoitem();
		break;
		case "loaddegritem":
		getdegritem();
		break;
		case "loadpoheader":
		getpoheader();
		break;
		case "loadlotno":
		getlotno();
		break;
		case "loadwtcard":
		getwtcard();
		break;
		case "loadwtcarddt":
		getwtcarddt();
		break;
		case "loadfreight":
		getfreight();
		break;
		case "loaditemqty":
		getitemqty();
		break;
		case "loadamnd":
		getamnd();
		break;
		case "loaddegritemqty":
		getdegritemqty();
		break;
		case "loadgrndetail":
		getgrndetail();
		break;
		case "loadgrnitemdetail":
		getgrnitemdetail();
		break;
		case "loadagent":
		getagent();
		break;
		case "userdet":
		getuserdet();
		break;
		case "loadfreightton":
		getfreightton();
		break;
		case "loadfreightlod":
		getfreightlod();
		break;
		case "loadreceipth":
		getreceipth();
		break;	
		case "loadreceiptt":
		getreceiptt();
		break;	
		case "loadAreaList":
		getAreaList();
		break;

		case "loadQCEntryList":
		getQCEntryList();
		break;

		case "loadQCEntryNoDetail":
		getQCEntryNoDetail();
		break;
		case "loadItemList":
		getItemList();
		break;
		case "loadPurGroup":
		getPurGroup();
		break;
		case "loadPurGroupDetail":
		getPurGroupDetail();
		break;
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;	
             	case "loadDebitLedgers":
		getDebitLedgers();
		break;	

		case "LoadDNNumber":
	        getDNNumber();
		break;

		case "LoadDNDate":
	        getDNDate();
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
    
   
 function getsupplier()
    {
        mysql_query("SET NAMES utf8");
	//$supplier_id = $_POST['supplierid'];

	$r=mysql_query("select cust_ref ,cust_code from trnrm_order_header , massal_customer where ordh_sup_code = cust_code group by cust_ref ,cust_codeorder by cust_ref ,cust_code");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getthird()
    {
        mysql_query("SET NAMES utf8");
	//$supplier_id = $_POST['supplierid'];
	$r=mysql_query("select cust_code,cust_ref from massal_customer where cust_acc_group = 143 order by cust_ref");
	//$r=mysql_query("call sp_pur_supplier_actgrp($supplier_id)");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getagent()
    {
        mysql_query("SET NAMES utf8");
	$sup_code   = $_POST['supcode'];
	$r=mysql_query("call sprm_sel_agentparties ('$sup_code')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})'; 
    }
	
 function getlotno()
    {
        mysql_query("SET NAMES utf8");

	$r=mysql_query("call sp_sel_lot ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getgrndetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno   = $_POST['grnno'];
//	$r=mysql_query(" select * from trnrm_receipt_header a ,massal_customer s , mas_RMFU_purchasetax p where rech_seqno= $grnno and  s.cust_code=a.rech_sup_code  and rech_purledger = tax_purcode");
	$r=mysql_query(" select * from trnrm_receipt_header a ,massal_customer s , mas_RMFU_purchasetax p  , acc_trail t 
 where rech_seqno= $grnno and  s.cust_code=a.rech_sup_code  and rech_purledger = tax_purcode and rech_acc_seqno = acctrail_accref_seqno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	

 function getgrnitemdetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno   = $_POST['grnno'];
	$ordno   = $_POST['ordno'];


	$r=mysql_query("select a1.* , case when c1.ordt_pen_qty > 0 then c1.ordt_pen_qty else 0 end as pendqty from (select * from  trnrm_receipt_header a, trnrm_receipt_trailer b,  masrm_item_header  c  , trn_qc_rm_inspection d 
where b.rect_item_code = c.itmh_code and a.rech_seqno = b.rect_hdseqno and qc_rm_compcode = rech_compcode and qc_rm_fincode = rech_fincode and  qc_rm_entryno = rech_qc_ins_no and  qc_rm_itemcode =  rect_item_code and  a.rech_compcode = '$compcode'  and a.rech_fincode = '$finid' and rech_no = '$grnno' ) a1 left join trnrm_order_header b1 on a1.rech_ordhdseqno = b1.ordh_seqno left join trnrm_order_trailer c1 on c1.ordt_hdseqno = b1.ordh_seqno and  a1.rect_item_code = c1.ordt_item_code  and ordt_status = '' order by rect_seqno");


	$r=mysql_query("select a1.* , case when c1.ordt_pen_qty > 0 then c1.ordt_pen_qty else 0 end as pendqty from (select * from  trnrm_receipt_header a, trnrm_receipt_trailer b,  masrm_item_header  c  , trn_qc_rm_inspection d 
where b.rect_item_code = c.itmh_code and a.rech_seqno = b.rect_hdseqno and qc_rm_compcode = rech_compcode and qc_rm_fincode = rech_fincode and  qc_rm_entryno = rech_qc_ins_no and  qc_rm_itemcode =  rect_item_code and  a.rech_compcode = '$compcode'  and a.rech_fincode = '$finid' and rech_no = '$grnno'  and rect_item_code = qc_rm_itemcode and rect_ticketno = qc_rm_ticketno ) a1 left join trnrm_order_header b1 on a1.rech_ordhdseqno = b1.ordh_seqno left join trnrm_order_trailer c1 on c1.ordt_hdseqno = b1.ordh_seqno and  a1.rect_item_code = c1.ordt_item_code  and ordt_status = '' order by rect_seqno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getpoheader()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$r=mysql_query("call sprm_sel_orderheader ('$ordcode') ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getwtcard()
    {
        mysql_query("SET NAMES utf8");
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$wc_sup_code   = $_POST['supcode'];
	$wc_itemgrp   = $_POST['finmodtype'];
	$rech_type   = $_POST['finrecpttype'];
	$grnno   = $_POST['grnno'];

	$r=mysql_query("call sp_sel_wtcards('$wc_compcode','$wc_fincode','$wc_sup_code','0','0','$grnno')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getwtcarddt()
    {
        mysql_query("SET NAMES utf8");
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$wc_seqno   = $_POST['wtcode'];


	$r=mysql_query("call sp_sel_wtcarddet('$wc_seqno')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getfreight()
    {
        //mysql_query("SET NAMES utf8");
	$wc_fincode    = $_POST['finid'];
	$wc_compcode = $_POST['compcode'];
	$freightJ   = $_POST['freightJ'];
	$supcode   = $_POST['supcode'];
	$fareacode   = $_POST['fareacode'];
	$itemcode   = $_POST['itemcode'];
	mysql_query("SET NAMES utf8");

	if ( $freightJ = "Tonn")
	{
		$r=mysql_query("call sp_sel_tonfreight('$supcode','$fareacode','$itemcode','4')");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
			$arr[]= $re ;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
	}
	else if ($freightJ = "LoadJ")
	{
		$r=mysql_query("call sp_sel_loadfreight('$wc_seqno')");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
			$arr[]= $re ;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
	}
		
    }
 function getgrnno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$gstFlag = $_POST['gstFlag'];
	if($gstFlag === "Add")
	{
           if ($finid <24)
        	$r=mysql_query("select ifnull(max(rech_no),0)+1 as grnno from trnrm_receipt_header where rech_fincode=$finid and rech_compcode=$compcode");
           else
      	$r=mysql_query("select ifnull(max(convert(substring(rech_no,3),signed)),0) +1 as grnno from trnrm_receipt_header where  rech_fincode = $finid and rech_compcode = $compcode");
	}
	else if($gstFlag === "Edit")
	{
		$r=mysql_query("call sprm_sel_receiptnos ('$compcode','$finid','L')");
	}

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getpono()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$supcode   = $_POST['supcode'];
	//$r=mysql_query("select ordh_seqno,ordh_no from trnrm_order_header where ordh_sup_code= '$supcode' and ordh_compcode=$compcode and ordh_fincode=$finid ");

	$r=mysql_query("call sprm_sel_partyorders('$compcode','$finid','$supcode',0)");

		$r=mysql_query("select 'Not Applicable' ordh_no, '0' ordh_seqno union all select ordh_no,ordh_seqno from trnrm_order_header , trnrm_order_trailer where ordh_seqno = ordt_hdseqno and  ordh_compcode = $compcode and ordh_fincode = $finid  and ordh_sup_code = $supcode and ordh_status != 'C' and ordt_pen_qty > 0 group by ordh_no,ordh_seqno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getpoitem()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ordcode   = $_POST['ordcode'];
	$r=mysql_query("call sprm_sel_orditems ('$ordcode')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getdegritem()
    {
//        mysql_query("SET NAMES utf8");

	$r=mysql_query("call sprm_sel_itemdetails ('0')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


function getamnd()
{
        mysql_query("SET NAMES utf8");
	$item = $_POST['item'];
	$pono = $_POST['pono'];
	$billdate = $_POST['billdate'];
	$qrycode = $_POST['qrycode'];
	
	if ($qrycode = "GRN") {
		$r = mysql_query("call sprm_sel_grnqty('$pono','$item')");
		
	}
	else if ($qrycode = "RATE") {
		$r = mysql_query("call sprm_sel_amndorddets('$pono','$item','$billdate')");
	}

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getitemqty()
{
        mysql_query("SET NAMES utf8");
	$item = $_POST['item'];
	$pono = $_POST['pono'];
	$status = $_POST['status'];	
	$r = mysql_query("call sprm_sel_orditem_dets('$pono','$item','$status')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getdegritemqty()
{
        mysql_query("SET NAMES utf8");
	$item = $_POST['item'];
	$supno = $_POST['supno'];
	
	$r = mysql_query("call sprm_sel_supitemrate('$supno','$item')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getuserdet()
{
        mysql_query("SET NAMES utf8");
	
	$userid = $_POST['userid'];
	
	$r = mysql_query("select * from mas_users where usr_code = '$userid'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getfreightton()
    {

	$suplrcode = $_POST['suplrcode'];
	mysql_query("SET NAMES utf8");

	$r=mysql_query("select * from mas_areaitemfreight where aif_type=1 and aif_party_code='$suplrcode'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }
 function getfreightlod()
    {

	$suplrcode = $_POST['suplrcode'];
	mysql_query("SET NAMES utf8");

	$r=mysql_query("select * from mas_areafreight where arf_type=1 and arf_party_code='$suplrcode'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }
 function getreceipth()
    {

	$edgrnno = $_POST['edgrnno'];
	mysql_query("SET NAMES utf8");

	$r=mysql_query("call sprm_sel_receiptheader ('$edgrnno')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }    
 function getreceiptt()
    {

	$edgrnno = $_POST['edgrnno'];
	mysql_query("SET NAMES utf8");

	$r=mysql_query("call sprm_sel_receipttrailer ('$edgrnno')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
		$arr[]= $re ;
	}
	$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
		
    }    
   
 function getAreaList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select area_name,area_code from mas_area order by area_name asc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function getQCEntryList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$supcode = $_POST['supcode'];


        $r=mysql_query("select qc_rm_entryno from trn_qc_rm_inspection where qc_rm_supcode = $supcode and qc_rm_grn_status = 'N' and qc_rm_compcode = '$compcode' and qc_rm_fincode = $finid group by qc_rm_entryno order by qc_rm_entryno desc");





	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }





 function getQCEntryNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entryno  = $_POST['entryno'];


        $r=mysql_query("select * from trn_qc_rm_inspection , masrm_item_header,massal_customer , mas_area ,mas_areagroup ,mas_RMFU_purchasetax   where  qc_rm_pur_ledger =tax_purcode  and area_grpcode = areagrp_code and qc_rm_supcode = cust_code and qc_rm_area = area_code  and qc_rm_itemcode = itmh_code and qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $entryno order by qc_rm_slno");


        $r=mysql_query("select * from 
(select * from trn_qc_rm_inspection , masrm_item_header,massal_customer , mas_area ,mas_areagroup where  area_grpcode = areagrp_code and qc_rm_supcode = cust_code and qc_rm_area = area_code and qc_rm_itemcode = itmh_code and qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno =  $entryno order by qc_rm_slno ) a1 left join mas_RMFU_purchasetax b1 on  qc_rm_pur_ledger =tax_purcode order by qc_rm_slno");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getItemList()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select *  from masrm_item_header order by itmh_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

	function getPurGroup()
    {
	$supptype     = $_POST['supptype'];
        $gsttype =$_POST['gsttype'];

        if ($gsttype == 'G')
           $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst > 0 and tax_purtype = 'RM'order by tax_purname");
        else
           $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_gst = 0 and tax_purtype = 'RM'order by tax_purname");

           $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_state = $supptype and tax_purtype = 'RM'order by tax_purname");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getPurGroupDetail()
    {
	$purcode     = $_POST['purcode'];

        $r=mysql_query("select * from mas_RMFU_purchasetax  where tax_purcode = $purcode order by tax_purname");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getSearchLedgerlist()
    {
        mysql_query("SET NAMES utf8");
        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 
/*
        if ($ledname == '')
	        $qry = "select * from (select  cust_code,cust_name,qc_rm_supcode,cust_taxtag,sup_wp_gstinv_supplier_yn from trn_qc_rm_inspection,massal_customer  where  cust_acc_group in (58, 60) and  cust_code = qc_rm_supcode group by cust_code,cust_name,qc_rm_supcode,cust_taxtag,sup_wp_gstinv_supplier_yn) a1 order by cust_name";
        else

	        $qry = "select * from ( select  cust_code,cust_name,qc_rm_supcode,cust_taxtag,cust_wp_gst_dnote_yn from trn_qc_rm_inspection,massal_customer  where   cust_acc_group in (58, 60) and  cust_code = qc_rm_supcode group by cust_code,cust_name, qc_rm_supcode, cust_taxtag,cust_wp_gst_dnote_yn ) a1 where replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%'  order by cust_name";

*/

        if ($ledname == '')
	        $qry = "select * from (select  cust_code,cust_name,qc_rm_supcode,cust_state,cust_wp_gst_dnote_yn,
cust_cr_days,cust_grace_days from trn_qc_rm_inspection,massal_customer  where    cust_code = qc_rm_supcode group by cust_code,cust_name,qc_rm_supcode,cust_state,cust_wp_gst_dnote_yn ,cust_cr_days,cust_grace_days ) a1 order by cust_name";
        else

	        $qry = "select * from ( select  cust_code,cust_name,qc_rm_supcode,cust_state,cust_wp_gst_dnote_yn,cust_cr_days,cust_grace_days from trn_qc_rm_inspection,massal_customer  where   cust_code = qc_rm_supcode group by cust_code,cust_name, qc_rm_supcode, cust_state,cust_wp_gst_dnote_yn,cust_cr_days,cust_grace_days  ) a1 where replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%'  order by cust_name";

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 



 function getDebitLedgers()
    {
        mysql_query("SET NAMES utf8");
        $qry = "select * from massal_customer where cust_type = 'G' order by cust_name";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


 function getDNNumber()
    {
        mysql_query("SET NAMES utf8");
        $ginfinid= $_POST['finid'];
        $gincompcode=$_POST['compcode'];
        $gsttype =$_POST['gsttype'];
 
        if ($gsttype == 'G')
	   $r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
        else
	   $r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDNDate()
    {
        mysql_query("SET NAMES utf8");
        $ginfinid= $_POST['finid'];
        $gincompcode=$_POST['compcode'];
        $gsttype =$_POST['gsttype'];
 
        if ($gsttype == 'G')
	   $r = mysql_query("select case when max(dbcr_date) IS NULL then curdate() else  max(dbcr_date)  end as dnmaxdate  from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode'");
        else
	   $r = mysql_query("select case when max(dbcr_date) IS NULL then curdate() else  max(dbcr_date)  end as dnmaxdate  from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode'");


//	   $r = "select * from (select if(max(dbcr_date) is null, curdate(), max(dbcr_date)) as maxdate from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode')a1";
//echo $r;


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
