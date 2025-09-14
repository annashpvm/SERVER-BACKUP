<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadrepno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadrepno":
		getrepno();
		break;
		case "loadgrnno":
		getgrnno();
		break;
		case "loadMonthVoucherDetails":
		getMonthVoucherDetails();
		break;
		case "loadMonthGRNList":
		getMonthStoresGRNList();
		break;

           	case "loadPartyMonthGRNS":
		getPartyMonthGRNS();
		break;

           	case "loadItemMonthGRNS":
		getItemMonthGRNS();
		break;


           	case "loadPartyMonthGRNDETAILS":
		getPartyMonthGRNDETAILS();
		break;

           	case "loadItemMonthGRNDETAILS":
		getItemMonthGRNDETAILS();
		break;

		case "loadSearchPartylist":
		getSearchPartylist();
		break;

		case "loadGrouplist":
		getGrouplist();
		break;

           	case "loadGroupMonthGRNS":
		getGroupMonthGRNS();
		break;
           	case "loadGroupMonthGRNDETAILS":
		getGroupMonthGRNDETAILS();
		break;


           	case "loadAllPartyMonthArrivals":
		getAllPartyMonthArrivals();
		break;


           	case "loadPendingGRNS":
		getPendingGRNS();
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
    
 function getrepno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$repname = $_POST['repname'];
	if($repname === "GRNPO") {
		$r=mysql_query("select minh_minno as seqno,minh_minno as repno from trnpur_min_header  where minh_type IN ('R','P') and minh_fin_code= '$finid' and minh_comp_code = '$compcode' order by minh_minno desc");

	}
	else if($repname === "GRNCASH") {
		$r=mysql_query("select minh_minno as seqno,minh_minno as repno from trnpur_min_header  where minh_type IN ('CI','I') and minh_fin_code= '$finid' and minh_comp_code = '$compcode' order by minh_minno desc ");

	}
	else if ($repname === "PO") {
		$r=mysql_query("select phd_pono as repno from trnpur_purchase_header  where phd_fin_code= '$finid' and phd_comp_code = '$compcode' order by phd_pono");
	}
	else if ($repname === "WOGRN") {
		$r=mysql_query("select wogh_no as repno from trnpur_wogrn_header where wogh_fin_code = $finid and wogh_comp_code=$compcode order by wogh_no desc");
	}
	else if ($repname === "OSSALESTN") {
		$r=mysql_query("select os_invno  as repno  from trnpur_other_sales where os_state_type = 'TNS' and os_fincode=$finid and os_compcode=$compcode group by os_invno order by os_invno desc");
	}
	else if ($repname === "OSSALESOS") {
		$r=mysql_query("select os_invno  as repno  from trnpur_other_sales where os_state_type = 'OSS' and os_fincode=$finid and os_compcode=$compcode group by os_invno order by os_invno desc");
	}

	else if ($repname === "DCR") {
		$r=mysql_query("select dch_no as repno  from trnpur_deliverychallan_header where dch_type  = 'R' and dch_comp_code = $compcode and dch_fincode = $finid group by dch_no order by dch_no desc");
	}
	else if ($repname === "DCN") {
		$r=mysql_query("select dch_no as repno  from trnpur_deliverychallan_header where dch_type  = 'N' and dch_comp_code = $compcode and dch_fincode = $finid group by dch_no order by dch_no desc");
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
   

 function getMonthVoucherDetails()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$repname = $_POST['repname'];
	if($repname === "GRNPO") {

$r=mysql_query("select UPPER(monthname(minh_mindate)) as rmonth ,  count(*) as nos, sum(minh_value) as purvalue from trnpur_min_header  where minh_fin_code= '$finid' and minh_comp_code = '$compcode' and minh_mindate >= '$startdate' and minh_mindate <= curdate() group by UPPER(monthname(minh_mindate)) ");
        }
 	else if($repname === "GRNINDENT") {
$r=mysql_query("select UPPER(monthname(minh_mindate)) as rmonth ,  count(*) as nos, sum(minh_value) as purvalue from trnpur_min_header  where minh_fin_code= '$finid' and minh_comp_code = '$compcode' and minh_mindate >= '$startdate' and minh_mindate <= curdate() and minh_type = 'I' group by UPPER(monthname(minh_mindate)) ");
        } 
 	else if($repname === "TNOS") {
$r=mysql_query(" select UPPER(monthname(os_date))  as rmonth ,  count(*) as nos, sum(os_netamt) as purvalue
 from trn_other_sales where os_state_type = 'TNOS' and os_fincode= $finid and os_compcode= $compcode
 and os_date >= '$startdate' and os_date <=  curdate()  group by UPPER(monthname(os_date)) ");
        } 
 	else if($repname === "OSOS") {
$r=mysql_query(" select UPPER(monthname(os_date))  as rmonth ,  count(*) as nos, sum(os_netamt) as purvalue
 from trn_other_sales where os_state_type = 'OSOS' and os_fincode= $finid and os_compcode= $compcode
 and os_date >= '$startdate' and os_date <=  curdate()  group by UPPER(monthname(os_date)) ");
        } 
 	else if($repname === "DCR") {
$r=mysql_query(" select UPPER(monthname(dch_date))  as rmonth ,  count(*) as nos, sum(dch_totval) as purvalue
 from trnpur_deliverychallan_header where dch_type = 'R' and dch_fincode= $finid and dch_comp_code= $compcode
 and dch_date >= '$startdate' and dch_date <=  curdate()  group by UPPER(monthname(dch_date)) ");
        } 
 	else if($repname === "DCN") {
$r=mysql_query(" select UPPER(monthname(dch_date))  as rmonth ,  count(*) as nos, sum(dch_totval) as purvalue
 from trnpur_deliverychallan_header where dch_type = 'N' and dch_fincode= $finid and dch_comp_code= $compcode
 and dch_date >= '$startdate' and dch_date <=  curdate()  group by UPPER(monthname(dch_date)) ");
        } 
 	else if($repname === "DCRecipt") {
$r=mysql_query(" select UPPER(monthname(dcr_date))  as rmonth ,  count(*) as nos, 0 as purvalue
 from trnpur_deliverychallan_receipt where dcr_dcfincode= $finid and dcr_comp_code= $compcode
 and dcr_date >= '$startdate' and dcr_date <=  curdate()  group by UPPER(monthname(dcr_date)) ");
        } 
 	else if($repname === "GRNRETURN") {
$r=mysql_query(" select UPPER(monthname(debh_date))  as rmonth ,  count(*) as nos, sum(debh_netamount) as purvalue
 from trnpur_grn_ret_header where debh_fin_code= $finid and debh_comp_code= $compcode
 and debh_date >= '$startdate' and debh_date <=  curdate()  group by UPPER(monthname(debh_date)) ");
        } 
 	else if($repname === "ISSUE") {
$r=mysql_query("select rmonth,count(*) as nos , sum(purvalue) as purvalue from (
select  UPPER(monthname(iss_date))  rmonth, iss_no ,  sum(iss_value) as purvalue from   trnpur_item_issues where iss_comp_code = $compcode  AND iss_date >= '$startdate'  AND iss_date <= curdate() AND  trnpur_item_issues.iss_type = 'IS' group by   UPPER(monthname(iss_date)) ,iss_no
)a1 group by rmonth");
        } 





	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getMonthStoresGRNList()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$repname = $_POST['repname'];
	if($repname === "GRNPO") 

$r=mysql_query("select minh_minno docno,  DATE_FORMAT(minh_mindate, '%d-%m-%Y') as docdate,   cust_ref ,minh_value amount from trnpur_min_header , massal_customer  where minh_sup_code = cust_code and  minh_fin_code= '$finid'  and minh_comp_code =  '$compcode'  and minh_mindate >= '$startdate' and minh_mindate <= '$enddate' order by   minh_mindate   desc,minh_minno desc ");

 	else if($repname === "GRNINDENT") 
$r=mysql_query("select minh_minno docno,  DATE_FORMAT(minh_mindate, '%d-%m-%Y') as docdate,  minh_type purtype, cust_ref ,minh_value amount from trnpur_min_header , massal_customer  where minh_sup_code = cust_code and  minh_fin_code= '$finid'  and minh_comp_code =  '$compcode'  and minh_mindate >= '$startdate' and minh_mindate <= '$enddate' and minh_type = 'I' order by   minh_mindate   desc,minh_minno desc ");
 	else if($repname === "TNOS") 
$r=mysql_query(" select os_invno docno,  DATE_FORMAT(os_date, '%d-%m-%Y') as docdate,  os_state_type purtype, cust_ref ,os_netamt amount   from trn_other_sales ,  massal_customer  where  os_custcode = cust_code and os_state_type = 'TNOS' and os_fincode=  '$finid' and os_compcode=  '$compcode'   and os_date >= '$startdate' and os_date <=  '$enddate'  order by   os_date   desc,os_docno desc ");

 	else if($repname === "OSOS") 
$r=mysql_query(" select os_invno docno,  DATE_FORMAT(os_date, '%d-%m-%Y') as docdate,  os_state_type purtype, cust_ref ,os_netamt amount   from trn_other_sales ,  massal_customer  where  os_custcode = cust_code and os_state_type = 'OSOS' and os_fincode=  '$finid' and os_compcode=  '$compcode'   and os_date >= '$startdate' and os_date <=  '$enddate'  order by   os_date   desc,os_docno desc ");

 	else if($repname === "DCR") 
$r=mysql_query(" select dch_no docno,  DATE_FORMAT(dch_date, '%d-%m-%Y') as docdate,  dch_type purtype, cust_ref ,0 amount   from trnpur_deliverychallan_header ,  massal_customer  where dch_type = 'R' and   dch_party  = cust_code and dch_fincode=  '$finid' and dch_comp_code=  '$compcode'   and dch_date >=  '$startdate' and dch_date <= '$enddate'   order by   dch_date   desc,dch_no desc ");
 	else if($repname === "DCN") 
$r=mysql_query(" select dch_no docno,  DATE_FORMAT(dch_date, '%d-%m-%Y') as docdate,  dch_type purtype, cust_ref ,0 amount   from trnpur_deliverychallan_header ,  massal_customer  where dch_type = 'N' and   dch_party  = cust_code and dch_fincode=  '$finid' and dch_comp_code=  '$compcode'   and dch_date >=  '$startdate' and dch_date <= '$enddate'   order by   dch_date   desc,dch_no desc ");

 	else if($repname === "DCRecipt") 
$r=mysql_query(" select dcr_no docno,  DATE_FORMAT(dcr_date, '%d-%m-%Y') as docdate, 'DC Recipt' purtype, cust_ref ,0 amount   from trnpur_deliverychallan_receipt ,  massal_customer  where   dcr_party = cust_code and  dcr_dcfincode=  '$finid' and dcr_comp_code=  '$compcode'   and dcr_date >= '$startdate' and dcr_date <=  '$enddate'  order by   dcr_date   desc,dcr_no desc ");
 	else if($repname === "GRNRETURN") 
$r=mysql_query(" select debh_no docno,  DATE_FORMAT(debh_date, '%d-%m-%Y') as docdate, 'GRN RETURN' purtype, cust_ref ,debh_netamount amount   from trnpur_grn_ret_header ,  massal_customer  where   debh_supcode = cust_code and  debh_fin_code=  '$finid' and debh_comp_code=  '$compcode'   and debh_date >= '$startdate' and debh_date <=  '$enddate'  order by   debh_date   desc,debh_no desc ");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

 }


 function getPartyMonthGRNS()
    {
        mysql_query("SET NAMES utf8");
	$party     = $_POST['party'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];


$r=mysql_query("select UPPER(monthname(minh_mindate)) as rmonth ,  count(*) as nos, sum(minh_value) as purvalue from trnpur_min_header  where minh_fin_code= '$finid' and minh_comp_code = '$compcode' and minh_mindate >= '$startdate' and minh_mindate <= curdate() and minh_sup_code = '$party' group by UPPER(monthname(minh_mindate)) ");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getItemMonthGRNS()
    {
        mysql_query("SET NAMES utf8");
	$item     = $_POST['item'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];


$r=mysql_query("select UPPER(monthname(minh_mindate)) as rmonth  ,  count(*) as nos, sum(mint_value) as purvalue  from
(select minh_mindate , minh_minno, mint_accept_qty,mint_value  from trnpur_min_header ,trnpur_min_trailer  where 
minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code and minh_minno = mint_minno  and minh_comp_code = $compcode and  minh_fin_code = $finid and mint_item_code = '$item' and minh_mindate >= '$startdate' and minh_mindate <= curdate()
) a group by UPPER(monthname(minh_mindate))");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getSearchPartylist()
    {
        mysql_query("SET NAMES utf8");
        $party     = $_POST['party'];

        if ($party == '')
           $qry = "select * from massal_customer order by cust_name";
        else
           $qry = "select * from massal_customer where cust_type != 'G' and cust_name like '%$party%' order by cust_name";



        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPartyMonthGRNDETAILS()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$party     = $_POST['party'];


$r=mysql_query("select minh_minno docno,  DATE_FORMAT(minh_mindate, '%d-%m-%Y') as docdate,  cust_ref ,minh_value amount from trnpur_min_header , massal_customer  where minh_sup_code = cust_code and  minh_fin_code= '$finid'  and minh_comp_code =  '$compcode'  and minh_mindate >= '$startdate' and minh_mindate <= '$enddate' and minh_sup_code = '$party'  order by   minh_mindate   desc,minh_minno desc ");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

 }



 function getItemMonthGRNDETAILS()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];
	$item     = $_POST['item'];


$r=mysql_query("select minh_minno docno,  DATE_FORMAT(minh_mindate, '%d-%m-%Y') as docdate, minh_type purtype,   cust_ref ,minh_value amount  from(select minh_mindate , minh_minno,cust_ref ,minh_type,minh_value   from trnpur_min_header ,trnpur_min_trailer , massal_customer  where minh_sup_code = cust_code and  minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code and minh_minno = mint_minno and  minh_comp_code = $compcode and  minh_fin_code = $finid and mint_item_code = '$item' and minh_mindate >= '$startdate' and minh_mindate <= '$enddate' ) a order by   minh_mindate   desc,minh_minno desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';

 }

 function getGrouplist()
    {
        mysql_query("SET NAMES utf8");

        $qry = "select * from maspur_group order by grp_name";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getGroupMonthGRNS()
    {
        mysql_query("SET NAMES utf8");
	$groupcode     = $_POST['grp'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];



$r=mysql_query("select UPPER(monthname(minh_mindate)) as rmonth  ,  count(*) as nos, sum(minvalue) as purvalue   from (select minh_mindate , minh_minno,cust_ref ,sum(mint_value) minvalue  from trnpur_min_header ,trnpur_min_trailer , massal_customer , maspur_item_header , maspur_subgroup , maspur_group 
where minh_sup_code = cust_code and minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code and minh_minno = mint_minno and minh_comp_code = $compcode and  minh_fin_code = $finid 
and mint_item_code =  item_code and  item_group_code =  subgrp_code   and subgrp_grpcode =  grp_code and grp_code = $groupcode and minh_mindate >= '$startdate' and minh_mindate <= curdate()  group by minh_mindate , minh_minno,cust_ref ) a group by UPPER(monthname(minh_mindate))");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getGroupMonthGRNDETAILS()
    {
        mysql_query("SET NAMES utf8");
	$groupcode     = $_POST['grp'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];


$r=mysql_query(" select minh_minno docno,  DATE_FORMAT(minh_mindate, '%d-%m-%Y') as docdate,  minh_type purtype, cust_ref ,minvalue amount  from(select minh_mindate , minh_minno,cust_ref ,sum(mint_value) minvalue ,minh_type from trnpur_min_header ,trnpur_min_trailer , massal_customer , maspur_item_header , maspur_subgroup , maspur_group where minh_sup_code = cust_code and minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code and minh_minno = mint_minno  and minh_comp_code = $compcode and  minh_fin_code = $finid 
and mint_item_code =  item_code and  item_group_code =  subgrp_code   and subgrp_grpcode =  grp_code and grp_code = $groupcode and minh_mindate >= '$startdate' and minh_mindate <= '$enddate'  group by minh_mindate , minh_minno,cust_ref  ) a order by   minh_mindate   desc,minh_minno desc");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getAllPartyMonthArrivals()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate = $_POST['enddate'];


        $r=mysql_query("call spst_rep_datewisereceipt($compcode,'$startdate','$enddate')");



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
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $r=mysql_query("call sppur_GRN_Pendings($compcode,'$finid')");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
