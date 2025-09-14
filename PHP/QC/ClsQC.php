<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadwtcardno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){


		case "loadRMTruckList":
		getRMTruckList();
		break;

		case "loadTicketList":
		 getTicketList();
		break;


		case "loadItemList":
		getItemList();
		break;

		case "loadarea":
		getarea();
		break;

		case "loadQCEntryNo":
		getQCEntryNo();
		break;
		case "loadQCEntryList":
		getQCEntryList();
		break;

		case "loadQCEntryNoDetail":
		getQCEntryNoDetail();
		break;


		case "loadSearchPartylist":
		getSearchPartlist();
		break;

		case "loadFuelTruckList":
		getFuelTruckList();
		break;



		case "loadFuelTicketList":
		getFuelTicketList();
		break;


		case "loadFuelTruckDetail":
		getFuelTruckDetail();
		break;

	       case "loadFuelItemList":
		getFuelItemList();
		break;

	       case "loadFuelItemDetail":
		getFuelItemDetail();
		break;

		case "loadQCFuelEntryNo":
		getQCFuelEntryNo();
		break;

		case "loadFuelQCEntryList":
		getFuelQCEntryList();
		break;


		case "loadQCFuelEntryNoDetail":
		getQCFuelEntryNoDetail();
		break;

             	case "loadSearchItemlist":
		getSearchItemlist();
		break;
    
             	case "loadFuelTruckTicketNoList":
		getFuelTruckTicketNoList();
		break;
    

             	case "loadSupplierList":
		getSupplierTruckList();
		break;
    
             	case "loadTicketWeight":
		getTicketWeight();
		break;
    
             	case "loadTicketSupplier":
		getTicketSupplier();
		break;


		case "loadCDParameters":
		getCDParameters();
		break;


		case "loadCDMeasures":
		getCDMeasures();
		break;

    
             	case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;	

		case "loadSearchChemicalitemlist":
		getSearchChemicalitemlist();
		break;


		case "loadChemicalParameterDetails":
		getChemicalParameterDetails();
		break;

		case "checkQCTicketNumber":
		findQCTicketNumber();
		break;

		case "loadPONOlist":
		getPonoList();
		break;

		case "loadGRNNOlist":
		getGRNNOList();
		break;

		case "loadGRNNOItemlist":
		getGRNNOItemlist();
		break;

		case "loadChemicalQCEntryNo":
		getChemicalQCEntryNo();
		break;

		case "loadGRNNOItemDetails":
			getGRNNOItemDetails();
			break;
	

		case "loadCDQCEntryList":
			getCDQCEntryList();
			break;

		case "loadCDQCEntryNoDetail":
			getCDQCEntryNoDetail();
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
    


 function getRMTruckList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$wbdate   = $_POST['wbdate'];
	$mat_type = $_POST['mat_type'];


      $r=mysql_query("select wc_vehicleno 
from trn_weight_card left join mas_wb_item on  trim(wc_item) = trim(item_name) left join mas_wb_itemgroup on item_grpcode = item_group left join massal_customer on wc_sup_code = cust_code where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date =  '$wbdate' and  item_grpname = 'WASTE PAPER' and wc_process = 'N'  group by wc_vehicleno  order by wc_vehicleno desc");


        $nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getFuelTruckList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$wbdate   = $_POST['wbdate'];
	$mat_type = $_POST['mat_type'];




      $r=mysql_query("select wc_vehicleno from trn_weight_card left join mas_wb_item on replace(wc_item,' ','')  = replace(item_name,' ','')   left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date = '$wbdate' and  item_grpname in ('BIO MASS','COAL  ITEMS') and wc_process = 'N'  group by wc_vehicleno  order by wc_vehicleno desc");

      $r=mysql_query("select wc_vehicleno from trn_weight_card ,  masfu_item_header  where wc_compcode = '$compcode' and wc_fincode = '$finid' and wc_date = '$wbdate' and wc_process = 'N'  group by wc_vehicleno  order by wc_vehicleno desc");

      $r=mysql_query("select wc_vehicleno from trn_weight_card ,  masfu_item_header  where wc_compcode = '$compcode' and wc_fincode = '$finid' and wc_date = '$wbdate' and wc_process = 'N' and wc_itemcode = itmh_code  and itmh_code > 0 group by wc_vehicleno  order by wc_vehicleno desc");


        $nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getTicketList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wbdate = $_POST['wbdate'];
	$truckno = $_POST['truckno'];
	$supcode = $_POST['supcode'];

	$gstFlag = $_POST['gstFlag'];
        if ($gstFlag == "Add")
        { 
        $r=mysql_query("select * ,0 as processwt , 0 as diff  from trn_weight_card , massal_customer  , mas_area  where wc_sup_code = cust_code and wc_area_code = area_code and  wc_date = '$wbdate' and wc_fincode = '$finid' And wc_compcode ='$compcode' and wc_vehicleno =  '$truckno' and wc_sup_code = '$supcode'  and wc_process = 'N' order by wc_ticketno");
        }
        else
        { 
        $r=mysql_query("select * ,0 as processwt , 0 as diff  from trn_weight_card , massal_customer  , mas_area  where wc_sup_code = cust_code and wc_area_code = area_code and  wc_date = '$wbdate' and wc_fincode = '$finid' And wc_compcode ='$compcode' and wc_vehicleno =  '$truckno' order by wc_ticketno");
        }
       
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



   
 function getsupplier()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select cust_code,cust_ref from massal_customer where sup_acc_group = 78 order by cust_ref");
	$r=mysql_query("select cust_code,cust_ref from massal_customer order by cust_ref");
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
        $r=mysql_query("select area_code,area_name from mas_area");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getQCEntryNo()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wtno = $_POST['wtno'];
	$gstFlag = $_POST['gstFlag'];
	if ($gstFlag === "Add") {
	        $r=mysql_query("select ifnull(max(qc_rm_entryno),0)+1 as qc_rm_entryno from trn_qc_rm_inspection where qc_rm_fincode = '$finid' and qc_rm_compcode ='$compcode' ");
	}
	else {

	        $r=mysql_query("call sp_sel_weightcard ('$compcode','$finid','$wtno')");
	}
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
	$wtno = $_POST['wtno'];
	$gstFlag = $_POST['gstFlag'];
        $r=mysql_query("select  qc_rm_entryno from trn_qc_rm_inspection where qc_rm_fincode = '$finid' and qc_rm_compcode ='$compcode' group by qc_rm_entryno order by qc_rm_entryno desc");
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


        $r=mysql_query("select * from trn_qc_rm_inspection , masrm_item_header,massal_customer , mas_area where qc_rm_supcode = cust_code and qc_rm_area = area_code  and qc_rm_itemcode = itmh_code and qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $entryno order by qc_rm_slno");


        $r=mysql_query("select * from trn_qc_rm_inspection , masrm_item_header,massal_customer where qc_rm_supcode = cust_code and qc_rm_itemcode = itmh_code and qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $entryno order by qc_rm_slno");
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
//        $r=mysql_query("select hsn_code,hsn_sno from mas_hsncode order by hsn_code");

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $party     = $_POST['party'];
        $qry = "select * from massal_customer where cust_ref like '%$party%' order by cust_ref";
        $r=mysql_query($qry);
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
	$finid = $_POST['finid'];
	$wbdate = $_POST['wbdate'];
//        $r=mysql_query("select wc_ticketno from trn_weight_card where wc_date = '$wbdate' and wc_fincode = '$finid' And wc_compcode ='$compcode' and wc_process = 'N' group by wc_ticketno order by wc_ticketno desc");
  
      $r=mysql_query("select wc_ticketno from trn_weight_card left join mas_wb_item on  trim(wc_item) = trim(item_name) left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date = '$wbdate' and  item_grpname = 'BIO MASS'   order by wc_ticketno desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getFuelTruckDetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wbdate = $_POST['wbdate'];
	$truckno = $_POST['truckno'];
	$ticketno = $_POST['ticketno'];

      //  $r=mysql_query("select wc_ticketno from trn_weight_card where wc_date = '$wbdate' and wc_fincode = '$finid' And wc_compcode ='$compcode' and wc_process = 'N' group by wc_ticketno order by wc_ticketno desc");

        $qry="select * from trn_weight_card , mas_area , massal_customer where wc_sup_code = cust_code and  wc_area_code = area_code and wc_date = '$wbdate' and wc_fincode = '$finid ' and wc_compcode ='$compcode' and wc_process = 'N'  and wc_vehicleno = '$truckno' and wc_ticketno =  $ticketno ";

//echo $qry;


        $r=mysql_query("select * from trn_weight_card , mas_area , massal_customer where wc_sup_code = cust_code and  wc_area_code = area_code and wc_date = '$wbdate' and wc_fincode = '$finid ' and wc_compcode ='$compcode'  and wc_vehicleno = '$truckno'  and wc_ticketno =  $ticketno");



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
        $r=mysql_query("select *  from masfu_item_header order by itmh_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getFuelItemDetail()
    {
	$itemcode = $_POST['itemcode'];
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select *  from masfu_item_header where itmh_code = $itemcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getQCFuelEntryNo()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wtno = $_POST['wtno'];
	$gstFlag = $_POST['gstFlag'];
	if ($gstFlag === "Add") {
	        $r=mysql_query("select ifnull(max(qc_fuel_entryno),0)+1 as qc_fuel_entryno from trn_qc_fuel_inspection where qc_fuel_fincode = '$finid' and qc_fuel_compcode ='$compcode' ");
	}
	else {

	        $r=mysql_query("call sp_sel_weightcard ('$compcode','$finid','$wtno')");
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getFuelQCEntryList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wtno = $_POST['wtno'];
	$gstFlag = $_POST['gstFlag'];
        $r=mysql_query("select  qc_fuel_entryno from trn_qc_fuel_inspection where qc_fuel_fincode = '$finid' and qc_fuel_compcode ='$compcode' group by qc_fuel_entryno order by qc_fuel_entryno desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getQCFuelEntryNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entryno  = $_POST['entryno'];


	

        $r=mysql_query("select * from trn_qc_fuel_inspection , masfu_item_header,massal_customer where qc_fuel_supcode = cust_code and qc_fuel_itemcode = itmh_code and qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and qc_fuel_entryno = $entryno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getSearchItemlist()
    {
        mysql_query("SET NAMES utf8");
        $itemname = trim(strtoupper($_POST['itemname']));
        $areacode = $_POST['area_code'];
        $compcode = $_POST['compcode'];

        $itemname = trim(str_replace(" ", "", $itemname)); 
        $itemname = trim(str_replace(".", "", $itemname));
        $itemname = trim(str_replace("-", "", $itemname));
	$supcode  = $_POST['suppcode'];
/*
        if ($itemname == '') 
            $qry = "select * from masrm_item_header  order by itmh_name";
        else
            $qry = "select * from masrm_item_header where replace(replace(replace(itmh_name,' ','')  ,'.',''),'-','')  like '%$itemname%' order by itmh_name";
        if ($itemname == '') 
            $qry = "select itmh_code, itmh_name , itmh_moisture_per,case when rm_rate_mois is null then 0 else rm_rate_mois end as rm_rate_mois ,case when rm_rate_rate is null then 0 else rm_rate_rate end as rm_rate_rate from (select * from masrm_item_header h left join  masrm_supplier_rate on itmh_code = rm_rate_itemcode and rm_rate_supcode = $supcode) a1 order by itmh_name";
        else
*/

            $qry = "select itmh_code, itmh_name , itmh_moisture_per,case when rm_rate_mois is null then 0 else rm_rate_mois end as rm_rate_mois ,case when rm_rate_rate is null then 0 else rm_rate_rate end as rm_rate_rate from (select * from masrm_item_header h left join  masrm_supplier_rate on itmh_code = rm_rate_itemcode and rm_rate_supcode = $supcode) a1  where replace(replace(replace(itmh_name,' ','')  ,'.',''),'-','')  like '%$itemname%'  order by itmh_name";

/*

            $qry = "select itmh_name , itmh_moisture_per,case when rm_rate_mois is null then 0 else rm_rate_mois end as rm_rate_mois ,
case when rm_rate_rate is null then 0 else rm_rate_rate end as rm_rate_rate from (
select * from masrm_item_header h left join  masrm_supplier_rate on itmh_code = rm_rate_itemcode and rm_rate_supcode = $supcode and rm_rate_areacode = $areacode
and rm_rate_compcode = compcode 
) a1 
 where rm_rate_varified != 'C' and  replace(replace(replace(itmh_name,' ','')  ,'.',''),'-','')  like '%$itemname%'  order by itmh_name";

*/



        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getFuelTruckTicketNoList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$wbdate   = $_POST['wbdate'];
	$truckno = $_POST['truckno'];


      $r=mysql_query("select wc_ticketno from trn_weight_card left join mas_wb_item on  trim(wc_item) = trim(item_name) left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date = '$wbdate' and (item_grpname = 'BIO MASS' or item_grpname = 'COAL  ITEMS') and wc_vehicleno =  '$truckno' and wc_process = 'N'  group by wc_ticketno  order by wc_ticketno desc");

      $r=mysql_query("select wc_ticketno from trn_weight_card left join mas_wb_item on replace(wc_item,' ','')  = replace(item_name,' ','')  left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date = '$wbdate' and (item_grpname = 'BIO MASS' or item_grpname = 'COAL  ITEMS') and wc_vehicleno =  '$truckno' and wc_process = 'N'  group by wc_ticketno  order by wc_ticketno desc");

      $r=mysql_query("select wc_ticketno from trn_weight_card ,  masfu_item_header  where wc_compcode = '$compcode' and wc_fincode = '$finid' and wc_date = '$wbdate' and wc_vehicleno =  '$truckno' and wc_process = 'N'  group by wc_ticketno  order by wc_ticketno desc");


        $nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getSupplierTruckList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$wbdate   = $_POST['wbdate'];
	$mat_type = $_POST['mat_type'];
	$truckno = $_POST['truckno'];
	$gstFlag = $_POST['gstFlag'];


if ($gstFlag == 'Add')
      $r=mysql_query("select cust_code,cust_ref  from trn_weight_card left join mas_wb_item on  trim(wc_item) = trim(item_name) left join mas_wb_itemgroup on item_grpcode = item_group left join massal_customer on wc_sup_code = cust_code where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date =  '$wbdate' and  item_grpname = 'WASTE PAPER' and wc_process = 'N' and wc_vehicleno = '$truckno'  group by cust_code,cust_ref    order by cust_ref desc");
else
      $r=mysql_query("select cust_code,cust_ref  from trn_weight_card left join mas_wb_item on  trim(wc_item) = trim(item_name) left join mas_wb_itemgroup on item_grpcode = item_group left join massal_customer on wc_sup_code = cust_code where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date =  '$wbdate' and  item_grpname = 'WASTE PAPER' and  wc_vehicleno = '$truckno'  group by cust_code,cust_ref    order by cust_ref desc");



if ($gstFlag == 'Add')
      $r=mysql_query("select cust_code,cust_ref  from trn_weight_card left join mas_wb_item on    replace(wc_item,' ','')  = replace(item_name,' ','')   left join mas_wb_itemgroup on item_grpcode = item_group left join massal_customer on wc_sup_code = cust_code where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date =  '$wbdate' and  item_grpname = 'WASTE PAPER' and wc_process = 'N' and wc_vehicleno = '$truckno'  group by cust_code,cust_ref    order by cust_ref desc");
else
      $r=mysql_query("select cust_code,cust_ref  from trn_weight_card left join mas_wb_item on     replace(wc_item,' ','')  = replace(item_name,' ','')  left join mas_wb_itemgroup on item_grpcode = item_group left join massal_customer on wc_sup_code = cust_code where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date =  '$wbdate' and  item_grpname = 'WASTE PAPER' and  wc_vehicleno = '$truckno'  group by cust_code,cust_ref    order by cust_ref desc");


        $nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getTicketWeight()
    {
        mysql_query("SET NAMES utf8");
	$ticketno = $_POST['ticketno'];
	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];

      $r=mysql_query("select * from trn_weight_card where wc_ticketno = $ticketno and wc_fincode = $fincode and wc_compcode = $compcode");
        $nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getTicketSupplier()
    {
        mysql_query("SET NAMES utf8");
	$ticketno = $_POST['ticketno'];

//      $qry= "select * from trn_weight_card ,massal_customer where wc_sup_code = cust_code and wc_ticketno = $ticketno";
//echo $qry;

      $r=mysql_query("select * from trn_weight_card ,massal_customer where wc_sup_code = cust_code and wc_ticketno = $ticketno");
        $nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

   
 function getCDParameters()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from masqc_cd_parameters order by qc_cd_param_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	


 function getCDMeasures()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select * from masqc_measuring_methods order by qc_measuring_name");
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
        $party  = $_POST['party'];
        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 
        mysql_query("SET NAMES utf8");
//        if ($party == '')
//        $qry = "select * from massal_customer where left(cust_name,2) != 'ZZ' order by cust_name";
//        else


        $qry = "select * from massal_customer where left(cust_name,2) != 'ZZ'  and cust_type != 'G' and replace(replace(cust_name,' ','')  ,'.','') like '%$party%' order by cust_name";
   
   //  $qry = "select * from massal_customer where cust_name like '%$party%' order by cust_name";
   
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }







 function getSearchChemicalitemlist()
    {
        mysql_query("SET NAMES utf8");

        $item     = $_POST['item'];

        $item = trim(str_replace(" ", "", $item)); 
        $item = trim(str_replace(".", "", $item));


        $qry = "select * from maspur_item_header where left(item_name,2) != 'ZZ'  and replace(replace(item_name,' ','')  ,'.','') like '%$item%'  order by item_name";         

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getChemicalParameterDetails()
    {
        mysql_query("SET NAMES utf8");

        $item     = $_POST['item'];

        $qry = "select * from masqc_chemical_parameters , masqc_cd_parameters  where c_itemcode = $item  and c_paramcode = qc_cd_param_code  ";         

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function findQCTicketNumber()
    {
        mysql_query("SET NAMES utf8");
	$wbdate   = $_POST['wbdate'];
	$ticketno = $_POST['ticketno'];


      $r=mysql_query("select qc_rm_entryno from trn_qc_rm_inspection where qc_rm_ticketdate = '$wbdate' and qc_rm_ticketno  = '$ticketno'  group by qc_rm_entryno");

        $nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPonoList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
        $finid= $_POST['finid'];
        $vendor = $_POST['vendor'];
        $r=mysql_query("select * from  trnpur_purchase_header where phd_comp_code = '$compcode' and phd_fin_code = '$finid' and phd_sup_code = $vendor order by CAST(phd_pono AS UNSIGNED) desc ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }





 function getGRNNOList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
        $finid    = $_POST['finid'];
        $pono     = $_POST['pono'];
        $r=mysql_query("select * from trnpur_min_header , trnpur_min_trailer where minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code and minh_minno = mint_minno and minh_comp_code = $compcode and minh_fin_code = $finid and minh_type = 'P' and mint_pono = '$pono' order by minh_minno asc;");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getGRNNOItemlist()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
        $finid    = $_POST['finid'];
        $grnno    = $_POST['grnno'];
        $r=mysql_query("select item_name, item_code ,mint_mindate,minh_bill_no, minh_bill_date,minh_carrier from trnpur_min_header , trnpur_min_trailer , maspur_item_header where mint_item_code = item_code and minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code and minh_minno = mint_minno and minh_comp_code = $compcode and minh_fin_code = $finid and minh_type = 'P' and  minh_minno = '$grnno' group by item_name, item_code,mint_mindate,minh_bill_no, minh_bill_date,minh_carrier order by item_name;");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


	function getGRNNOItemDetails()
    {
        mysql_query("SET NAMES utf8");
	   $compcode  = $_POST['compcode'];
        $finid    = $_POST['finid'];
        $grnno    = $_POST['grnno'];
		$itemcode = $_POST['itemcode'];
		//$qry= "select * from trnpur_min_header , trnpur_min_trailer where minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code and minh_minno = mint_minno and minh_comp_code = $compcode and minh_fin_code = $finid and minh_type = 'P' and  minh_minno = '$grnno' and mint_item_code = '$itemcode' ;";
		//echo $qry;
        $r=mysql_query("select * from trnpur_min_header , trnpur_min_trailer where minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code and minh_minno = mint_minno and minh_comp_code = $compcode and minh_fin_code = $finid and minh_type = 'P' and  minh_minno = '$grnno' and mint_item_code = '$itemcode' ;");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function getChemicalQCEntryNo()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wtno = $_POST['wtno'];
	$gstFlag = $_POST['gstFlag'];
	if ($gstFlag === "Add") {
	        $r=mysql_query("select ifnull(max(qc_cd_entryno),0)+1 as qc_cd_entryno from trn_qc_chemical_inspection where qc_cd_fincode = '$finid' and qc_cd_compcode ='$compcode' ");
	}
	else {

	        $r=mysql_query("call sp_sel_weightcard ('$compcode','$finid','$wtno')");
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

	function getCDQCEntryList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];

        $r=mysql_query("select  qc_cd_entryno from trn_qc_chemical_inspection where qc_cd_fincode = '$finid' and qc_cd_compcode ='$compcode' group by qc_cd_entryno order by qc_cd_entryno desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


	function getCDQCEntryNoDetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entryno  = $_POST['entryno'];


    //    $r=mysql_query("select * from trn_qc_chemical_inspection trn , massal_customer mascust , maspur_item_header masitem,  masqc_cd_parameters masparam , masqc_measuring_methods masmeasure where qc_cd_supcode = cust_code and qc_cd_itemcode = item_code and  trn.qc_cd_param_code = masparam.qc_cd_param_code and trn.qc_cd_measuring_code =  masmeasure.qc_measuring_code and  qc_cd_compcode = $compcode  and qc_cd_fincode = $finid  and qc_cd_entryno = $entryno");
 
     $r=mysql_query("call spqc_chemical_inspection ('$compcode','$finid','$entryno')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



?>
