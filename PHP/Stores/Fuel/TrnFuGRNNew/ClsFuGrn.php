<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadgrnno":
		getgrnno();
		break;

		case "loadgrneddt":
		getgrneddt();
		break;
		case "loadsupplier":
		getsupplier();
		break;
		case "loadunloadparty":
		getunloadparty();
		break;
		case "loadagent":
		getagent();
		break;
		case "loadgrnpo":
		getgrnpo();
		break;
		case "loaditempo":
		getitempo();
		break;
		case "loadlotno":
		getlotno();
		break;
		case "loadordno":
		getordno();
		break;
		case "loadpono":
		getpono();
		break;
		case "loaditemqty":
		getitemqty();
		break;
		case "loadfilldt":
		getfilldt();
		break;
		case "loadgrnitemdetail":
		getgrnitemdetail();
		break;
		case "loadarea":
		getarea();
		break;

		case "loadfreight":
		getfreight();
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

		case "loadPendingGRNS":
		getPendingGRNS();
		break;	


		case "loadPurGroup":
		getPurGroup();
		break;

		case "loadQCEntryList":
		getQCEntryList();
		break;

		case "loadQCEntryNoDetail":
		getQCEntryNoDetail();
		break;

		case "loadFuelTicketList":
		getFuelTicketList();
		break;
                 
		case "loadFuelTicketNoDetail":
		getFuelTicketNoDetail();
		break;
		
		case "loadFuelItemList":
		getFuelItemList();
		break;
		case "loadGrnQcCombine":
		getGrnQcCombine();
		break;
				

		case "loadGST":
		getGST();
		break;
			
		case "loadPurLedgerDetail":
		getPurLedgerDetail();
		break;

		case "loadPurGroupDetail":
		getPurGroupDetail();
		break;

		case "LoadDNNumber":
	        getDNNumber();
		break;

		case "load_QC_Ticket_Detail":
	        get_QC_Ticket_Detail();
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
            $data= $json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    
   function getordno()
    {
		$finid = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$supcode = $_POST['supcode'];
		$gstFlag = $_POST['gstFlag'];

       // mysql_query("SET NAMES utf8");
	if($gstFlag === "Add")
	{
		//$r=mysql_query("call spfu_sel_partyorders ('$compcode','$finid','$supcode','0')");
		$r=mysql_query("select 'Not Applicable' ordh_no, '0' ordh_seqno union all select ordh_no,ordh_seqno from trnfu_order_header , trnfu_order_trailer where ordh_seqno = ordt_hdseqno and  ordh_compcode = $compcode and ordh_fincode = $finid and ordh_sup_code = $supcode and ordh_status != 'C' and ordt_pen_qty > 0 group by ordh_no,ordh_seqno");
        
	}
	else if($gstFlag === "Edit")
	{

		$r=mysql_query("select 'Not Applicable' ordh_no, '0' ordh_seqno union all select ordh_no,ordh_seqno from trnfu_order_header , trnfu_order_trailer where ordh_seqno = ordt_hdseqno and  ordh_compcode = $compcode and ordh_fincode = $finid  and ordh_sup_code = $supcode and ordh_status != 'C' and ordt_pen_qty > 0 group by ordh_no,ordh_seqno");

	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getfilldt()
    {
	mysql_query("SET NAMES utf8");
	$qrycode = $_POST['qrycode'];
	if ($qrycode === "GRN")
	{
		$grnno = $_POST['grnno'];
		$itemcode = $_POST['itemcode'];
		if ($grnno > 0)
		{
			$grnno = $_POST['grnno'];
			$itemcode = $_POST['itemcode'];
		$r=mysql_query("select max(rect_grnqty) as rect_grnqty from trnfu_receipt_trailer where rect_hdseqno = $grnno and rect_item_code = $itemcode ");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';			
		}
		/*else
		{
			$grnno = 1;
			$itemcode = 1;
		}*/
		

	}
	else if ($qrycode === "RATE")
	{
		$grnno = $_POST['grnno'];
		$itemcode = $_POST['itemcode'];
		$billdt = $_POST['billdate'];
		if ($grnno > 0)
		{
			$grnno = $_POST['grnno'];
			$itemcode = $_POST['itemcode'];
			$billdt = $_POST['billdate'];
		}
		else
		{
			$grnno = 1;
			$itemcode = 1;
			$billdt = '2021-03-01';
		}
		$r=mysql_query("select max(amnt_unit_rate) as amnt_unit_rate from trnfu_orderamnd_trailer where amnt_hdseqno=
			(select max(amnh_seqno) from trnfu_orderamnd_header where amnh_ordhdseqno = '$grnno' and amnh_wedate<= '$billdt') 
				and amnt_item_code= '$itemcode' ");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

	}

    }

 function getgrnitemdetail()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnseqno = $_POST['grnno'];
	$ordno    = $_POST['ordno'];

//	$r=mysql_query("call spfu_sel_recitems ('$compcode','$grnno','$ordno','0')");
	$r=mysql_query("select *  from trnfu_receipt_header a, trnfu_receipt_trailer b ,  masfu_item_header d , acc_ledger_master e where  rech_purgrp = led_code  and rect_item_code =  itmh_code and rech_compcode = '$compcode' and rech_fincode = '$finid' and rech_seqno = rect_hdseqno and rech_seqno = '$grnseqno' ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getsupplier()
    {
        mysql_query("SET NAMES utf8");
	$supplier_id = $_POST['supplierid'];
	$r=mysql_query("call sp_pur_supplier_actgrp($supplier_id)");

	$r=mysql_query("select cust_code,cust_ref from massal_customer");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getunloadparty()
    {
        mysql_query("SET NAMES utf8");
	$supplier_id = $_POST['supplierid'];
	$r=mysql_query("call sp_pur_sup");
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
	$supcode = $_POST['supcode'];
	$r=mysql_query("call spfu_sel_agentparties ('$supcode')");
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
 function getgrnpo()
    {
       // mysql_query("SET NAMES utf8");
	$ordcode = $_POST['ordcode'];

        $r=mysql_query("select * from trnfu_order_header , trnfu_order_trailer where  ordh_seqno = $ordcode and ordh_seqno = ordt_hdseqno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	
 function getgrnno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$gstFlag = $_POST['gstFlag'];
	if($gstFlag === "Add")
	{
        	$r=mysql_query("select ifnull(max(convert(substring(rech_no,3),signed)),0) +1 as grnno from trnfu_receipt_header where rech_fincode = $finid and rech_compcode = $compcode");

	}
	else if($gstFlag === "Edit")
	{
		$r=mysql_query("call spfu_sel_receiptnos ('$compcode','$finid')");
	//	$qry="call spfu_sel_receiptnos ('$compcode','$finid')";

	}
//echo $qry;
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getgrneddt()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno = $_POST['grnno'];
	// $r=mysql_query("call spfu_sel_recheddet ('$grnno')");
//	$r="select * from trnfu_receipt_header ,massal_customer where rech_seqno= '$grnno' and rech_status='' /and cust_code= rech_sup_code";
//echo $r;
	$r=mysql_query("select * from trnfu_receipt_header ,massal_customer where rech_seqno= '$grnno' and rech_status='' and cust_code= rech_sup_code");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getitempo()
{
         mysql_query("SET NAMES utf8");
	$ordcode = $_POST['ordcode'];

        if ($ordcode == 0)
             $r=mysql_query("select * from masfu_item_header order by itmh_name");
        else
            $r=mysql_query("call spfu_sel_orditems ('$ordcode')");
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
	$itemcode = $_POST['itemcode'];
	$ordcode = $_POST['ordcode'];
	$gstFlag = $_POST['gstFlag'];
	$status = "N";

	if ($gstFlag == "Add"){
		$status = "N";
	}
	else{
		$status = "E";
	}
	$r = mysql_query("call spfu_sel_orditem_dets ('$ordcode','$itemcode','$status')");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
function getarea()
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

	if ( $freightJ === "Tonn")
	{
		$r=mysql_query("call sp_sel_tonfreight('$supcode','$fareacode','$itemcode','1')");

		
	}
	else if ($freightJ === "LoadJ")
	{
		$r=mysql_query("call sp_sel_loadfreight('$supcode','$fareacode','1')");

		
	}
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

	$r=mysql_query("call spfu_sel_receiptheader_new ('$edgrnno')");

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

	$r=mysql_query("call spfu_sel_receipttrailer ('$edgrnno')");

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
	$pono     = $_POST['pono'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        mysql_query("SET NAMES utf8");
//        $r=mysql_query("select * from acc_ledger_master  where led_type = 'G' and  led_code in (1756,1745,1746,2258)");


        $r=mysql_query("select * from mas_RMFU_purchasetax where tax_purtype = 'FU' order by tax_purname");
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


        $r=mysql_query("select qc_fuel_entryno from trn_qc_fuel_inspection where qc_fuel_supcode = $supcode and qc_fuel_grn_status = 'N' and qc_fuel_compcode = '$compcode' and qc_fuel_fincode = $finid group by qc_fuel_entryno order by qc_fuel_entryno desc");





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




        $r=mysql_query("select * from trn_qc_rm_inspection , masrm_item_header,massal_customer where qc_rm_supcode = cust_code and qc_rm_itemcode = itmh_code and qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $entryno order by qc_rm_slno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getFuelTicketList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];


  //      $r=mysql_query("select wc_vehicleno from trn_weight_card where wc_date = '$wbdate' and wc_fincode = '$finid' And wc_compcode ='$compcode' and wc_process = 'N' group by wc_vehicleno order by wc_vehicleno");
	


      $r=mysql_query("select wc_ticketno from trn_weight_card left join mas_wb_item on  wc_item = item_name left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode = '$compcode'  and wc_fincode = '$finid' and  item_grpname in ('BIO MASS','COAL  ITEMS') and wc_process = 'Y' and wt_grn_process = 'N'  order by wc_ticketno desc");

      $r=mysql_query("select wc_ticketno from trn_weight_card ,  masfu_item_header  where wc_compcode = $compcode and  itmh_code = wc_itemcode  and    wt_grn_process = 'N' and wc_date >= '2024-04-01' and wc_itemcode > 0 and wc_fincode = '$finid' group by wc_ticketno  order by wc_ticketno desc");

        $nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getFuelTicketNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$ticketno = $_POST['ticketno'];


  //      $r=mysql_query("select wc_vehicleno from trn_weight_card where wc_date = '$wbdate' and wc_fincode = '$finid' And wc_compcode ='$compcode' and wc_process = 'N' group by wc_vehicleno order by wc_vehicleno");
	


      $r=mysql_query("select *  from trn_weight_card , massal_customer , mas_area  where  wc_area_code = area_code and wc_sup_code = cust_code and  wc_compcode = '$compcode'  and wc_fincode = '$finid' and  wc_ticketno = $ticketno");


        $nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



function getFuelItemList()
{
         mysql_query("SET NAMES utf8");
	$ordcode = $_POST['ordcode'];
        $r=mysql_query("select * from masfu_item_header order by itmh_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';



}

function getGrnQcCombine()
{
         mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$grnno = $_POST['grnno'];
/*
	$r=mysql_query("select *  from trnfu_receipt_header , trnfu_receipt_trailer  , massal_customer , trn_qc_fuel_inspection , masfu_item_header,mas_RMFU_purchasetax  where rech_purgrp = tax_purcode and itmh_code = rect_item_code and   cust_code= rech_sup_code and rech_ticketno = qc_fuel_ticketno and  rech_ticketdate = qc_fuel_ticketdate and rech_compcode = $compcode and rech_fincode = $finid  and rech_compcode = qc_fuel_compcode and rech_fincode = qc_fuel_fincode  and rech_seqno = rect_hdseqno and rech_seqno = $grnno");

	$qry="select *  from trnfu_receipt_header , trnfu_receipt_trailer  , massal_customer , trn_qc_fuel_inspection , masfu_item_header,mas_RMFU_purchasetax  where rech_purgrp = tax_purcode and itmh_code = rect_item_code and   cust_code= rech_sup_code and rech_ticketno = qc_fuel_ticketno and  rech_ticketdate = qc_fuel_ticketdate and rech_compcode = $compcode and rech_fincode = $finid  and rech_compcode = qc_fuel_compcode and rech_fincode = qc_fuel_fincode  and rech_seqno = rect_hdseqno and rech_seqno = $grnno";

*/
	$qry="select a.*,b.*,c.*,d.*,e.*,f.* ,deg.itmh_name degrade_itemname from trnfu_receipt_header a , trnfu_receipt_trailer b , massal_customer c, trn_qc_fuel_inspection d,masfu_item_header e,mas_RMFU_purchasetax f , masfu_item_header deg where rech_purgrp = tax_purcode and e.itmh_code = rect_item_code and cust_code= rech_sup_code and rech_ticketno = qc_fuel_ticketno and  rech_ticketdate = qc_fuel_ticketdate and deg.itmh_code = qc_fuel_degrade_item and rech_compcode = $compcode and rech_fincode = $finid  and rech_compcode = qc_fuel_compcode and rech_fincode = qc_fuel_fincode and rech_seqno = rect_hdseqno and rech_seqno =  $grnno";

	$r=mysql_query($qry);

//echo $qry;



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

}

function getGST()
{
         mysql_query("SET NAMES utf8");
	$taxcode = $_POST['taxcode'];

	$r=mysql_query("select * from mas_RMFU_purchasetax where tax_purcode = $taxcode");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

function getPurLedgerDetail()
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



 function getPendingGRNS()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$r=mysql_query("call spfu_sel_pending_grnlist ('$compcode','$finid')");
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


function get_QC_Ticket_Detail()
{
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$ticketno = $_POST['ticketno'];

	$qry="select a.*,b.*,c.*,deg.itmh_name as deg_item_name from trn_qc_fuel_inspection a , masfu_item_header b , massal_customer c , masfu_item_header deg  where a.qc_fuel_itemcode = b.itmh_code and a.qc_fuel_supcode = c.cust_code and  a.qc_fuel_degrade_item = deg.itmh_code and qc_fuel_compcode  = $compcode and qc_fuel_fincode = $finid  and qc_fuel_ticketno = $ticketno ";

	$r=mysql_query($qry);

//echo $qry;



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
