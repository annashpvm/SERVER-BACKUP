<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadwtcardno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");
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
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    


 function getRMTruckList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$wbdate   = $_POST['wbdate'];
	$mat_type = $_POST['mat_type'];


      $sql = "select wc_vehicleno 
from trn_weight_card left join mas_wb_item on  trim(wc_item) = trim(item_name) left join mas_wb_itemgroup on item_grpcode = item_group left join massal_customer on wc_sup_code = cust_code where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date =  '$wbdate' and  item_grpname = 'WASTE PAPER' and wc_process = 'N'  group by wc_vehicleno  order by wc_vehicleno desc";


$r = mysqli_query($conn, $sql);
        $nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getFuelTruckList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$wbdate   = $_POST['wbdate'];
	$mat_type = $_POST['mat_type'];




      $sql = "select wc_vehicleno from trn_weight_card left join mas_wb_item on replace(wc_item,' ','')  = replace(item_name,' ','')   left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date = '$wbdate' and  item_grpname in ('BIO MASS','COAL  ITEMS') and wc_process = 'N'  group by wc_vehicleno  order by wc_vehicleno desc";

      $sql = "select wc_vehicleno from trn_weight_card ,  masfu_item_header  where wc_compcode = '$compcode' and wc_fincode = '$finid' and wc_date = '$wbdate' and wc_process = 'N'  group by wc_vehicleno  order by wc_vehicleno desc";

      $sql = "select wc_vehicleno from trn_weight_card ,  masfu_item_header  where wc_compcode = '$compcode' and wc_fincode = '$finid' and wc_date = '$wbdate' and wc_process = 'N' and wc_itemcode = itmh_code  and itmh_code > 0 group by wc_vehicleno  order by wc_vehicleno desc";


      $r = mysqli_query($conn, $sql);
        $nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getTicketList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wbdate = $_POST['wbdate'];
	$truckno = $_POST['truckno'];
	$supcode = $_POST['supcode'];

	$gstFlag = $_POST['gstFlag'];
        if ($gstFlag == "Add")
        { 
        $sql = "select * ,0 as processwt , 0 as diff  from trn_weight_card , massal_customer  , mas_area  where wc_sup_code = cust_code and wc_area_code = area_code and  wc_date = '$wbdate' and wc_fincode = '$finid' And wc_compcode ='$compcode' and wc_vehicleno =  '$truckno' and wc_sup_code = '$supcode'  and wc_process = 'N' order by wc_ticketno";
        }
        else
        { 
        $sql = "select * ,0 as processwt , 0 as diff  from trn_weight_card , massal_customer  , mas_area  where wc_sup_code = cust_code and wc_area_code = area_code and  wc_date = '$wbdate' and wc_fincode = '$finid' And wc_compcode ='$compcode' and wc_vehicleno =  '$truckno' order by wc_ticketno";
        }
       
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getItemList()
    {
        global $conn;
        $sql = "select *  from masrm_item_header order by itmh_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



   
 function getsupplier()
    {
        global $conn;
	$sql = "select cust_code,cust_ref from massal_customer where sup_acc_group = 78 order by cust_ref";
	$sql = "select cust_code,cust_ref from massal_customer order by cust_ref";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getarea()
    {
        global $conn;
        $sql = "select area_code,area_name from mas_area";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getQCEntryNo()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wtno = $_POST['wtno'];
	$gstFlag = $_POST['gstFlag'];
	if ($gstFlag === "Add") {
	        $sql = "select ifnull(max(qc_rm_entryno),0)+1 as qc_rm_entryno from trn_qc_rm_inspection where qc_rm_fincode = '$finid' and qc_rm_compcode ='$compcode' ";
	}
	else {

	        $sql = "call sp_sel_weightcard ('$compcode','$finid','$wtno')";
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getQCEntryList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wtno = $_POST['wtno'];
	$gstFlag = $_POST['gstFlag'];
        $sql = "select  qc_rm_entryno from trn_qc_rm_inspection where qc_rm_fincode = '$finid' and qc_rm_compcode ='$compcode' group by qc_rm_entryno order by qc_rm_entryno desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getQCEntryNoDetail()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entryno  = $_POST['entryno'];


        $sql = "select * from trn_qc_rm_inspection , masrm_item_header,massal_customer , mas_area where qc_rm_supcode = cust_code and qc_rm_area = area_code  and qc_rm_itemcode = itmh_code and qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $entryno order by qc_rm_slno";


        $sql = "select * from trn_qc_rm_inspection , masrm_item_header,massal_customer where qc_rm_supcode = cust_code and qc_rm_itemcode = itmh_code and qc_rm_compcode = '$compcode' and qc_rm_fincode = '$finid' and qc_rm_entryno = $entryno order by qc_rm_slno";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




 function getSearchPartylist()
    {
        global $conn;
//        $sql = "select hsn_code,hsn_sno from mas_hsncode order by hsn_code";

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $party     = $_POST['party'];
        $sql = "select * from massal_customer where cust_ref like '%$party%' order by cust_ref";
        
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getFuelTicketList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wbdate = $_POST['wbdate'];
//        $sql = "select wc_ticketno from trn_weight_card where wc_date = '$wbdate' and wc_fincode = '$finid' And wc_compcode ='$compcode' and wc_process = 'N' group by wc_ticketno order by wc_ticketno desc";
  
      $sql = "select wc_ticketno from trn_weight_card left join mas_wb_item on  trim(wc_item) = trim(item_name) left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date = '$wbdate' and  item_grpname = 'BIO MASS'   order by wc_ticketno desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getFuelTruckDetail()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wbdate = $_POST['wbdate'];
	$truckno = $_POST['truckno'];
	$ticketno = $_POST['ticketno'];

      //  $sql = "select wc_ticketno from trn_weight_card where wc_date = '$wbdate' and wc_fincode = '$finid' And wc_compcode ='$compcode' and wc_process = 'N' group by wc_ticketno order by wc_ticketno desc";

        $sql="select * from trn_weight_card , mas_area , massal_customer where wc_sup_code = cust_code and  wc_area_code = area_code and wc_date = '$wbdate' and wc_fincode = '$finid ' and wc_compcode ='$compcode' and wc_process = 'N'  and wc_vehicleno = '$truckno' and wc_ticketno =  $ticketno ";

//echo $sql;


        $sql = "select * from trn_weight_card , mas_area , massal_customer where wc_sup_code = cust_code and  wc_area_code = area_code and wc_date = '$wbdate' and wc_fincode = '$finid ' and wc_compcode ='$compcode'  and wc_vehicleno = '$truckno'  and wc_ticketno =  $ticketno";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getFuelItemList()
    {
        global $conn;
        $sql = "select *  from masfu_item_header order by itmh_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getFuelItemDetail()
    {
	$itemcode = $_POST['itemcode'];
        global $conn;
        $sql = "select *  from masfu_item_header where itmh_code = $itemcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getQCFuelEntryNo()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wtno = $_POST['wtno'];
	$gstFlag = $_POST['gstFlag'];
	if ($gstFlag === "Add") {
	        $sql = "select ifnull(max(qc_fuel_entryno),0)+1 as qc_fuel_entryno from trn_qc_fuel_inspection where qc_fuel_fincode = '$finid' and qc_fuel_compcode ='$compcode' ";
	}
	else {

	        $sql = "call sp_sel_weightcard ('$compcode','$finid','$wtno')";
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getFuelQCEntryList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wtno = $_POST['wtno'];
	$gstFlag = $_POST['gstFlag'];
        $sql = "select  qc_fuel_entryno from trn_qc_fuel_inspection where qc_fuel_fincode = '$finid' and qc_fuel_compcode ='$compcode' group by qc_fuel_entryno order by qc_fuel_entryno desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getQCFuelEntryNoDetail()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entryno  = $_POST['entryno'];


	

        $sql = "select * from trn_qc_fuel_inspection , masfu_item_header,massal_customer where qc_fuel_supcode = cust_code and qc_fuel_itemcode = itmh_code and qc_fuel_compcode = '$compcode' and qc_fuel_fincode = '$finid' and qc_fuel_entryno = $entryno";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getSearchItemlist()
    {
        global $conn;
        $itemname = trim(strtoupper($_POST['itemname']));
        $areacode = $_POST['area_code'];
        $compcode = $_POST['compcode'];

        $itemname = trim(str_replace(" ", "", $itemname)); 
        $itemname = trim(str_replace(".", "", $itemname));
        $itemname = trim(str_replace("-", "", $itemname));
	$supcode  = $_POST['suppcode'];
/*
        if ($itemname == '') 
            $sql = "select * from masrm_item_header  order by itmh_name";
        else
            $sql = "select * from masrm_item_header where replace(replace(replace(itmh_name,' ','')  ,'.',''),'-','')  like '%$itemname%' order by itmh_name";
        if ($itemname == '') 
            $sql = "select itmh_code, itmh_name , itmh_moisture_per,case when rm_rate_mois is null then 0 else rm_rate_mois end as rm_rate_mois ,case when rm_rate_rate is null then 0 else rm_rate_rate end as rm_rate_rate from (select * from masrm_item_header h left join  masrm_supplier_rate on itmh_code = rm_rate_itemcode and rm_rate_supcode = $supcode) a1 order by itmh_name";
        else
*/

            $sql = "select itmh_code, itmh_name , itmh_moisture_per,case when rm_rate_mois is null then 0 else rm_rate_mois end as rm_rate_mois ,case when rm_rate_rate is null then 0 else rm_rate_rate end as rm_rate_rate from (select * from masrm_item_header h left join  masrm_supplier_rate on itmh_code = rm_rate_itemcode and rm_rate_supcode = $supcode) a1  where replace(replace(replace(itmh_name,' ','')  ,'.',''),'-','')  like '%$itemname%'  order by itmh_name";

/*

            $sql = "select itmh_name , itmh_moisture_per,case when rm_rate_mois is null then 0 else rm_rate_mois end as rm_rate_mois ,
case when rm_rate_rate is null then 0 else rm_rate_rate end as rm_rate_rate from (
select * from masrm_item_header h left join  masrm_supplier_rate on itmh_code = rm_rate_itemcode and rm_rate_supcode = $supcode and rm_rate_areacode = $areacode
and rm_rate_compcode = compcode 
) a1 
 where rm_rate_varified != 'C' and  replace(replace(replace(itmh_name,' ','')  ,'.',''),'-','')  like '%$itemname%'  order by itmh_name";

*/




    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getFuelTruckTicketNoList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$wbdate   = $_POST['wbdate'];
	$truckno = $_POST['truckno'];


      $sql = "select wc_ticketno from trn_weight_card left join mas_wb_item on  trim(wc_item) = trim(item_name) left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date = '$wbdate' and (item_grpname = 'BIO MASS' or item_grpname = 'COAL  ITEMS') and wc_vehicleno =  '$truckno' and wc_process = 'N'  group by wc_ticketno  order by wc_ticketno desc";

      $sql = "select wc_ticketno from trn_weight_card left join mas_wb_item on replace(wc_item,' ','')  = replace(item_name,' ','')  left join mas_wb_itemgroup on item_grpcode = item_group where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date = '$wbdate' and (item_grpname = 'BIO MASS' or item_grpname = 'COAL  ITEMS') and wc_vehicleno =  '$truckno' and wc_process = 'N'  group by wc_ticketno  order by wc_ticketno desc";

      $sql = "select wc_ticketno from trn_weight_card ,  masfu_item_header  where wc_compcode = '$compcode' and wc_fincode = '$finid' and wc_date = '$wbdate' and wc_vehicleno =  '$truckno' and wc_process = 'N'  group by wc_ticketno  order by wc_ticketno desc";

      $r = mysqli_query($conn, $sql);

        $nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getSupplierTruckList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$wbdate   = $_POST['wbdate'];
	$mat_type = $_POST['mat_type'];
	$truckno = $_POST['truckno'];
	$gstFlag = $_POST['gstFlag'];


if ($gstFlag == 'Add')
      $sql = "select cust_code,cust_ref  from trn_weight_card left join mas_wb_item on  trim(wc_item) = trim(item_name) left join mas_wb_itemgroup on item_grpcode = item_group left join massal_customer on wc_sup_code = cust_code where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date =  '$wbdate' and  item_grpname = 'WASTE PAPER' and wc_process = 'N' and wc_vehicleno = '$truckno'  group by cust_code,cust_ref    order by cust_ref desc";
else
      $sql = "select cust_code,cust_ref  from trn_weight_card left join mas_wb_item on  trim(wc_item) = trim(item_name) left join mas_wb_itemgroup on item_grpcode = item_group left join massal_customer on wc_sup_code = cust_code where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date =  '$wbdate' and  item_grpname = 'WASTE PAPER' and  wc_vehicleno = '$truckno'  group by cust_code,cust_ref    order by cust_ref desc";



if ($gstFlag == 'Add')
      $sql = "select cust_code,cust_ref  from trn_weight_card left join mas_wb_item on    replace(wc_item,' ','')  = replace(item_name,' ','')   left join mas_wb_itemgroup on item_grpcode = item_group left join massal_customer on wc_sup_code = cust_code where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date =  '$wbdate' and  item_grpname = 'WASTE PAPER' and wc_process = 'N' and wc_vehicleno = '$truckno'  group by cust_code,cust_ref    order by cust_ref desc";
else
      $sql = "select cust_code,cust_ref  from trn_weight_card left join mas_wb_item on     replace(wc_item,' ','')  = replace(item_name,' ','')  left join mas_wb_itemgroup on item_grpcode = item_group left join massal_customer on wc_sup_code = cust_code where wc_compcode = '$compcode'  and wc_fincode = '$finid' and wc_date =  '$wbdate' and  item_grpname = 'WASTE PAPER' and  wc_vehicleno = '$truckno'  group by cust_code,cust_ref    order by cust_ref desc";


      $r = mysqli_query($conn, $sql);
        $nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getTicketWeight()
    {
        global $conn;
	$ticketno = $_POST['ticketno'];
	$fincode  = $_POST['fincode'];
	$compcode = $_POST['compcode'];

      $sql = "select * from trn_weight_card where wc_ticketno = $ticketno and wc_fincode = $fincode and wc_compcode = $compcode";
      
      $r = mysqli_query($conn, $sql);
        $nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getTicketSupplier()
    {
        global $conn;
	$ticketno = $_POST['ticketno'];

//      $sql= "select * from trn_weight_card ,massal_customer where wc_sup_code = cust_code and wc_ticketno = $ticketno";
//echo $sql;

      $sql = "select * from trn_weight_card ,massal_customer where wc_sup_code = cust_code and wc_ticketno = $ticketno";
      
      $r = mysqli_query($conn, $sql);
        $nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

   
 function getCDParameters()
    {
        global $conn;

        $sql = "select * from masqc_cd_parameters order by qc_cd_param_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	


 function getCDMeasures()
    {
        global $conn;

        $sql = "select * from masqc_measuring_methods order by qc_measuring_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 


 function getSearchLedgerlist()
    {
        $party  = $_POST['party'];
        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 
        global $conn;
//        if ($party == '')
//        $sql = "select * from massal_customer where left(cust_name,2) != 'ZZ' order by cust_name";
//        else


        $sql = "select * from massal_customer where left(cust_name,2) != 'ZZ'  and cust_type != 'G' and replace(replace(cust_name,' ','')  ,'.','') like '%$party%' order by cust_name";
   
   //  $sql = "select * from massal_customer where cust_name like '%$party%' order by cust_name";
   

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }







 function getSearchChemicalitemlist()
    {
        global $conn;

        $item     = $_POST['item'];

        $item = trim(str_replace(" ", "", $item)); 
        $item = trim(str_replace(".", "", $item));


        $sql = "select * from maspur_item_header where left(item_name,2) != 'ZZ'  and replace(replace(item_name,' ','')  ,'.','') like '%$item%'  order by item_name";         


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getChemicalParameterDetails()
    {
        global $conn;

        $item     = $_POST['item'];

        $sql = "select * from masqc_chemical_parameters , masqc_cd_parameters  where c_itemcode = $item  and c_paramcode = qc_cd_param_code  ";         


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function findQCTicketNumber()
    {
    global $conn;
	$wbdate   = $_POST['wbdate'];
	$ticketno = $_POST['ticketno'];
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];

    $sql = "select qc_rm_entryno from trn_qc_rm_inspection where  qc_rm_compcode = $compcode and qc_rm_fincode = $finid and qc_rm_ticketdate = '$wbdate' and qc_rm_ticketno  = '$ticketno'  group by qc_rm_entryno";

    $r = mysqli_query($conn, $sql);
    $nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPonoList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
        $finid= $_POST['finid'];
        $vendor = $_POST['vendor'];
        $sql = "select * from  trnpur_purchase_header where phd_comp_code = '$compcode' and phd_fin_code = '$finid' and phd_sup_code = $vendor order by CAST(phd_pono AS UNSIGNED) desc ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }





 function getGRNNOList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
        $finid    = $_POST['finid'];
        $pono     = $_POST['pono'];
        $sql = "select * from trnpur_min_header , trnpur_min_trailer where minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code and minh_minno = mint_minno and minh_comp_code = $compcode and minh_fin_code = $finid and minh_type = 'P' and mint_pono = '$pono' order by minh_minno asc;";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getGRNNOItemlist()
    {
        global $conn;
	$compcode = $_POST['compcode'];
        $finid    = $_POST['finid'];
        $grnno    = $_POST['grnno'];
        $sql = "select item_name, item_code ,mint_mindate,minh_bill_no, minh_bill_date,minh_carrier from trnpur_min_header , trnpur_min_trailer , maspur_item_header where mint_item_code = item_code and minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code and minh_minno = mint_minno and minh_comp_code = $compcode and minh_fin_code = $finid and minh_type = 'P' and  minh_minno = '$grnno' group by item_name, item_code,mint_mindate,minh_bill_no, minh_bill_date,minh_carrier order by item_name;";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


	function getGRNNOItemDetails()
    {
        global $conn;
	   $compcode  = $_POST['compcode'];
        $finid    = $_POST['finid'];
        $grnno    = $_POST['grnno'];
		$itemcode = $_POST['itemcode'];
		//$sql= "select * from trnpur_min_header , trnpur_min_trailer where minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code and minh_minno = mint_minno and minh_comp_code = $compcode and minh_fin_code = $finid and minh_type = 'P' and  minh_minno = '$grnno' and mint_item_code = '$itemcode' ;";
		//echo $sql;
        $sql = "select * from trnpur_min_header , trnpur_min_trailer where minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code and minh_minno = mint_minno and minh_comp_code = $compcode and minh_fin_code = $finid and minh_type = 'P' and  minh_minno = '$grnno' and mint_item_code = '$itemcode' ;";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




 function getChemicalQCEntryNo()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$wtno = $_POST['wtno'];
	$gstFlag = $_POST['gstFlag'];
	if ($gstFlag === "Add") {
	        $sql = "select ifnull(max(qc_cd_entryno),0)+1 as qc_cd_entryno from trn_qc_chemical_inspection where qc_cd_fincode = '$finid' and qc_cd_compcode ='$compcode' ";
	}
	else {

	        $sql = "call sp_sel_weightcard ('$compcode','$finid','$wtno')";
	}
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

	function getCDQCEntryList()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];

        $sql = "select  qc_cd_entryno from trn_qc_chemical_inspection where qc_cd_fincode = '$finid' and qc_cd_compcode ='$compcode' group by qc_cd_entryno order by qc_cd_entryno desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


	function getCDQCEntryNoDetail()
    {
        global $conn;
	$compcode = $_POST['compcode'];
	$finid    = $_POST['finid'];
	$entryno  = $_POST['entryno'];


    //    $sql = "select * from trn_qc_chemical_inspection trn , massal_customer mascust , maspur_item_header masitem,  masqc_cd_parameters masparam , masqc_measuring_methods masmeasure where qc_cd_supcode = cust_code and qc_cd_itemcode = item_code and  trn.qc_cd_param_code = masparam.qc_cd_param_code and trn.qc_cd_measuring_code =  masmeasure.qc_measuring_code and  qc_cd_compcode = $compcode  and qc_cd_fincode = $finid  and qc_cd_entryno = $entryno";
 
     $sql = "call spqc_chemical_inspection ('$compcode','$finid','$entryno')";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



?>
